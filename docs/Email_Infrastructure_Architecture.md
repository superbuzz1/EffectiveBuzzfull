# Production Email Infrastructure Architecture

**Prepared By:** Staff Email Infrastructure Engineer
**Date:** June 7, 2026
**Scope:** EffectiveBuzz Multi-tenant SaaS (Outbound & Inbound Email Engine)

---

## 1. Executive Summary

To achieve maximum inbox placement and automate the sales cycle, EffectiveBuzz requires a hybrid email architecture. 
- **Direct Sending (Gmail API & Microsoft Graph):** Users authenticate their own Google Workspace or Microsoft 365 accounts via OAuth. Generating emails directly from the user's outbox ensures pristine deliverability for cold outreach.
- **Platform Managed (Resend):** For high-volume transactional outreach and fallback sending, we use Resend connected to verified custom domains.

---

## 2. Outbound Architecture

### 2.1 Sending Engine
- **OAuth Providers:** We implement "Send as" functionality using OAuth 2.0 scopes for Gmail API (`https://www.googleapis.com/auth/gmail.send`) and Microsoft Graph API (`Mail.Send`).
- **Resend integration:** For platform-managed sending, we pass payloads to Resend's REST API.
- **Rate Limiters:** Dedicated rate limiters (via Redis) are maintained per `EmailAccount` to mimic human sending behavior (e.g., max 50 emails/day progressing to max 250 emails/day per mailbox).

### 2.2 Event Tracking (Opens & Clicks)
- **Open Tracking:** We inject a uniquely generated invisible `1x1` pixel (`<img>`) with a tracking URL (e.g., `https://track.effectivebuzz.com/o/uuid.gif`).
- **Click Tracking:** All hyperlinks in the AI-generated email are wrapped in our tracking domain (e.g., `https://track.effectivebuzz.com/c/uuid`).
- **Headers:** We attach custom headers (`X-EffectiveBuzz-Campaign-Id`, `X-EffectiveBuzz-Tenant-Id`) to ease thread resolution and metrics association later.

### 2.3 Domain Authentication (SPF, DKIM, DMARC)
For domains integrated via Resend:
- **SPF:** Records ensure our IP addresses are authorized to send on behalf of the domain.
- **DKIM:** Cryptographic signatures are attached to outbound emails to prevent tampering in transit.
- **DMARC:** We enforce a `p=quarantine` or `p=reject` policy and collect aggregate reports to monitor for spoofing.
- **Verification Engine:** An async worker periodically polls DNS records (`TXT`, `CNAME`) using native Node `dns` module to assert the user has properly configured their domain before unlocking sending capabilities.

---

## 3. Inbound Architecture

### 3.1 Reply Capture & Webhooks
- **Gmail:** We utilize the Gmail API Push Notifications (via Google Cloud Pub/Sub) which triggers our webhook whenever a new message arrives in the authorized inbox.
- **Microsoft Graph:** We create a Change Notification Subscription (`/subscriptions`) pointing to our webhook to listen for newly created items in the `Inbox` folder.
- **Resend:** We configure Inbound Routing by setting specific MX records on the client's domains that forward incoming parsing payloads directly to our `/api/v2/webhooks/resend/inbound` endpoint.

### 3.2 Thread Mapping
To map an incoming reply to an outbound AI campaign:
1. **Header Inspection:** We inspect standard RFC headers: `In-Reply-To` and `References` to match against the `Message-ID` of our sent emails.
2. **Subject Matching:** Fallback matching on `Re: [Original Subject]`.
3. **Sender Resolution:** Matching the `From` address of the reply against active `Prospect` records in the system.

### 3.3 Classification Pipeline (AI Integration)
1. Inbound webhook receives raw payload and pushes to `queue:email:inbound`.
2. **Inbound Worker** parses the HTML/Text body and strips signature noise.
3. Worker pushes the cleaned payload to the **AI Reply Analysis Worker** mapping.
4. Gemini categorizes the intent: `INTERESTED`, `NOT_INTERESTED`, `MEETING_BOOKED`, `OUT_OF_OFFICE`, `BOUNCE`, `DO_NOT_CONTACT`.
5. The Sequence Service evaluates if the campaign should be paused (e.g., stopping follow-ups if they replied).

---

## 4. Deliverability Engine

### 4.1 Warmup Strategy
New email accounts face harsh spam filters. We implement an automated warmup protocol:
- **Day 1-5:** 10-20 emails/day.
- **Day 6-15:** Increment by 10-15 emails daily up to 50.
- **Ramp Protocol:** The database enforces a dynamic `dailySendingLimit` which increments programmatically alongside positive domain age.

### 4.2 Reputation Monitoring
- **Google Postmaster Tools:** We advise and automate verification (where possible) of Postmaster records to track Spam Rate and Domain Reputation on user domains.
- **Spam Trap Protection:** Emails are pre-processed through an email validation API (e.g., ZeroBounce or simple regex/MX verifications) before being queued to avoid hitting toxic traps.

### 4.3 Bounce & Complaint Handling
- **Bounces (NDRs):** If an email bounces (either via Resend Webhooks or by parsing bounce receipts in the Gmail/Microsoft inbox), the Prospect is immediately marked as `BOUNCED`.
- **Complaints (FBLs/Spam markings):** If notified of a complaint, the Prospect is added to the Tenant's global `DO_NOT_CONTACT` blocklist to protect domain reputation.

---

## 5. Database Schema (PostgreSQL)

```sql
-- Represents a connected mailbox
CREATE TABLE EmailAccount (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id VARCHAR(255) NOT NULL,
    provider VARCHAR(50) NOT NULL, -- GMAIL, MICROSOFT, RESEND
    email_address VARCHAR(255) NOT NULL,
    oauth_access_token TEXT,
    oauth_refresh_token TEXT,
    token_expires_at TIMESTAMP WITH TIME ZONE,
    daily_limit INTEGER DEFAULT 50,
    sent_today INTEGER DEFAULT 0,
    status VARCHAR(50) DEFAULT 'ACTIVE', -- ACTIVE, DISCONNECTED, WARMING
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Represents an individual sent/received email
CREATE TABLE EmailMessage (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id VARCHAR(255) NOT NULL,
    email_account_id UUID REFERENCES EmailAccount(id),
    campaign_id UUID,
    prospect_id UUID,
    direction VARCHAR(50), -- OUTBOUND, INBOUND
    message_id VARCHAR(255) UNIQUE NOT NULL, -- The actual SMTP Message-ID
    thread_id VARCHAR(255),
    subject TEXT,
    body_text TEXT,
    status VARCHAR(50), -- QUEUED, SENT, DELIVERED, BOUNCED
    ai_classification VARCHAR(50), -- INTERESTED, NOT_INTERESTED, etc
    sent_at TIMESTAMP WITH TIME ZONE
);

-- Tracking events (Opens / Clicks)
CREATE TABLE EmailTrackingEvent (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email_message_id UUID REFERENCES EmailMessage(id),
    event_type VARCHAR(50), -- OPEN, CLICK
    ip_address VARCHAR(255),
    user_agent TEXT,
    link_url TEXT, -- If CLICK event
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

---

## 6. Architecture Topology & Deployment

### API Architecture
- **OAuth Connect Flow:** Routes in the Express API to handle Google/Microsoft OAuth redirects, acquiring short-lived access tokens and securely storing encrypted refresh tokens.
- **Webhooks:** Fast, unauthenticated (but signature-verified) endpoints for Resend and Google Pub/Sub `Push` events.

### Worker Architecture (BullMQ)
1. **`SenderWorker`:** Polls the database for `status = QUEUED` outreach jobs. Determines the provider (Gmail vs MS Graph), handles token rotation if expired, calls the respective API, and records the `Message-ID`.
2. **`InboxWatchWorker`:** Handles asynchronous processing of incoming reply webhooks. Finds the `EmailMessage` reference, maps the thread, and triggers the Gemini Analysis Worker.

### Deployment Architecture
- **Email Worker Tier:** Dedicated Docker containers optimized for external network egress and connection persistent. Deployed via Coolify alongside the AI Worker Tier in our existing cluster.
- **Ingress Controller/DNS:** Specific Cloudflare DNS rules handle redirecting `track.effectivebuzz.com` to the tracking API controllers without triggering caching mechanisms.

# EffectiveBuzz: Enterprise Authentication & Identity Architecture

**Prepared By:** Identity & Access Management Architect  
**Date:** June 7, 2026  
**Project:** EffectiveBuzz  
**Objective:** Design a secure, scalable, and frictionless Enterprise Identity and Access Management (IAM) framework supporting modern federation protocols (SAML 2.0, OIDC) and SCIM provisioning.

---

## SECTION 1 — Authentication Flow

To support diverse enterprise Identity Providers (IdPs) while maintaining a seamless user experience, we implement an SP-initiated (Service Provider) authentication flow acting as a trusted broker.

*   **IdP Support:** Google Workspace, Microsoft Entra ID (formerly Azure AD), Okta, PingIdentity (via SAML 2.0 and OIDC).
*   **The "Home Realm Discovery" Flow:**
    1.  User enters their email address at `app.effectivebuzz.com/login`.
    2.  The auth router checks the domain. If the domain (e.g., `@acmecorp.com`) is mapped to an active Enterprise SSO configuration, the password field is hidden, and the user is automatically redirected to their corporate IdP.
    3.  User authenticates securely against their corporate portal (e.g., Okta), adhering to internal MFA controls.
    4.  IdP redirects back to the EffectiveBuzz Assertion Consumer Service (ACS) URL with a cryptographically signed SAML/OIDC token.
    5.  EffectiveBuzz validates the signature, extracts the user identity, checks JIT (Just-In-Time) provisioning rules, and issues a secure local session.
*   **IdP-Initiated Flow:** Users can click the EffectiveBuzz chiclet directly inside their Okta or Entra ID dashboard to be seamlessly logged in without hitting the EffectiveBuzz login page first.

---

## SECTION 2 — User Provisioning

Enterprise customers require automated lifecycle management to prevent orphan accounts when employees change roles or depart.

*   **SCIM 2.0 (System for Cross-domain Identity Management):**
    *   EffectiveBuzz exposes a RESTful SCIM `/Users` and `/Groups` API endpoint.
    *   When an IT administrator assigns a user to the "Sales" group in Okta, Okta sends a `POST` request to EffectiveBuzz to instantly create the user profile.
    *   When an employee is terminated, Okta sends a `DELETE` or `PATCH (active: false)` request, instantly revoking platform access and gracefully pausing their active outbound campaigns.
*   **Just-In-Time (JIT) Provisioning:**
    *   For enterprises not using SCIM, JIT allows users to be created automatically upon their first successful SSO login, provided their domain is whitelisted.
*   **Domain Capture:**
    *   If an enterprise claims a specific domain (e.g., `enterprise.com`), any user attempting to sign up independently with an `@enterprise.com` email is blocked and forcefully routed through the corporate SSO gateway.

---

## SECTION 3 — Role Mapping

Enterprise directory structures (Active Directory / LDAP groups) must dynamically map to EffectiveBuzz internal platform roles.

*   **Attribute Assertion Mapping:**
    *   During SSO/SCIM sync, the IdP sends an attribute (e.g., `department: sales_leadership`).
    *   EffectiveBuzz parses this attribute against a pre-configured mapping dictionary.
*   **Role Hierarchy:**
    *   `Enterprise_Admin`: Full billing, integration, and security control. (Mapped from `IT_Admins` group).
    *   `Workspace_Manager`: Can edit campaigns, purchase AI limits, and view cross-team analytics. (Mapped from `Sales_Managers` group).
    *   `SDR_User`: Can only view their assigned inbox, generate drafts, and manage their specific designated prospects. (Mapped from `BDR_Team` group).
    *   `Read_Only`: Can view analytics but cannot launch campaigns or spend AI credits. (Mapped from `Exec_Leadership` group).

---

## SECTION 4 — Session Architecture

Traditional long-lived JWTs pose a security risk in enterprise environments. We utilize a secure, rolling session architecture.

*   **Token Mechanics:**
    *   **Access Token:** Short-lived JWT (15 minutes). Sent via HTTP `Authorization: Bearer` header.
    *   **Refresh Token:** Long-lived, opaque token stored securely in an `HttpOnly`, `Secure`, `SameSite=Strict` cookie.
*   **Stateless vs. Stateful:**
    *   While Access Tokens are stateless for performance, Refresh Tokens are stateful and stored in a Redis cache. This allows administrators (or the SCIM API) to instantly revoke a user's session globally.
*   **Absolute Session Timeouts:**
    *   Configurable per enterprise. For highly regulated clients, sessions can be forced to strictly expire every 12 hours, demanding re-authentication against the IdP daily.
*   **Idle Timeouts:**
    *   The frontend monitors user activity. After 30 minutes of inactivity, the user is locked and prompted for re-authentication.

---

## SECTION 5 — Security Controls

*   **Strict Security Headers:** Implementation of CSP (Content Security Policy), HSTS, and X-Frame-Options to prevent XSS and Clickjacking attacks during the auth flow.
*   **MFA Delegation:** EffectiveBuzz does not enforce local MFA for SSO users. We delegate and trust the MFA policies defined centrally by the enterprise IdP (e.g., Okta Verify, YubiKey).
*   **Audit Logging:** Every login attempt (Success, Failure, SSO Redirect) is logged with an IP address, User-Agent, and geographic location. These logs are exportable via API to the enterprise's SIEM (e.g., Splunk).
*   **Anomaly Detection:** 
    *   Impossible Travel alerts (e.g., successful login from New York, followed by a login attempt from Moscow 10 minutes later) automatically flag the account and force step-up authentication.
    *   Brute-force protection with exponential backoff and IP banning (via Cloudflare / WAF) for legacy or non-SSO authentication endpoints.

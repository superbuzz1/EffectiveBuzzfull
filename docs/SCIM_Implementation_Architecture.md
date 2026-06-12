# EffectiveBuzz: SCIM 2.0 Implementation Architecture

**Prepared By:** Enterprise Identity Engineer  
**Date:** June 7, 2026  
**Project:** EffectiveBuzz  
**Objective:** Architect strict SCIM 2.0 (RFC 7643/7644) compliance to enable automated user lifecycle management, group synchronization, and secure deprovisioning for Enterprise Identity Providers (IdPs) like Okta and Entra ID.

---

## SECTION 1 — Core SCIM Operations

### 1. User Provisioning
When an IT administrator assigns a user to the EffectiveBuzz application within their IdP, a strictly formatted SCIM representation of that user is pushed to our platform.
*   **Action:** The IdP sends a `POST /Users` request containing the user's core attributes (`userName` mapped to email, `name.givenName`, `name.familyName`).
*   **Result:** A shadow profile is instantly created in the EffectiveBuzz database. The user is marked `active: true`. The IdP's unique identifier is stored as the `externalId` to maintain the syncing link.

### 2. Group Provisioning
Enterprise teams are managed via directory groups (e.g., "SDRs_NorthAmerica"). SCIM ensures changing a group in Okta changes the workspace boundaries in EffectiveBuzz.
*   **Action:** The IdP sends a `POST /Groups` request to create the group, followed by `PATCH /Groups/{id}` to add or remove members using their SCIM user IDs.
*   **Result:** EffectiveBuzz maintains identical group mappings to allocate shared resources (like shared email templates or shared AI profiles) automatically.

### 3. Role Synchronization
SCIM uses 'entitlements' or 'roles' to manage what a user can actually do inside EffectiveBuzz.
*   **Action:** We expose a custom SCIM extension schema or leverage the core `roles` attribute. When the IdP sends `roles: [{ value: "Workspace_Manager" }]`, our SCIM processor intercepts this.
*   **Result:** The user's internal EffectiveBuzz RBAC (Role-Based Access Control) profile is forcefully updated. Manual in-app role changes are disabled for SCIM-managed users to maintain the IdP as the Single Source of Truth (SSOT).

### 4. Deprovisioning (The Security Kill-Switch)
When an employee is terminated or changes departments, access must be revoked in milliseconds.
*   **Action:** The IdP sends a `PATCH /Users/{id}` payload setting `active: false` (Soft Delete) or a `DELETE /Users/{id}` (Hard Delete).
*   **Result (Soft Delete):** The user's active session token is immediately revoked via Redis. Active AI outreach campaigns owned exclusively by this user are paused. Analytics and historical emails are preserved for company records.

---

## SECTION 2 — API Design

The SCIM REST API must strictly adhere to RFC 7644 specifications, existing under a dedicated tenant-specific routing suffix.

*   **Base URL:** `https://api.effectivebuzz.com/scim/v2/{tenant_id}`

**Core Endpoints:**
*   `GET /ServiceProviderConfig` - Returns supported SCIM features (e.g., PATCH support, bulk operations).
*   `GET /Schemas` / `GET /ResourceTypes` - Introspection endpoints required by Entra ID/Okta for schema discovery.
*   `GET /Users` - Supports pagination (`startIndex`, `count`) and filtering (e.g., `?filter=userName eq "john@acme.com"`).
*   `POST /Users` - Creates a new user.
*   `GET /Users/{id}` - Retrieves a specific user.
*   `PUT /Users/{id}` - Replaces an entire user record.
*   `PATCH /Users/{id}` - Modifies specific attributes (e.g., adding a role).
*   `DELETE /Users/{id}` - Removes or inactivates a user.
*   `GET /Groups` / `POST /Groups` / `PATCH /Groups/{id}` - Manages directory groups.

**Payload Example (POST /Users):**
```json
{
  "schemas": ["urn:ietf:params:scim:schemas:core:2.0:User"],
  "externalId": "00u123456789",
  "userName": "sarah.connor@acmecorp.com",
  "name": {
    "familyName": "Connor",
    "givenName": "Sarah"
  },
  "active": true
}
```

---

## SECTION 3 — Database Schema

To support SCIM mapping without breaking the existing PLG database architecture, we introduce metadata columns and linking tables.

**Table: `Workspace` (Tenant)**
*   `id` (UUID, Primary Key)
*   `scimEnabled` (Boolean)
*   `scimTokenHash` (String)

**Table: `User` (Modifications)**
*   *Existing:* `id`, `email`, `name`, `workspace_id`.
*   *New SCIM Fields:*
    *   `scimExternalId` (String, Indexed) - The IdP's unique ID for the user.
    *   `isActive` (Boolean) - Controlled strictly by SCIM payload.
    *   `isScimManaged` (Boolean) - Locks UI profile editing if true.

**Table: `UserGroup`**
*   `id` (UUID, Primary Key)
*   `workspaceId` (UUID, Foreign Key)
*   `displayName` (String)
*   `scimExternalId` (String)

**Table: `UserGroupMapping`**
*   `userId` (UUID, Foreign Key)
*   `groupId` (UUID, Foreign Key)

---

## SECTION 4 — Security Model

SCIM endpoints are highly privileged as they directly control the Enterprise's access definitions.

**Authentication:**
*   **Mechanism:** Long-lived, cryptographically secure Bearer Tokens generated exclusively within the EffectiveBuzz Enterprise Admin UI.
*   **Isolation:** Each Bearer Token is strictly bound to a specific `tenant_id`. Submitting a valid token for Tenant A against the `/scim/v2/Tenant_B/...` endpoint will return a strict `401 Unauthorized`.

**Rate Limiting & Protection:**
*   **Throttling:** SCIM API endpoints are rate-limited independently from core app APIs (e.g., 50 requests/second per tenant) to prevent Denial of Service during massive directory syncs.
*   **IP Whitelisting:** Optional configuration allowing enterprises to restrict SCIM API traffic so it is only accepted if originating from published Okta or Entra ID IP ranges.
*   **Audit Logging:** Every SCIM action (`POST`, `PATCH`, `DELETE`) is hard-logged with the Bearer Token ID, action taken, and timestamp for SOC 2 compliance and enterprise SIEM export.

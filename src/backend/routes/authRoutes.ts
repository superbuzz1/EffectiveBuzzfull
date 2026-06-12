// src/backend/routes/authRoutes.ts
import { Router } from 'express';
import { AuthController } from '../controllers/AuthController';
import { authenticateAccessToken } from '../middleware/authMiddleware';
import { rateLimiter } from '../middleware/rateLimiter';

const router = Router();

// --- SECURITY RATES SPECIFICATION LIMITS ---
const registerLimiter = rateLimiter({ limit: 15, windowSec: 60 });       // Protect tenant creations
const loginLimiter = rateLimiter({ limit: 10, windowSec: 60 });          // Protect directory brute-forcing
const passwordResetLimiter = rateLimiter({ limit: 5, windowSec: 60 });   // Protect mail routing servers loads
const generalLimiter = rateLimiter({ limit: 60, windowSec: 60 });        // Standard protection limits

/**
 * Endpoint Routes mappings
 */

// 1. Dynamic Register
router.post('/register', registerLimiter, AuthController.register);

// 2. Clearhand Secure Handshake login
router.post('/login', loginLimiter, AuthController.login);

// 3. Authenticated Sign-out Session Eviction
router.post('/logout', authenticateAccessToken, generalLimiter, AuthController.logout);

// 4. Token Refresh Handshake
router.post('/refresh', generalLimiter, AuthController.refreshToken);

// 5. Trigger Reset Credentials email
router.post('/reset-request', passwordResetLimiter, AuthController.requestPasswordReset);

// 6. Reset Credentials Overwrite Confirmation
router.post('/reset-confirm', passwordResetLimiter, AuthController.confirmPasswordReset);

// 7. Verify Registered Email Address code
router.post('/verify-email', generalLimiter, AuthController.verifyEmail);

// 8. Magic Link Passwordless Request
router.post('/magic-link-request', loginLimiter, AuthController.requestMagicLink);

// 9. Magic Link Passwordless Token Verification
router.post('/magic-link-verify', generalLimiter, AuthController.verifyMagicLink);

export default router;

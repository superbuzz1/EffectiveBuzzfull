// src/backend/validation/authValidation.ts
import { z } from 'zod';

const passwordSchema = z.string()
  .min(8, { message: "Password must be at least 8 characters in length." })
  .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter." })
  .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter." })
  .regex(/[0-9]/, { message: "Password must contain at least one numerical digit." })
  .regex(/[^A-Za-z0-9]/, { message: "Password must contain at least one special character character symbol." });

export const RegisterRequestSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters string." }).max(128),
  email: z.string().email({ message: "Invalid email schema address format." }),
  password: passwordSchema,
  role: z.enum(['Owner', 'Admin', 'Member', 'Agent']),
  tenantName: z.string().min(2, { message: "Tenant name is required and must be 2 characters or longer." }).max(128),
  tenantDomain: z.string().min(3, { message: "Domain suffix or identifier is required." }).max(256),
});

export const LoginRequestSchema = z.object({
  email: z.string().email({ message: "Invalid email address format." }),
  password: z.string().min(1, { message: "Password is required." }),
});

export const PasswordResetRequestSchema = z.object({
  email: z.string().email({ message: "Invalid email address format." }),
});

export const PasswordResetConfirmSchema = z.object({
  token: z.string().min(5, { message: "Verification token is required and cannot be empty." }),
  newPassword: passwordSchema,
});

export const EmailVerificationSchema = z.object({
  token: z.string().min(5, { message: "Verification code/token is required." }),
});

export const MagicLinkRequestSchema = z.object({
  email: z.string().email({ message: "Invalid email address format." }),
  name: z.string().optional(),
  tenantName: z.string().optional(),
  workspaceName: z.string().optional()
});

export const MagicLinkVerifySchema = z.object({
  token: z.string().min(5, { message: "Magic link verify token is required." })
});

// Infer Zod types optionally for downstream compiler safety
export type RegisterInput = z.infer<typeof RegisterRequestSchema>;
export type LoginInput = z.infer<typeof LoginRequestSchema>;
export type PasswordResetInput = z.infer<typeof PasswordResetRequestSchema>;
export type PasswordResetConfirmInput = z.infer<typeof PasswordResetConfirmSchema>;
export type EmailVerificationInput = z.infer<typeof EmailVerificationSchema>;
export type MagicLinkRequestInput = z.infer<typeof MagicLinkRequestSchema>;
export type MagicLinkVerifyInput = z.infer<typeof MagicLinkVerifySchema>;

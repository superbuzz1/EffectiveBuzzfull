// src/backend/validation/userValidation.ts
import { z } from 'zod';

export const UpdateProfileSchema = z.object({
  name: z.string().min(1, { message: "Name cannot be left blank." }).optional(),
  bio: z.string().max(250, { message: "Biography must not exceed 250 characters." }).nullable().optional(),
  title: z.string().max(100, { message: "Professional title must not exceed 100 characters." }).nullable().optional(),
  department: z.string().max(100, { message: "Department name must not exceed 100 characters." }).nullable().optional(),
  phoneNumber: z.string().max(30, { message: "Phone number is too long." }).nullable().optional(),
  timezone: z.string().min(1, { message: "Timezone identifier required." }).optional()
});

export const UpdatePreferencesSchema = z.object({
  theme: z.enum(['light', 'dark', 'system'], { message: "Theme must be light, dark, or system." }).optional(),
  emailMarketing: z.boolean().optional(),
  emailSecurity: z.boolean().optional(),
  emailProductUpdates: z.boolean().optional(),
  defaultWorkspaceId: z.string().nullable().optional(),
  language: z.string().min(2).max(10).optional()
});

export const UpdateTeammateRoleSchema = z.object({
  role: z.enum(['Owner', 'Admin', 'Member', 'Agent'], { message: "Tenant role must be Owner, Admin, Member, or Agent." })
});

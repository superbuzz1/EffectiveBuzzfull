// src/backend/validation/workspaceValidation.ts
import { z } from 'zod';

export const CreateWorkspaceSchema = z.object({
  name: z.string().min(2, { message: "Workspace name must be at least 2 characters." }).max(64),
  slug: z.string()
    .min(2, { message: "URL slug must be at least 2 characters." })
    .max(64)
    .regex(/^[a-z0-9-]+$/, { message: "Slug must contain only lowercase letters, numbers, and hyphens." })
});

export const UpdateWorkspaceSchema = z.object({
  name: z.string().min(2, { message: "Workspace name must be at least 2 characters." }).max(64).optional(),
  slug: z.string()
    .min(2, { message: "URL slug must be at least 2 characters." })
    .max(64)
    .regex(/^[a-z0-9-]+$/, { message: "Slug must contain only lowercase letters, numbers, and hyphens." })
    .optional()
});

export const InviteMemberSchema = z.object({
  email: z.string().email({ message: "Invalid email address format." }),
  role: z.enum(['Owner', 'Admin', 'Manager', 'SDR', 'Viewer'])
});

export const UpdateRoleSchema = z.object({
  role: z.enum(['Owner', 'Admin', 'Manager', 'SDR', 'Viewer'])
});

// Infer TS Types if needed
export type CreateWorkspaceInput = z.infer<typeof CreateWorkspaceSchema>;
export type UpdateWorkspaceInput = z.infer<typeof UpdateWorkspaceSchema>;
export type InviteMemberInput = z.infer<typeof InviteMemberSchema>;
export type UpdateRoleInput = z.infer<typeof UpdateRoleSchema>;

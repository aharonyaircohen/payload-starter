import { z } from 'zod'

/**
 * Common validation schemas for reuse across the application
 */

// Email validation
export const emailSchema = z.string().email('Invalid email address')

// Password validation (min 8 chars, at least one letter and one number)
export const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .regex(/[a-zA-Z]/, 'Password must contain at least one letter')
  .regex(/[0-9]/, 'Password must contain at least one number')

// MongoDB ObjectId validation
export const objectIdSchema = z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid ID format')

// URL validation
export const urlSchema = z.string().url('Invalid URL')

// Phone number validation (basic international format)
export const phoneSchema = z.string().regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number format')

// Pagination parameters
export const paginationSchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(10),
})

// Date range validation
export const dateRangeSchema = z.object({
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
})

// Common metadata schema
export const metadataSchema = z.record(z.string(), z.unknown()).optional()

/**
 * Example: Contact form validation schema
 */
export const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: emailSchema,
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})

/**
 * Example: API request with pagination
 */
export const paginatedRequestSchema = z.object({
  query: z.string().optional(),
  ...paginationSchema.shape,
})

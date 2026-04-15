import { z } from 'zod'

/**
 * Validate data against a Zod schema
 * Returns parsed data on success, throws on validation error
 */
export function validate<T extends z.ZodTypeAny>(schema: T, data: unknown): z.infer<T> {
  return schema.parse(data)
}

/**
 * Safely validate data against a Zod schema
 * Returns { success: true, data } or { success: false, error }
 */
export function safeValidate<T extends z.ZodTypeAny>(
  schema: T,
  data: unknown,
): { success: true; data: z.infer<T> } | { success: false; error: z.ZodError } {
  const result = schema.safeParse(data)
  return result
}

/**
 * Format Zod errors for API responses
 */
export function formatZodErrors(error: z.ZodError): Record<string, string[]> {
  const formatted: Record<string, string[]> = {}

  for (const issue of error.issues) {
    const path = issue.path.join('.')
    if (!formatted[path]) {
      formatted[path] = []
    }
    formatted[path].push(issue.message)
  }

  return formatted
}

/**
 * Create a standardized validation error response
 */
export function createValidationErrorResponse(error: z.ZodError) {
  return {
    success: false,
    error: 'Validation failed',
    details: formatZodErrors(error),
  }
}

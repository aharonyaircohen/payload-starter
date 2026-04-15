import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { logger, createRequestLogger } from '@/utilities/logger'
import { createValidationErrorResponse } from '@/utilities/validation'
import * as Sentry from '@sentry/nextjs'
import { randomUUID } from 'crypto'

/**
 * Example API route demonstrating:
 * - Zod validation at API boundary
 * - Structured logging with Pino
 * - Error tracking with Sentry
 * - Request correlation with requestId
 */

// Request schema validation
const requestSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})

export async function POST(request: NextRequest) {
  // Generate request ID for correlation
  const requestId = randomUUID()
  const reqLogger = createRequestLogger(requestId)

  try {
    // Parse request body
    const body = await request.json()

    reqLogger.info({ body }, 'Received example API request')

    // Validate input with Zod
    const validationResult = requestSchema.safeParse(body)

    if (!validationResult.success) {
      reqLogger.warn(
        { errors: validationResult.error.issues },
        'Validation failed for example request',
      )

      return NextResponse.json(createValidationErrorResponse(validationResult.error), {
        status: 400,
      })
    }

    const data = validationResult.data

    // Process the validated data
    reqLogger.info({ name: data.name, email: data.email }, 'Processing example request')

    // Simulate processing
    // In a real app, you would:
    // - Save to database
    // - Send email
    // - Call external APIs
    // etc.

    reqLogger.info('Example request processed successfully')

    return NextResponse.json({
      success: true,
      message: 'Request processed successfully',
      requestId,
    })
  } catch (error) {
    // Log error with context
    reqLogger.error({ err: error }, 'Error processing example request')

    // Track error in Sentry
    Sentry.captureException(error, {
      tags: {
        endpoint: '/api/example',
        requestId,
      },
    })

    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
        requestId,
      },
      { status: 500 },
    )
  }
}

export async function GET() {
  logger.info('Example GET request')

  return NextResponse.json({
    message: 'This is an example API endpoint',
    methods: ['GET', 'POST'],
    documentation: {
      post: {
        description: 'Submit data with validation',
        body: {
          name: 'string (min 2 chars)',
          email: 'string (valid email)',
          message: 'string (min 10 chars)',
        },
      },
    },
  })
}

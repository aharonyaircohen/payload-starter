import { MongoDBContainer, StartedMongoDBContainer } from '@testcontainers/mongodb'

/**
 * Global container instance for tests
 * This ensures we reuse the same container across test files
 */
let mongoContainer: StartedMongoDBContainer | null = null

/**
 * Start MongoDB test container
 * Returns connection URI
 */
export async function startMongoContainer(): Promise<string> {
  if (!mongoContainer) {
    mongoContainer = await new MongoDBContainer('mongo:7').start()
  }
  return mongoContainer.getConnectionString()
}

/**
 * Stop MongoDB test container
 */
export async function stopMongoContainer(): Promise<void> {
  if (mongoContainer) {
    await mongoContainer.stop()
    mongoContainer = null
  }
}

/**
 * Example usage in Vitest:
 *
 * import { beforeAll, afterAll, describe, it, expect } from 'vitest'
 * import { startMongoContainer, stopMongoContainer } from '@/utilities/test/mongodb-container'
 *
 * describe('MongoDB Integration Tests', () => {
 *   let mongoUri: string
 *
 *   beforeAll(async () => {
 *     mongoUri = await startMongoContainer()
 *     // Connect your MongoDB client here
 *   })
 *
 *   afterAll(async () => {
 *     await stopMongoContainer()
 *   })
 *
 *   it('should connect to MongoDB', async () => {
 *     // Your test here
 *   })
 * })
 */

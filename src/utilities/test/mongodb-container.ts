import { MongoDBContainer, StartedMongoDBContainer } from '@testcontainers/mongodb'

declare global {
  var __MONGO_CONTAINER: StartedMongoDBContainer | undefined
}

/**
 * Start MongoDB test container
 * Returns connection URI
 */
export async function startMongoContainer(): Promise<string> {
  const container = await new MongoDBContainer('mongo:7').start()
  return container.getConnectionString()
}

/**
 * Stop MongoDB test container
 */
export async function stopMongoContainer(): Promise<void> {
  if (global.__MONGO_CONTAINER) {
    await global.__MONGO_CONTAINER.stop()
    delete global.__MONGO_CONTAINER
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

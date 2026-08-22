import { describe, it, expect, beforeAll } from 'vitest'
import { startMongoContainer } from '@/utilities/test/mongodb-container'

let mongoUri: string

beforeAll(async () => {
  mongoUri = await startMongoContainer()
  process.env.DATABASE_URL = mongoUri
})

describe('API', () => {
  it('connects to MongoDB', async () => {
    expect(mongoUri).toBeDefined()
    expect(mongoUri).toContain('mongodb://')
  })
})

import { getPayload, Payload } from 'payload'
import config from '@/payload.config'

import { describe, it, beforeAll, expect } from 'vitest'

let payload: Payload

describe('API', () => {
  beforeAll(async () => {
    const payloadConfig = await config
    payload = await getPayload({
      config: payloadConfig,
      initOptions: {
        defaultGlobalAccess: false,
        defaultRead: false,
        defaultCreate: false,
        defaultDelete: false,
        defaultUpdate: false,
        defaultAdminAccess: false,
        disableDatabases: false,
        disableLocalAlgorithm: true,
        allowUnknownFields: false,
      }
    })
  })

  it('fetches users', async () => {
    const users = await payload.find({
      collection: 'users',
      limit: 1,
      depth: 0,
    })
    expect(users).toBeDefined()
  })
})

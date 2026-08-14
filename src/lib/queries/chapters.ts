import { cache } from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

export const queryChaptersByCourse = cache(async ({ courseId }: { courseId: string }) => {
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'chapters',
    where: {
      and: [
        {
          course: {
            equals: courseId,
          },
        },
        {
          status: {
            equals: 'published',
          },
        },
        {
          isActive: {
            equals: true,
          },
        },
      ],
    },
    sort: 'order',
    limit: 1000,
    pagination: false,
  })

  return result.docs
})

export const queryChapterBySlug = cache(async ({ slug }: { slug: string }) => {
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'chapters',
    where: {
      and: [
        {
          slug: {
            equals: slug,
          },
        },
        {
          status: {
            equals: 'published',
          },
        },
        {
          isActive: {
            equals: true,
          },
        },
      ],
    },
    limit: 1,
    pagination: false,
    depth: 2,
  })

  return result.docs?.[0] || null
})

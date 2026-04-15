import { cache } from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

export const queryCourseBySlug = cache(async ({ slug }: { slug: string }) => {
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'courses',
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
  })

  return result.docs?.[0] || null
})

export const queryPublishedCourses = cache(async () => {
  const payload = await getPayload({ config: configPromise })

  // First, try to get all courses to debug
  const allCourses = await payload.find({
    collection: 'courses',
    sort: 'order',
    limit: 1000,
    pagination: false,
  })

  console.log('Total courses in DB:', allCourses.docs.length)
  if (allCourses.docs.length > 0) {
    console.log('First course:', {
      id: allCourses.docs[0].id,
      title: allCourses.docs[0].title,
      status: allCourses.docs[0].status,
      isActive: allCourses.docs[0].isActive,
      slug: allCourses.docs[0].slug,
    })
  }

  // Filter published and active courses
  const result = await payload.find({
    collection: 'courses',
    where: {
      and: [
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

  console.log('Published & active courses:', result.docs.length)

  return result.docs
})

import { cache } from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { queryChaptersByCourse } from './chapters'

export const queryLessonsByChapter = cache(async ({ chapterId }: { chapterId: string }) => {
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'lessons',
    where: {
      and: [
        {
          chapter: {
            equals: chapterId,
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
    depth: 2,
  })

  return result.docs
})

export const queryLessonBySlug = cache(async ({ slug }: { slug: string }) => {
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'lessons',
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

/**
 * Get all lessons for a course, organized by chapters
 * This is a helper function to maintain backward compatibility while transitioning to chapter-based hierarchy
 */
export const queryLessonsByCourse = cache(async ({ courseId }: { courseId: string }) => {
  const chapters = await queryChaptersByCourse({ courseId })
  const payload = await getPayload({ config: configPromise })

  // Get all lessons for all chapters in this course
  const chapterIds = chapters.map((chapter) => chapter.id)

  if (chapterIds.length === 0) {
    return []
  }

  const result = await payload.find({
    collection: 'lessons',
    where: {
      and: [
        {
          chapter: {
            in: chapterIds,
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
    depth: 2,
  })

  return result.docs
})

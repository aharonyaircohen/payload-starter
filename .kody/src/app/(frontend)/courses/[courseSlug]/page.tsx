import { notFound } from 'next/navigation'
import { queryCourseBySlug } from '@/lib/queries/courses'
import { queryChaptersByCourse } from '@/lib/queries/chapters'
import { CourseHeader } from '../_components/CourseHeader'
import { ChapterCard } from '../_components/ChapterCard'
import { EmptyState } from '../_components/EmptyState'
import { BackToCourses } from '../_components/BackToCourses'
import { ChaptersSectionTitle } from '../_components/ChaptersSectionTitle'

interface CoursePageProps {
  params: Promise<{
    courseSlug: string
  }>
}

export default async function CoursePage({ params }: CoursePageProps) {
  const { courseSlug } = await params
  const course = await queryCourseBySlug({ slug: courseSlug })

  if (!course) {
    notFound()
  }

  const chapters = await queryChaptersByCourse({ courseId: course.id })

  return (
    <div className="container mx-auto px-4 py-8">
      <BackToCourses />

      <CourseHeader
        courseLabel={course.courseLabel}
        title={course.title}
        description={course.description}
      />

      <section>
        <ChaptersSectionTitle />

        {chapters.length === 0 ? (
          <EmptyState type="noChapters" />
        ) : (
          <div className="space-y-3">
            {chapters.map((chapter) => (
              <ChapterCard key={chapter.id} chapter={chapter} courseSlug={courseSlug} />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}

export async function generateMetadata({ params }: CoursePageProps) {
  const { courseSlug } = await params
  const course = await queryCourseBySlug({ slug: courseSlug })

  if (!course) {
    return {
      title: 'Course Not Found',
    }
  }

  return {
    title: course.meta?.title || course.title,
    description: course.meta?.description || course.description || undefined,
  }
}

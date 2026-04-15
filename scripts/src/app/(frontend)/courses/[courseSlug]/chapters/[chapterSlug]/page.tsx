import { notFound } from 'next/navigation'
import { queryCourseBySlug } from '@/lib/queries/courses'
import { queryChapterBySlug } from '@/lib/queries/chapters'
import { queryLessonsByChapter } from '@/lib/queries/lessons'
import { ChapterPageBreadcrumb } from '../../../_components/ChapterPageBreadcrumb'
import { ChapterHeader } from '../../../_components/ChapterHeader'
import { LessonsSectionTitle } from '../../../_components/LessonsSectionTitle'
import { LessonCard } from '../../../_components/LessonCard'
import { EmptyState } from '../../../_components/EmptyState'

interface ChapterPageProps {
  params: Promise<{
    courseSlug: string
    chapterSlug: string
  }>
}

export default async function ChapterPage({ params }: ChapterPageProps) {
  const { courseSlug, chapterSlug } = await params

  const [course, chapter] = await Promise.all([
    queryCourseBySlug({ slug: courseSlug }),
    queryChapterBySlug({ slug: chapterSlug }),
  ])

  if (!course || !chapter) {
    notFound()
  }

  // Verify chapter belongs to this course
  const chapterCourse = typeof chapter.course === 'string' ? null : chapter.course

  if (!chapterCourse || chapterCourse.id !== course.id) {
    notFound()
  }

  const lessons = await queryLessonsByChapter({ chapterId: chapter.id })

  return (
    <div className="container mx-auto px-4 py-8">
      <ChapterPageBreadcrumb
        courseTitle={course.title}
        courseSlug={courseSlug}
        chapterTitle={chapter.title}
      />

      <ChapterHeader
        chapterLabel={chapter.chapterLabel}
        title={chapter.title}
        description={chapter.description}
      />

      <section>
        <LessonsSectionTitle />

        {lessons.length === 0 ? (
          <EmptyState type="noLessons" />
        ) : (
          <div className="space-y-3">
            {lessons.map((lesson) => (
              <LessonCard
                key={lesson.id}
                lesson={lesson}
                courseSlug={courseSlug}
                chapterSlug={chapterSlug}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}

export async function generateMetadata({ params }: ChapterPageProps) {
  const { courseSlug, chapterSlug } = await params

  const [course, chapter] = await Promise.all([
    queryCourseBySlug({ slug: courseSlug }),
    queryChapterBySlug({ slug: chapterSlug }),
  ])

  if (!course || !chapter) {
    return {
      title: 'Chapter Not Found',
    }
  }

  const chapterCourse = typeof chapter.course === 'string' ? null : chapter.course

  if (!chapterCourse || chapterCourse.id !== course.id) {
    return {
      title: 'Chapter Not Found',
    }
  }

  return {
    title: `${chapter.title} - ${course.title}`,
    description: chapter.description || `Chapter: ${chapter.title}`,
  }
}

import type { CollectionConfig } from 'payload'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'

const formatSlug = (val: string): string =>
  val
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '')
    .toLowerCase()

export const Lessons: CollectionConfig = {
  slug: 'lessons',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  hooks: {
    beforeChange: [
      ({ data }) => {
        if (data?.title && !data?.slug) {
          data.slug = formatSlug(data.title)
        }
        return data
      },
    ],
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['chapter', 'title', 'slug', 'order', 'status', 'isActive', 'updatedAt'],
  },
  fields: [
    {
      name: 'chapter',
      type: 'relationship',
      relationTo: 'chapters',
      required: true,
      index: true,
      admin: {
        description: 'The chapter this lesson belongs to',
      },
    },
    {
      name: 'title',
      type: 'text',
      required: true,
      index: true,
      admin: {
        description: 'Lesson title',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      admin: {
        description: 'Detailed description of the lesson',
      },
    },
    {
      name: 'order',
      type: 'number',
      required: true,
      defaultValue: 0,
      min: 0,
      admin: {
        description: 'Sort order within the course',
      },
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'draft',
      options: [
        {
          label: 'Draft',
          value: 'draft',
        },
        {
          label: 'Published',
          value: 'published',
        },
        {
          label: 'Archived',
          value: 'archived',
        },
      ],
      admin: {
        description: 'Publication status of the lesson',
      },
    },
    {
      name: 'isActive',
      type: 'checkbox',
      required: true,
      defaultValue: true,
      admin: {
        description: 'Whether this lesson is currently active',
      },
    },
    {
      name: 'contentType',
      type: 'select',
      required: true,
      defaultValue: 'none',
      options: [
        {
          label: 'None',
          value: 'none',
        },
        {
          label: 'PDF',
          value: 'pdf',
        },
      ],
      admin: {
        description: 'Defines how this lesson is delivered.',
      },
    },
    {
      name: 'pdfUrl',
      type: 'text',
      required: false,
      index: true,
      admin: {
        description: 'External PDF URL for this lesson (temporary hosting).',
        condition: (data) => data.contentType === 'pdf',
      },
      validate: (value: unknown, { data }: { data: Record<string, unknown> }) => {
        // Only validate if contentType is 'pdf' and a value is provided
        if (data?.contentType === 'pdf' && value && typeof value === 'string') {
          try {
            const url = new URL(value)
            // Check if URL looks like a PDF (ends with .pdf, ignoring query/hash)
            const pathname = url.pathname.toLowerCase()
            if (!pathname.endsWith('.pdf')) {
              return 'URL must point to a PDF file (should end with .pdf)'
            }
          } catch {
            return 'Must be a valid URL'
          }
        }
        return true
      },
    },
    {
      name: 'slug',
      type: 'text',
      required: false,
      index: true,
      unique: true,
      admin: {
        position: 'sidebar',
        description: 'URL-friendly identifier (auto-generated from title if empty)',
      },
    },
  ],
}

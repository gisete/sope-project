import { GlobalConfig } from 'payload/types'

export const Homepage: GlobalConfig = {
  slug: 'homepage',
  access: {
    read: () => true, // Make it public
  },
  fields: [
    // Section 1: Hero
    {
      name: 'hero',
      label: 'Hero Section',
      type: 'group',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'subtitle',
          type: 'textarea',
        },
        {
          name: 'button',
          label: 'Button',
          type: 'group',
          fields: [
            {
              name: 'text',
              type: 'text',
              required: true,
            },
            {
              name: 'link',
              type: 'text',
              required: true,
            },
          ],
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
    // Section 2: CTA Banner
    {
      name: 'ctaBanner',
      label: 'CTA Banner',
      type: 'group',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'text',
          type: 'textarea',
          required: true,
        },
        {
          name: 'buttons',
          label: 'Buttons',
          type: 'array',
          minRows: 1,
          maxRows: 2,
          fields: [
            {
              name: 'text',
              type: 'text',
              required: true,
            },
            {
              name: 'link',
              type: 'text',
              required: true,
            },
            {
              name: 'style',
              type: 'select',
              options: ['fill', 'outline'],
              defaultValue: 'fill',
              required: true,
            },
          ],
        },
      ],
    },
    // Section 3: Activities
    {
      name: 'activitiesSection',
      label: 'Activities Section',
      type: 'group',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'text',
          type: 'textarea',
          required: true,
        },
        {
          name: 'activities',
          label: 'Activities',
          type: 'array',
          minRows: 3,
          maxRows: 3,
          fields: [
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
              required: true,
            },
          ],
        },
        {
          name: 'button',
          label: 'Button',
          type: 'group',
          fields: [
            {
              name: 'text',
              type: 'text',
              required: true,
            },
            {
              name: 'link',
              type: 'text',
              required: true,
            },
          ],
        },
      ],
    },
  ],
}

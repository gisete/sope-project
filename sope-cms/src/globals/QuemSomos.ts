import { GlobalConfig } from 'payload'

export const QuemSomos: GlobalConfig = {
  slug: 'quem-somos',
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
          name: 'description',
          type: 'textarea',
          required: true,
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
    // Section 2: O Sopé (Brown section)
    {
      name: 'oSopeSection',
      label: 'O Sopé Section',
      type: 'group',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          defaultValue: 'O Sopé...',
        },
        {
          name: 'text',
          type: 'textarea',
          required: true,
        },
      ],
    },
    // Section 3: Nossos Princípios
    {
      name: 'principiosSection',
      label: 'Nossos Princípios Section',
      type: 'group',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          defaultValue: 'Nossos Princípios',
        },
        {
          name: 'content',
          label: 'Content Blocks',
          type: 'array',
          minRows: 1,
          maxRows: 10,
          fields: [
            {
              name: 'type',
              type: 'select',
              options: [
                { label: 'Text Paragraph', value: 'text' },
                { label: 'Image', value: 'image' },
              ],
              required: true,
            },
            {
              name: 'text',
              type: 'textarea',
              admin: {
                condition: (data, siblingData) => siblingData.type === 'text',
              },
            },
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
              admin: {
                condition: (data, siblingData) => siblingData.type === 'image',
              },
            },
            {
              name: 'imagePosition',
              label: 'Image Position',
              type: 'select',
              options: [
                { label: 'Left', value: 'left' },
                { label: 'Right', value: 'right' },
                { label: 'Center', value: 'center' },
              ],
              defaultValue: 'right',
              admin: {
                condition: (data, siblingData) => siblingData.type === 'image',
              },
            },
          ],
        },
      ],
    },
    // Section 4: O Que Pretendemos
    {
      name: 'pretendemoSection',
      label: 'O Que Pretendemos Section',
      type: 'group',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          defaultValue: 'O Que Pretendemos',
        },
        {
          name: 'layout',
          label: 'Content Layout',
          type: 'select',
          options: [
            { label: 'Text Left, Image Right', value: 'text-left' },
            { label: 'Image Left, Text Right', value: 'image-left' },
          ],
          defaultValue: 'text-left',
        },
        {
          name: 'bulletPoints',
          label: 'Bullet Points',
          type: 'array',
          minRows: 1,
          maxRows: 10,
          fields: [
            {
              name: 'text',
              type: 'text',
              required: true,
            },
          ],
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: false,
        },
      ],
    },
    // Section 5: A Nossa Equipa
    {
      name: 'equipaSection',
      label: 'A Nossa Equipa Section',
      type: 'group',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          defaultValue: 'A Nossa Equipa',
        },
        {
          name: 'teamMembers',
          label: 'Team Members',
          type: 'array',
          minRows: 1,
          maxRows: 10,
          fields: [
            {
              name: 'name',
              type: 'text',
              required: true,
            },
            {
              name: 'title',
              label: 'Job Title/Credentials',
              type: 'text',
              required: true,
            },
            {
              name: 'description',
              type: 'textarea',
              required: true,
            },
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
              required: true,
            },
          ],
        },
      ],
    },
  ],
}

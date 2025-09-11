import { CollectionConfig } from 'payload/types'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
  },
  // ADD THIS ACCESS BLOCK
  access: {
    read: () => true, // Allows public read access
  },
  fields: [
    {
      name: 'title',
      label: 'Title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      label: 'Slug',
      type: 'text',
      admin: {
        position: 'sidebar',
      },
      index: true,
    },
    {
      name: 'content',
      label: 'Page Content',
      type: 'richText',
    },
  ],
}

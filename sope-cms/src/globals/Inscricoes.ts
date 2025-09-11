import { GlobalConfig } from 'payload/types'

export const Inscricoes: GlobalConfig = {
  slug: 'inscricoes',
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
          required: false,
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
    // Section 2: Programs/Offerings
    {
      name: 'programs',
      label: 'Programs',
      type: 'array',
      minRows: 1,
      maxRows: 10,
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
          name: 'ageRange',
          label: 'Age Range',
          type: 'text',
          required: false,
          admin: {
            description:
              'e.g., "Os playgroups para bebés destinam-se a crianças entre os 6 meses e os 3 anos de idade."',
          },
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'imagePosition',
          label: 'Image Position',
          type: 'select',
          options: [
            { label: 'Left', value: 'left' },
            { label: 'Right', value: 'right' },
          ],
          defaultValue: 'left',
          required: true,
        },
        {
          name: 'backgroundColor',
          label: 'Background Color',
          type: 'select',
          options: [
            { label: 'Pink', value: 'pink' },
            { label: 'Light Gray', value: 'gray' },
            { label: 'Light Blue', value: 'blue' },
            { label: 'Light Green', value: 'green' },
            { label: 'White', value: 'white' },
          ],
          defaultValue: 'white',
          required: true,
        },
        {
          name: 'buttons',
          label: 'Action Buttons',
          type: 'group',
          fields: [
            {
              name: 'inscricaoButton',
              label: 'Inscrição Button',
              type: 'group',
              fields: [
                {
                  name: 'text',
                  type: 'text',
                  defaultValue: 'INSCRIÇÃO',
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
              name: 'informacoesButton',
              label: 'Informações Button',
              type: 'group',
              fields: [
                {
                  name: 'text',
                  type: 'text',
                  defaultValue: 'INFORMAÇÕES',
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
    },
  ],
}

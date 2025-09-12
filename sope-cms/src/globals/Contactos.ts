import { GlobalConfig } from 'payload'

export const Contactos: GlobalConfig = {
  slug: 'contactos',
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
          defaultValue: 'Contactos',
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
    // Section 2: Contact Information
    {
      name: 'contactInfo',
      label: 'Contact Information',
      type: 'group',
      fields: [
        {
          name: 'phone',
          label: 'Phone Number',
          type: 'text',
          required: true,
          defaultValue: '+351 950 270 856',
        },
        {
          name: 'email',
          label: 'Email Address',
          type: 'text',
          required: true,
          defaultValue: 'sope.silvere@gmail.com',
        },
        {
          name: 'address',
          label: 'Address',
          type: 'group',
          fields: [
            {
              name: 'street',
              label: 'Street Address',
              type: 'text',
              required: true,
              defaultValue: 'Est. da Charneca, Benedita',
            },
            {
              name: 'postalCode',
              label: 'Postal Code',
              type: 'text',
              required: true,
              defaultValue: '2475-024',
            },
            {
              name: 'description',
              label: 'Location Description',
              type: 'textarea',
              admin: {
                description: 'Additional details about how to find the location',
              },
            },
          ],
        },
        {
          name: 'socialMedia',
          label: 'Social Media',
          type: 'group',
          fields: [
            {
              name: 'instagram',
              label: 'Instagram URL',
              type: 'text',
              required: false,
            },
            {
              name: 'facebook',
              label: 'Facebook URL',
              type: 'text',
              required: false,
            },
          ],
        },
      ],
    },
    // Section 3: Contact Form Settings
    {
      name: 'contactForm',
      label: 'Contact Form',
      type: 'group',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          defaultValue: 'Fale Connosco',
        },
        {
          name: 'description',
          type: 'textarea',
          required: false,
          defaultValue: 'Tem alguma questão? Não hesite em contactar-nos.',
        },
        {
          name: 'submitButtonText',
          label: 'Submit Button Text',
          type: 'text',
          required: true,
          defaultValue: 'Enviar Mensagem',
        },
      ],
    },
    // Section 4: Opening Hours (Optional)
    {
      name: 'openingHours',
      label: 'Opening Hours',
      type: 'group',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          defaultValue: 'Horários',
        },
        {
          name: 'schedule',
          label: 'Weekly Schedule',
          type: 'array',
          minRows: 1,
          maxRows: 7,
          fields: [
            {
              name: 'day',
              type: 'text',
              required: true,
            },
            {
              name: 'hours',
              type: 'text',
              required: true,
            },
            {
              name: 'notes',
              type: 'text',
              required: false,
            },
          ],
        },
      ],
    },
  ],
}

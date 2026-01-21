export const textSegment = {
  type: 'object',
  name: 'textSegment',
  title: 'Text Segment',
  fields: [
    {
      name: 'type',
      title: 'Type',
      type: 'string',
      options: {
        list: [
          { title: 'Normal', value: 'normal' },
          { title: 'Highlight', value: 'highlight' },
        ],
        layout: 'radio',
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'text',
      title: 'Text',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
  ],
  preview: {
    select: {
      type: 'type',
      text: 'text',
    },
    prepare(selection: { type: string; text: string }) {
      const { type, text } = selection
      return {
        title: text,
        subtitle: type === 'highlight' ? 'Highlighted' : 'Normal',
      }
    },
  },
}

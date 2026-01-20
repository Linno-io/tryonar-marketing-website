export const link = {
  name: 'link',
  title: 'Link',
  type: 'object',
  fields: [
    {
      name: 'type',
      title: 'Link Type',
      type: 'string',
      options: {
        list: [
          { title: 'Internal', value: 'internal' },
          { title: 'External', value: 'external' },
        ],
        layout: 'radio',
      },
      validation: (rule : any) => rule.required(),
    },

    {
      name: 'internalLink',
      title: 'Internal Link',
      type: 'reference',
      to: [{ type: 'page' }],
      hidden: ({ parent } : {parent: any}) => parent?.type !== 'internal',
    },

    {
      name: 'externalLink',
      title: 'External Link',
      type: 'url',
      validation: (rule : any) =>
        rule.uri({ scheme: ['http', 'https'] }),
      hidden: ({ parent } : {parent: any}) => parent?.type !== 'external',
    },
  ],
}

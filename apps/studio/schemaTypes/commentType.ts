import {defineType, defineField} from 'sanity'

export const commentType = defineType({
  name: 'comment',
  title: 'Comment',
  type: 'document',
  fields: [
    defineField({ name: 'post', title: 'Post', type: 'reference', to: [{ type: 'post' }], validation: Rule => Rule.required() }),
    defineField({ name: 'userName', title: 'Name', type: 'string', validation: Rule => Rule.required() }),
    defineField({ name: 'userEmail', title: 'Email', type: 'string', validation: Rule => Rule.required().email() }),
    defineField({ name: 'text', title: 'Comment', type: 'text', validation: Rule => Rule.required() }),
    defineField({ name: 'parent', title: 'Parent Comment', type: 'reference', to: [{ type: 'comment' }] }),
    defineField({ name: 'approved', title: 'Approved', type: 'boolean', initialValue: false })
  ]
})

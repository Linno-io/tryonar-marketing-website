import {defineType, defineField} from 'sanity'

export const userType = defineType({
  name: 'user',
  title: 'User',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Name', type: 'string', validation: Rule => Rule.required() }),
    defineField({ name: 'email', title: 'Email', type: 'string', validation: Rule => Rule.required().email() }),
    defineField({ name: 'role', title: 'Role', type: 'string', options: { list: ['editor', 'reviewer', 'admin'] } })
  ]
})

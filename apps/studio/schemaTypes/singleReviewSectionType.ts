import { defineType } from 'sanity'

export const singleReviewSectionType = defineType({
    name: 'singleReviewSectionType',
    title: 'Single Review Section',
    type: 'object',
    fields: [
        {
            name: 'rating',
            title: 'Rating',
            type: 'number',
            validation: (rule) => rule.required(),
            description: 'Rating out of 5 stars',
        },
        {
            name: 'review',
            title: 'Review',
            type: 'richTextHighlight',
            validation: (rule) => rule.required(),
            description: 'Customer review text',
        },
        {
            name: 'author',
            title: 'Author',
            type: 'object',
            validation: (rule) => rule.required(),
            description: 'Author details for the review',
            fields: [
                {
                    name: 'name',
                    title: 'Name',
                    type: 'string',
                    validation: (rule) => rule.required(),
                },
                {
                    name: 'position',
                    title: 'Position',
                    type: 'string',
                    validation: (rule) => rule.required(),
                },
                {
                    name: 'image',
                    title: 'Author Image',
                    type: 'image',
                    fields: [
                        {
                            name: 'alt',
                            title: 'Alt Text',
                            type: 'string',
                            validation: (rule) => rule.required()
                        }
                    ],
                    validation: (rule) => rule.required(),
                }
            ],
            preview: {
                select: {
                    name: 'name',
                    position: 'position',
                    image: 'image'
                },

                prepare(selection: {
                    name?: string
                    position?: string
                    image?: any
                }) {
                    const { name, position, image } = selection

                    return {
                        title: name || 'Untitled',
                        subtitle: position || '',
                        media: image
                    }
                }
            }

        },
    ],
    preview: {
        select: {
            review: 'review',
            authorName: 'author.name',
        },
        prepare(selection: { review?: any; authorName?: string }) {
            const { review, authorName } = selection

            const plainReview = Array.isArray(review)
                ? review.map((r) => r?.text).join(' ')
                : 'Single Review Section'

            return {
                title: plainReview
                    ? plainReview.length > 50
                        ? plainReview.substring(0, 50) + '...'
                        : plainReview
                    : 'Single Review Section',
                subtitle: authorName || 'No author name',
            }
        },
    },

})

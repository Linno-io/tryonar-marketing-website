import { defineType } from 'sanity'

export const featureShowcaseSectionType = defineType({
    name: 'featureShowcaseSectionType',
    title: 'Feature Showcase Section',
    type: 'object',
    fields: [
        {
            name: 'tagline',
            title: 'Tagline',
            type: 'string',
            description: 'Small label above the title (e.g. "Coming Soon")',
        },
        {
            name: 'title',
            title: 'Title',
            type: 'richTextHighlight',
            validation: (rule) => rule.required(),
        },
        {
            name: 'description',
            title: 'Description',
            type: 'text',
            rows: 3,
            validation: (rule) => rule.required(),
        },
        {
            name: 'sectionImage',
            title: 'Image / Video Poster',
            type: 'image',
            fields: [
                {
                    name: 'alt',
                    title: 'Alt Text',
                    type: 'string',
                }
            ],
            validation: (rule) => rule.required(),
            description: 'Shown as standalone image, or as poster frame before the video plays',
        },
        {
            name: 'sectionVideo',
            title: 'Video (optional)',
            type: 'file',
            options: {
                accept: 'video/*',
            },
            description: 'If provided, image above becomes the poster. Video lazy-loads when section enters viewport.',
        },
        {
            name: 'showFrame',
            title: 'Show Phone Frame',
            type: 'boolean',
            initialValue: false,
            description: 'Wrap the image/video inside a phone frame overlay',
        },
        {
            name: 'frameImage',
            title: 'Phone Frame Image',
            type: 'image',
            fields: [
                {
                    name: 'alt',
                    title: 'Alt Text',
                    type: 'string',
                }
            ],
            hidden: ({ parent }: { parent: any }) => !parent?.showFrame,
            description: 'Upload a phone frame PNG with a transparent screen area. The image/video will show through the transparent region.',
        },
    ],
    preview: {
        select: {
            title: 'title',
            media: 'sectionImage',
        },
        prepare(selection: { title?: any[]; media?: any }) {
            const plainTitle = Array.isArray(selection.title)
                ? selection.title.map((t) => t?.text).join(' ')
                : 'Feature Showcase Section'
            return {
                title: plainTitle || 'Feature Showcase Section',
                subtitle: 'Feature Showcase Section',
                media: selection.media,
            }
        },
    },
})

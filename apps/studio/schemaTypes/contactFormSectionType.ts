import { defineType } from 'sanity'

export const contactFormSectionType = defineType({
    name: 'contactFormSectionType',
    title: 'Contact Form Section',
    type: 'object',
    fields: [
        {
            name: 'nameLabel',
            title: 'Name Field Label',
            type: 'string',
            initialValue: 'Name',
        },
        {
            name: 'emailLabel',
            title: 'Email Field Label',
            type: 'string',
            initialValue: 'Email',
        },
        {
            name: 'subjectLabel',
            title: 'Subject Field Label',
            type: 'string',
            initialValue: 'Subject',
        },
        {
            name: 'messageLabel',
            title: 'Message Field Label',
            type: 'string',
            initialValue: 'Message',
        },
        {
            name: 'messagePlaceholder',
            title: 'Message Placeholder',
            type: 'string',
            initialValue: 'Describe your issue',
        },
        {
            name: 'submitButtonText',
            title: 'Submit Button Text',
            type: 'string',
            initialValue: 'Submit Now',
        },
        {
            name: 'termsText',
            title: 'Terms Disclaimer Text',
            type: 'string',
            initialValue: 'By submitting this form, you agree to our affiliate program',
        },
        {
            name: 'termsLinkText',
            title: 'Terms Link Text',
            type: 'string',
            initialValue: 'Terms of services',
        },
        {
            name: 'termsLinkUrl',
            title: 'Terms Link URL',
            type: 'url',
            validation: Rule =>
                Rule.uri({ scheme: ['http', 'https'] }).optional(),
        },
        {
            name: 'privacyLinkText',
            title: 'Privacy Link Text',
            type: 'string',
            initialValue: 'Privacy & Policy',
        },
        {
            name: 'privacyLinkUrl',
            title: 'Privacy Link URL',
            type: 'url',
            validation: Rule =>
                Rule.uri({ scheme: ['http', 'https'] }).optional(),
        },
    ],
    preview: {
        prepare() {
            return { title: 'Contact Form Section' }
        },
    },
})

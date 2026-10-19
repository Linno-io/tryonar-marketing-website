import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {documentInternationalization} from '@sanity/document-internationalization'
import {schemaTypes} from './schemaTypes'
import {SUPPORTED_LANGUAGES, TRANSLATED_SCHEMA_TYPES} from './i18n'

export default defineConfig({
  name: 'default',
  title: 'TryonAR Marketing Hub',

  projectId: '90a20xmm',
  dataset: 'production',

  plugins: [
    structureTool(),
    visionTool(),
    documentInternationalization({
      supportedLanguages: SUPPORTED_LANGUAGES,
      schemaTypes: TRANSLATED_SCHEMA_TYPES,
      // Lets editors link the existing English documents to new translations.
      allowCreateMetaDoc: true,
    }),
  ],

  schema: {
    types: schemaTypes,
  },
})

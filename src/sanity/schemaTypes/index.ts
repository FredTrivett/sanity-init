import { type SchemaTypeDefinition } from 'sanity'

import { pageType } from './pageType'
import { heroSectionType } from './heroSectionType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    // Documents
    pageType,
    // Section objects
    heroSectionType,
  ],
}

'use client'

/**
 * This configuration is used to for the Sanity Studio that's mounted on the `/app/studio/[[...tool]]/page.tsx` route
 */

import { visionTool } from '@sanity/vision'
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { presentationTool } from 'sanity/presentation'
import { seoMetaFields } from 'sanity-plugin-seo'

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import { apiVersion, dataset, projectId } from './src/sanity/env'
import { schema } from './src/sanity/schemaTypes'
import { structure } from './src/sanity/structure'

// Frontend URL - change this to your production URL
const FRONTEND_URL = 'https://sanity-page-builder.frederictrivett.workers.dev'

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  // Add and edit the content schema in the './sanity/schemaTypes' folder
  schema,
  plugins: [
    structureTool({ structure }),
    // Presentation tool for Visual Editing
    presentationTool({
      previewUrl: {
        initial: FRONTEND_URL,
        previewMode: {
          enable: '/api/draft-mode/enable',
        },
      },
      // Allow these origins to connect to the Studio
      allowOrigins: [
        FRONTEND_URL,
        'http://localhost:3000',
        'http://localhost:*',
      ],
    }),
    // SEO Meta Fields plugin
    seoMetaFields(),
    // Vision is for querying with GROQ from inside the Studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({ defaultApiVersion: apiVersion }),
  ],
})

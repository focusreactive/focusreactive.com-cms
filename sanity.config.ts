import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './schemas';
import { markdownSchema } from 'sanity-plugin-markdown';
import { defaultDocumentNode } from './structure';
import { media } from 'sanity-plugin-media';

export default defineConfig({
  name: 'fr-website',
  title: 'FR Website',

  projectId: 'vftxng62',
  dataset: 'production',

  plugins: [
    structureTool({
      defaultDocumentNode,
    }),
    visionTool({
      defaultApiVersion: '2021-10-21',
    }),
    markdownSchema(),
    media(),
  ],

  schema: {
    types: schemaTypes,
  },
});

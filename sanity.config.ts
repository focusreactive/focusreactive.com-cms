import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import { visionTool } from '@sanity/vision';
import { lighthousePlugin } from 'sanity-lighthouse-plugin';
import { schemaTypes } from './schemas';
import { markdownSchema } from 'sanity-plugin-markdown';
import { defaultDocumentNode } from './structure';
import { Logo } from './components/Logo';
import { media } from 'sanity-plugin-media';
import { RebuildPreview } from './actions/TriggerPreviewRebuild';

export default defineConfig({
  name: 'fr-website',
  title: 'FR Website',

  projectId: 'vftxng62',
  dataset: 'production',

  plugins: [
    deskTool({
      defaultDocumentNode,
    }),
    visionTool({
      defaultApiVersion: '2021-10-21',
    }),
    lighthousePlugin(),
    markdownSchema(),
    media(),
  ],

  schema: {
    types: schemaTypes,
  },

  studio: {
    components: {
      logo: Logo,
    },
  },

  document: {
    actions: [RebuildPreview],
  },
});

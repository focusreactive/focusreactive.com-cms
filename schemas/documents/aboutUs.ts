import { textSizeControl } from '../common';

const aboutUsPage = {
  name: 'aboutUsPage',
  title: 'About Us Page',
  type: 'document',
  preview: { prepare: () => ({ title: 'About Us' }) },
  fields: [
    {
      name: 'intoTitle',
      title: 'Intro Title',
      type: 'string',
    },

    {
      name: 'intoSubtitle',
      title: 'Intro Subtitle',
      type: 'string',
    },
    {
      name: 'introDescription',
      title: 'Intro Description',
      type: 'object',
      fields: [
        {
          name: 'text',
          title: 'Text',
          type: 'array',
          of: [{ type: 'block' }],
        },
        textSizeControl,
      ],
    },
  ],
};

export default [aboutUsPage];

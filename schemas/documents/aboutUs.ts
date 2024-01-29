import { CaseIcon } from '@sanity/icons';

import { textSizeControl } from '../common';

const aboutUsPage = {
  name: 'aboutUsPage',
  title: 'About Us Page',
  type: 'document',
  options: {
    singleton: true,
  },
  icon: CaseIcon,
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
    {
      name: 'emailForm',
      title: 'Email Form Section',
      type: 'emailForm',
    },
  ],
};

export default [aboutUsPage];

import { MasterDetailIcon } from '@sanity/icons';

const portfolioTechnologiesItems = {
  name: 'portfolioTechnologiesItems',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'link',
      title: 'Link',
      type: 'string',
    },
    {
      name: 'icon',
      title: 'Icon',
      type: 'image',
    },
  ],
};

const portfolioTechnologies = {
  name: 'portfolioTechnologies',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'items',
      title: 'Technologies',
      type: 'array',
      of: [{ type: 'portfolioTechnologiesItems' }],
    },
  ],
};

const tagsItem = {
  name: 'tagsItem',
  title: 'Tags',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Tag',
      type: 'string',
    },
  ],
};

const portfolioItem = {
  name: 'portfolioItem',
  title: 'Portfolio Item',
  type: 'object',
  fields: [
    { name: 'title', title: 'Title', type: 'string' },
    { name: 'link', title: 'Link', type: 'string' },
    {
      name: 'richText',
      title: 'Description',
      type: 'array',
      of: [
        {
          type: 'block',
        },
      ],
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'tagsItem' }],
    },

    { name: 'logo', title: 'Logo', type: 'image' },
    { name: 'background', title: 'Background', type: 'image' },
    {
      name: 'portfolioTechnologies',
      title: 'Technologies',
      type: 'array',
      of: [{ type: 'portfolioTechnologies' }],
    },
  ],
};

const portfolio = {
  name: 'portfolio',
  title: 'Portfolio Block',
  type: 'object',
  fields: [
    {
      name: 'elements',
      type: 'array',
      of: [{ type: 'portfolioItem' }],
    },
  ],
};

const portfolioPage = {
  name: 'portfolioPage',
  title: 'Portfolio Page',
  type: 'document',
  icon: MasterDetailIcon,
  options: {
    singleton: true,
  },
  preview: { prepare: () => ({ title: 'Portfolio' }) },
  fields: [
    {
      name: 'titleLines',
      title: 'Title Lines',
      type: 'array',
      of: [{ type: 'string' }],
      validate: (Rule) => Rule.max(50).warning('No more than 5 words are allowed'),
    },

    {
      name: 'description',
      title: 'Description',
      type: 'string',
    },

    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'portfolio',
      title: 'Portfolio Block',
      type: 'portfolio',
    },
    {
      name: 'emailForm',
      title: 'Email Form Section',
      type: 'emailForm',
    },
    {
      name: 'footer',
      title: 'Footer',
      type: 'reference',
      validation: (Rule) => Rule.required(),
      to: [{ type: 'footer' }],
    },
  ],
};

export default [portfolioPage, portfolio, portfolioItem, portfolioTechnologies, portfolioTechnologiesItems, tagsItem];

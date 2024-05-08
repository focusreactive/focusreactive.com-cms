import { MasterDetailIcon, RocketIcon } from '@sanity/icons';
import { defineType } from 'sanity';
import { getBlock, sectionConfigField } from './landing';

const heroWithVideo = getBlock('heroWithVideo', {
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'subTitle',
      title: 'Sub Title',
      type: 'string',
    },

    {
      name: 'video',
      title: 'Video',
      type: 'string',
    },
  ],
});

const ourMission = getBlock('ourMission', {
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'richText',
      title: 'Sub Title',
      type: 'array',
      of: [
        {
          type: 'block',
        },
      ],
    },

    {
      name: 'bgImage',
      title: 'Image',
      type: 'image',
    },
    sectionConfigField,
  ],
});

const coreSdkItems = getBlock('coreSdkItems', {
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'text',
      title: 'Text',
      type: 'array',
      of: [
        {
          type: 'block',
        },
      ],
    },
    {
      name: 'link',
      title: 'Link',
      type: 'string',
    },
    {
      name: 'logos',
      title: 'Logos',
      type: 'array',
      of: [{ type: 'image' }],
    },
  ],
});

const coreSdk = getBlock('coreSdk', {
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'titleLink',
      title: 'Title link',
      type: 'string',
    },
    {
      name: 'link',
      title: 'Github link',
      type: 'string',
    },
    {
      name: 'items',
      title: 'Items',
      type: 'array',
      of: [{ type: 'coreSdkItems' }],
    },
    sectionConfigField,
  ],
});

const pyramidItems = getBlock('pyramidItems', {
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'richText',
      title: 'Text',
      description: 'if you need title -> h3',
      type: 'array',
      of: [
        {
          type: 'block',
        },
      ],
    },
  ],
});

const pyramid = getBlock('pyramid', {
  fields: [
    {
      name: 'items',
      title: 'Items',
      type: 'array',
      of: [{ type: 'pyramidItems' }],
    },
    sectionConfigField,
  ],
});

const ctaBlock = getBlock('ctaBlock', {
  fields: [
    {
      name: 'text',
      title: 'Text',
      type: 'string',
    },
    {
      name: 'btnText',
      title: 'Button text',
      type: 'string',
    },
    {
      name: 'btnLink',
      title: 'Button link',
      type: 'string',
    },
    sectionConfigField,
  ],
});

const quoteBlock = getBlock('quoteBlock', {
  fields: [
    {
      name: 'richText',
      title: 'Text',
      type: 'array',
      of: [
        {
          type: 'block',
        },
      ],
    },
    {
      name: 'authorName',
      title: 'Author name',
      type: 'string',
    },
    {
      name: 'authorInfo',
      title: 'Author info',
      type: 'string',
    },
    {
      name: 'authorAvatar',
      title: 'Author avatar',
      type: 'image',
    },
    sectionConfigField,
  ],
});

const formBlock = getBlock('formBlock', {
  fields: [
    {
      name: 'text',
      title: 'Text',
      type: 'string',
    },
    {
      name: 'btnText',
      title: 'Button text',
      type: 'string',
    },
    sectionConfigField,
  ],
});

const scenariosItems = getBlock('scenariosItems', {
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'string',
    },
    {
      name: 'icon',
      title: 'Icon',
      type: 'image',
    },
    {
      name: 'richText',
      title: 'Text',
      type: 'array',
      of: [
        {
          type: 'block',
        },
      ],
    },
  ],
});

const scenarios = getBlock('scenarios', {
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'items',
      title: 'Items',
      type: 'array',
      of: [{ type: 'scenariosItems' }],
    },
    sectionConfigField,
  ],
});

const painsGainsItems = getBlock('painsGainsItems', {
  fields: [
    {
      name: 'disabledText',
      title: 'Title disabled',
      type: 'string',
    },
    {
      name: 'enabledText',
      title: 'Title enabled',
      type: 'string',
    },
  ],
});
const painsGains = getBlock('painsGains', {
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },

    {
      name: 'items',
      title: 'Items',
      type: 'array',
      of: [{ type: 'painsGainsItems' }],
    },
    sectionConfigField,
  ],
});

const cmsKitPage = defineType({
  name: 'cmsKitPage',
  title: 'Cms Kit Page',
  type: 'document',
  icon: RocketIcon,
  options: {
    singleton: true,
  },

  preview: { prepare: () => ({ title: 'CmsKit' }) },
  fields: [
    {
      name: 'blocks',
      title: 'Page Blocks',
      type: 'array',
      of: [
        { type: 'hero' },
        { type: 'heroWithVideo' },
        { type: 'ourMission' },
        { type: 'coreSdk' },
        { type: 'pyramid' },
        { type: 'ctaBlock' },
        { type: 'quoteBlock' },
        { type: 'formBlock' },
        { type: 'scenarios' },
        { type: 'painsGains' },
        { type: 'fullWidthImage' },
        { type: 'fullWidthVideo' },
        { type: 'chartCms' },
        { type: 'chartECommerce' },
        { type: 'teamV2' },
        { type: 'introList' },
        { type: 'faq' },
        { type: 'aboutText' },
        { type: 'teasers' },
        { type: 'reviews' },
        { type: 'clientsAccordion' },
        { type: 'landingBlog' },
        { type: 'counters' },
        { type: 'singleReview' },
        { type: 'contentColumns' },
        { type: 'technologies' },
      ],
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
});

export default [
  cmsKitPage,
  heroWithVideo,
  ourMission,
  coreSdk,
  coreSdkItems,
  pyramid,
  pyramidItems,
  ctaBlock,
  quoteBlock,
  formBlock,
  scenarios,
  scenariosItems,
  painsGains,
  painsGainsItems,
];

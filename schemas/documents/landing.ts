import { defineType, FieldDefinition, FieldGroupDefinition } from 'sanity';
import { RocketIcon } from '@sanity/icons';
import { textSizeControl } from '../common';
import { slugValidation } from '../validation';

export const sectionConfig = {
  name: 'sectionConfig',
  type: 'object',
  fields: [
    {
      name: 'disableTopPadding',
      type: 'boolean',
    },
    {
      name: 'disableBottomPadding',
      type: 'boolean',
    },
    {
      name: 'darkMode',
      type: 'boolean',
    },
  ],
};

export const sectionConfigField = {
  name: 'sectionConfig',
  type: 'sectionConfig',
  group: 'sectionConfigGroup',
};

export const getBlock = (name: string, { fields, groups, preview }: { fields: FieldDefinition[]; groups?: FieldGroupDefinition[], preview?: {} }) =>
  defineType({
    name,
    type: 'object',
    groups: [
      {
        name: 'sectionConfigGroup',
        title: 'Section Config',
      },
      ...(groups || []),
    ],
    fields: [
      {
        name: 'documentTitle',
        title: 'Document Title',
        description: 'visible only in CMS',
        type: 'string',
      },
      ...fields,
    ],
    preview: preview || {
      select: { title: 'title', documentTitle: 'documentTitle' },
      prepare({ title, documentTitle }) {
        return { subtitle: name, title: documentTitle || title };
      },
    },
  });

const heroDark = getBlock('heroDark', {
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'colored',
      title: 'Title has full-color style',
      type: 'boolean',
    },
    {
      name: 'titleShadow',
      title: 'Title Shadow',
      type: 'boolean',
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
    },
    {
      name: 'bgImage',
      title: 'Background Image',
      type: 'image',
    },
    {
      name: 'hint',
      title: 'Hint',
      type: 'string',
    },
  ],
});

const hero = getBlock('hero', {
  fields: [
    {
      name: 'titleLines',
      title: 'Title Lines',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'isCustomFirstLineDisabled',
      title: 'Custom first line styled disabled',
      description: '(transparent && border)',
      type: 'boolean',
    },
    {
      name: 'titleColor',
      title: 'Title Color',
      type: 'string',
    },
    {
      name: 'titlePosition',
      title: 'Title Position',
      type: 'string',
      options: {
        list: [
          { title: 'Top', value: 'top' },
          { title: 'Center', value: 'center' },
          { title: 'Bottom', value: 'bottom' },
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
    },
    {
      name: 'titleShadow',
      title: 'Title Shadow',
      type: 'boolean',
    },
    {
      name: 'isCustomBgImage',
      title: 'background picture on the right',
      description: '(cover && right)',
      type: 'boolean',
    },
    {
      name: 'image',
      title: 'Background Image',
      type: 'image',
    },
    {
      name: 'partners',
      type: 'array',
      of: [{ type: 'heroPartner' }],
    },
  ],
});

const heroPartner = getBlock('heroPartner', {
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
    },
    {
      name: 'image',
      title: 'Logo',
      type: 'image',
    },
  ],
});

const heroCaseStudy = getBlock('heroCaseStudy', {
  fields: [
    {
      name: 'titleLines',
      title: 'Title Lines',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'isCustomFirstLineDisabled',
      title: 'Custom first line styled disabled',
      description: '(transparent && border)',
      type: 'boolean',
    },
    {
      name: 'titleColor',
      title: 'Title Color',
      type: 'string',
    },
    {
      name: 'titleShadow',
      title: 'Title Shadow',
      type: 'boolean',
    },
    {
      name: 'image',
      title: 'Background Image',
      type: 'image',
    },
    {
      name: 'projectDetailsLogo',
      title: 'Project Logo',
      type: 'image',
    },
    {
      name: 'projectDetailsList',
      title: 'Project Details',
      type: 'array',
      of: [{ type: 'projectDetailsList' }],
    },
  ],
});

const projectDetailsList = getBlock('projectDetailsList', {
  fields: [
    {
      name: 'title',
      title: 'title',
      type: 'string',
    },
    {
      name: 'link',
      title: 'link',
      type: 'string',
    },
    {
      name: 'projectDetailsListItem',
      type: 'array',
      of: [{ type: 'string' }],
    },
  ],
});
const aboutText = getBlock('aboutText', {
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
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
    {
      name: 'hideListMarkers',
      title: 'Hide List Markers',
      type: 'boolean',
    },
    textSizeControl,
    {
      name: 'position',
      title: 'Text Position',
      type: 'string',
      options: {
        list: [
          { title: 'Left', value: 'left' },
          { title: 'Center', value: 'center' },
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
    },
    sectionConfigField,
  ],
});

const teasersItem = getBlock('teasersItem', {
  fields: [
    {
      name: 'image',
      title: 'Logo',
      type: 'image',
    },
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'text',
      title: 'Text',
      type: 'string',
    },
    {
      name: 'richText',
      title: 'Text',
      type: 'array',
      of: [{ type: 'block' }],
    },
    {
      name: 'buttonText',
      title: 'Button Text',
      type: 'string',
    },
    {
      name: 'url',
      title: 'Link',
      type: 'url',
    },
  ],
});

const teasers = getBlock('teasers', {
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'elements',
      title: 'Elements',
      type: 'array',
      of: [{ type: 'teasersItem' }],
    },
    sectionConfigField,
  ],
});

const reviewsItem = getBlock('reviewsItem', {
  fields: [
    {
      name: 'image',
      title: 'Photo',
      type: 'image',
    },
    {
      name: 'name',
      title: 'Name',
      type: 'string',
    },
    {
      name: 'role',
      title: 'Role',
      type: 'string',
    },
    {
      name: 'text',
      title: 'Text',
      type: 'string',
    },
  ],
});

const reviews = getBlock('reviews', {
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'elements',
      title: 'Elements',
      type: 'array',
      of: [{ type: 'reviewsItem' }],
    },
  ],
});

const clientsAccordionItem = getBlock('clientsAccordionItem', {
  fields: [
    {
      name: 'name',
      title: 'Name',
      description: 'left side',
      type: 'string',
    },
    {
      name: 'title',
      title: 'Title',
      description: 'right side',
      type: 'string',
    },
    {
      name: 'elements',
      title: 'Elements',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'linkTitle',
      title: 'Link Title',
      type: 'string',
    },
    {
      name: 'link',
      title: 'Link',
      type: 'string',
    },
  ],
});

const clientsAccordion = getBlock('clientsAccordion', {
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'cases',
      title: 'Elements',
      type: 'array',
      of: [{ type: 'clientsAccordionItem' }],
    },
  ],
});

const landingBlogItem = getBlock('landingBlogItem', {
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
      name: 'url',
      title: 'Url',
      type: 'url',
      validation: (rule) => rule.required(),
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
    },
  ],
});

const landingBlog = getBlock('landingBlog', {
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'cases',
      title: 'Elements',
      type: 'array',
      of: [{ type: 'landingBlogItem' }],
    },
  ],
});

const officesMap = getBlock('officesMap', {
  fields: [],
});

const countersItem = getBlock('countersItem', {
  fields: [
    { name: 'title', title: 'Title', type: 'string' },
    { name: 'value', title: 'Value', type: 'string' },
    { name: 'description', title: 'Description', type: 'string' },
  ],
});

const counters = getBlock('counters', {
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'elements',
      title: 'Elements',
      type: 'array',
      of: [{ type: 'countersItem' }],
    },
    {
      name: 'articleTitle',
      title: 'Article Title',
      type: 'string',
    },
    {
      name: 'articleText',
      title: 'Article Text',
      type: 'string',
    },
    sectionConfigField,
  ],
});

const singleReview = getBlock('singleReview', {
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'image',
      title: 'Photo',
      type: 'image',
    },
    {
      name: 'name',
      title: 'Author Name',
      type: 'string',
    },
    {
      name: 'role',
      title: 'Author Role',
      type: 'string',
    },
    {
      name: 'text',
      title: ' Author Text',
      type: 'string',
    },
  ],
});

const contentColumns = getBlock('contentColumns', {
  fields: [
    {
      name: 'topTitle',
      title: 'topTitle',
      type: 'string',
    },
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    textSizeControl,
    {
      name: 'paragraphs',
      title: 'Paragraphs',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      description: "If 'video' is set, image will be used as a poster",
    },
    {
      name: 'video',
      title: 'Video',
      type: 'file',
      options: {
        accept: 'video/mp4',
      },
    },
    {
      name: 'link',
      title: 'Link',
      type: 'url',
    },
    {
      name: 'linkTitle',
      title: 'Link Title',
      type: 'string',
    },
    sectionConfigField,
  ],
});

const technologiesItem = getBlock('technologiesItem', {
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
    },
  ],
});

const technologies = getBlock('technologies', {
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'elements',
      title: 'Technologies',
      type: 'array',
      of: [{ type: 'technologiesItem' }],
    },
    sectionConfigField,
  ],
});

const techStackItem = getBlock('techStackItem', {
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'string',
      validation: (rule) => rule.required(),
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      validation: (rule) => rule.required(),
    },
    {
      name: 'link',
      title: 'Link',
      type: 'url',
    },
  ],
});

const techStack = getBlock('techStack', {
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    },
    {
      name: 'items',
      title: 'Technologies',
      type: 'array',
      of: [{ type: 'techStackItem' }],
      validation: (rule) => rule.required(),
    },
    sectionConfigField,
  ],
});

const heroContentSmall = getBlock('heroContentSmall', {
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'string',
    },
  ],
});

const fullWidthImage = getBlock('fullWidthImage', {
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'colored',
      title: 'Colored Title',
      type: 'boolean',
    },
    {
      name: 'titleShadow',
      title: 'Title Shadow',
      type: 'boolean',
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
    },
    {
      name: 'imageDescription',
      title: 'Image Description',
      type: 'string',
    },
    sectionConfigField,
  ],
});

const fullWidthVideo = getBlock('fullWidthVideo', {
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
      name: 'video',
      title: 'Video',
      type: 'file',
      options: {
        accept: 'video/mp4',
      },
    },
    {
      name: 'placeholder',
      title: 'Placeholder',
      type: 'image',
    },
    sectionConfigField,
  ],
});

const chartCms = getBlock('chartCms', {
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
  ],
});

const chartECommerce = getBlock('chartECommerce', {
  fields: [],
});

const teamV2Member = getBlock('teamV2Member', {
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
    },
    {
      name: 'avatar',
      title: 'Avatar',
      type: 'image',
    },
    {
      name: 'keyWords',
      title: 'Key Words',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'link',
      title: 'Link',
      type: 'url',
    },
  ],
});

const teamV2 = getBlock('teamV2', {
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'members',
      title: 'Members',
      type: 'array',
      of: [{ type: 'teamV2Member' }],
    },
    sectionConfigField,
  ],
});

const introList = getBlock('introList', {
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
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
    sectionConfigField,
  ],
});

const faqItem = getBlock('faqItem', {
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
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
    sectionConfigField,
  ],
});

const faq = getBlock('faq', {
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'isFaqSchemaDisabled',
      title: 'Disable FAQ Schema',
      type: 'boolean',
    },
    {
      name: 'items',
      title: 'faq',
      type: 'array',
      of: [{ type: 'faqItem' }],
    },
    sectionConfigField,
  ],
});

const pricesItem = getBlock('pricesItem', {
  fields: [
    {
      name: 'title',
      title: 'title',
      type: 'string',
    },
    {
      name: 'discount',
      title: 'discount',
      type: 'string',
    },
    {
      name: 'price',
      title: 'price',
      type: 'string',
    },
    {
      name: 'description',
      title: 'description',
      type: 'string',
    },
    {
      name: 'btnText',
      title: 'button text',
      type: 'string',
    },
    {
      name: 'subtitle',
      title: 'subtitle',
      type: 'string',
    },
    {
      name: 'richText',
      title: 'text',
      type: 'array',
      of: [
        {
          type: 'block',
        },
      ],
    },
  ],
});

const prices = getBlock('prices', {
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },

    {
      name: 'items',
      type: 'array',
      of: [{ type: 'pricesItem' }],
    },
    sectionConfigField,
  ],
});

const gridColumn = getBlock('gridColumn', {
  fields: [
    {
      name: 'link',
      title: 'Link',
      type: 'string',
    },
    {
      name: 'image',
      title: 'Background Image',
      type: 'image',
    },
    {
      name: 'title',
      title: 'Title ',
      type: 'string',
      hidden: ({ parent }) => parent?.image ? true : false,
    },
    {
      name: 'description',
      title: 'Description',
      type: 'string',
      hidden: ({ parent }) => parent?.image ? true : false,
    },
    {
      name: 'backgroundColor',
      title: 'Background Color',
      type: 'string',
    },
    {
      name: 'hoverColor',
      title: 'Hover Color',
      type: 'string',
    },
    {
      name: 'imagePosition',
      title: 'Image Position',
      type: 'string',
      options: {
        list: ['cover', 'contain']
      },
      initialValue: 'cover',
      hidden: ({ parent }) => parent?.image ? false : true,
    },

  ],
});

const gridColumns = getBlock('gridColumns', {
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
      of: [{ type: 'gridColumn' }],
    },
    sectionConfigField,
  ],
});

const landingPage = defineType({
  name: 'landingPage',
  type: 'document',
  icon: RocketIcon,
  fieldsets: [
    {
      name: 'seo',
      title: 'Page SEO Settings',
      options: {
        collapsible: true,
        collapsed: true,
      },
    },
  ],
  fields: [
    {
      fieldset: 'seo',
      name: 'seo',
      title: 'SEO & Metatags',
      type: 'seo',
    },
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'path',
      title: 'Page Path',
      type: 'slug',
      validation: (Rule) => Rule.required().custom(slugValidation),
      options: {
        source: 'title',
      },
    },
    {
      name: 'blocks',
      title: 'Page Blocks',
      type: 'array',
      of: [
        { type: 'hero' },
        { type: 'heroDark' },
        { type: 'heroCaseStudy' },
        { type: 'heroWithVideo' },
        { type: 'ourMission' },
        { type: 'coreSdk' },
        { type: 'pyramid' },
        { type: 'ctaBlock' },
        { type: 'quoteBlock' },
        { type: 'formBlock' },
        { type: 'scenarios' },
        { type: 'painsGains' },
        { type: 'aboutText' },
        { type: 'teasers' },
        { type: 'reviews' },
        { type: 'clientsAccordion' },
        { type: 'landingBlog' },
        { type: 'officesMap' },
        { type: 'counters' },
        { type: 'singleReview' },
        { type: 'contentColumns' },
        { type: 'technologies' },
        { type: 'techStack' },
        { type: 'heroContentSmall' },
        { type: 'fullWidthImage' },
        { type: 'fullWidthVideo' },
        { type: 'chartCms' },
        { type: 'chartECommerce' },
        { type: 'teamV2' },
        { type: 'introList' },
        { type: 'faq' },
        { type: 'prices' },
        { type: 'gridColumns' },
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
  landingPage,
  sectionConfig,
  hero,
  heroDark,
  heroCaseStudy,
  heroPartner,
  aboutText,
  teasers,
  teasersItem,
  reviews,
  reviewsItem,
  clientsAccordion,
  clientsAccordionItem,
  landingBlog,
  landingBlogItem,
  officesMap,
  counters,
  countersItem,
  singleReview,
  contentColumns,
  technologies,
  technologiesItem,
  techStack,
  techStackItem,
  heroContentSmall,
  fullWidthImage,
  fullWidthVideo,
  chartCms,
  chartECommerce,
  teamV2,
  teamV2Member,
  introList,
  projectDetailsList,
  faq,
  faqItem,
  prices,
  pricesItem,
  gridColumns,
  gridColumn,
];

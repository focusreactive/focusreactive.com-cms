import { defineType, FieldDefinition } from 'sanity';
import { textSizeControl } from '../common';

const sectionConfig = {
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
  ],
};

const sectionConfigField = {
  name: 'sectionConfig',
  type: 'sectionConfig',
  group: 'sectionConfigGroup',
};

const getBlock = (name: string, { fields }: { fields: FieldDefinition[] }) =>
  defineType({
    name,
    type: 'object',
    groups: [
      {
        name: 'sectionConfigGroup',
        title: 'Section Config',
      },
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
    preview: {
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
  fields: [],
});

const chartECommerce = getBlock('chartECommerce', {
  fields: [],
});

const landingPage = defineType({
  name: 'landingPage',
  type: 'document',
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
      validation: (Rule) => Rule.required(),
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
];

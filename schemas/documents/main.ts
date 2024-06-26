import { defineType } from 'sanity';
import { HomeIcon } from '@sanity/icons';

const mainSectionConfig = {
  name: 'mainSectionConfig',
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

const sectionConfigField = {
  name: 'mainSectionConfig',
  type: 'mainSectionConfig',
  group: 'mainSectionConfigGroup',
};

const product = {
  name: 'product',
  type: 'object',
  fields: [
    {
      name: 'titleTextLines',
      title: 'Title Text Lines',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'link',
      title: 'Link',
      type: 'url',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'string',
    },
  ],
};

const products = {
  name: 'products',
  type: 'object',
  fields: [
    {
      name: 'titleTextLines',
      title: 'Title Text Lines',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'products',
      title: 'Products',
      type: 'array',
      of: [{ type: 'product' }],
    },
    {
      name: 'buttonText',
      title: 'Button Text',
      type: 'string',
    },
    {
      name: 'buttonUrl',
      title: 'Button Url',
      type: 'url',
      validation: (Rule) => Rule.required(),
    },
  ],
};

const ourClients = {
  name: 'ourClients',
  type: 'object',
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
      of: [{ type: 'ourClientsItem' }],
    },
  ],
};

const ourClientsItem = {
  name: 'ourClientsItem',
  type: 'object',
  fields: [
    {
      name: 'image',
      title: 'Image',
      type: 'image',
    },
    {
      name: 'alt',
      title: 'Image Alternative Text',
      type: 'string',
    },
    {
      name: 'link',
      title: 'Link',
      type: 'string',
    },
    {
      name: 'openInNewTab',
      title: 'Open link in new tab',
      type: 'boolean',
    },
  ],
};

const expertiseTechnologiesItems = {
  name: 'expertiseTechnologiesItems',
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

const expertiseTechnologies = {
  name: 'expertiseTechnologies',
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
      of: [{ type: 'expertiseTechnologiesItems' }],
    },
  ],
};

const expertiseNavItem = {
  name: 'expertiseNavItem',
  type: 'object',
  fields: [
    {
      name: 'linkText',
      title: 'Link Text',
      type: 'string',
    },
    {
      name: 'link',
      title: 'Link',
      type: 'string',
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
    },
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'titleLink',
      title: 'Title Link',
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
      name: 'technologies',
      title: 'Technologies',
      type: 'array',
      of: [{ type: 'expertiseTechnologies' }],
    },
  ],
};

const expertiseItem = {
  name: 'expertiseItem',
  type: 'object',
  fields: [
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
      name: 'items',
      title: 'Items',
      type: 'array',
      of: [{ type: 'expertiseNavItem' }],
    },
  ],
};

const expertise = {
  name: 'expertise',
  type: 'object',
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
      of: [{ type: 'expertiseItem' }],
    },
  ],
};

const event = {
  name: 'event',
  type: 'object',
  fields: [
    {
      name: 'titleLines',
      title: 'Title Lines',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'type',
      title: 'Event Type',
      type: 'string',
    },
    {
      name: 'hostInfo',
      title: 'Host Info',
      type: 'string',
    },
    {
      name: 'remoteInfo',
      title: 'Remote Info Text',
      type: 'string',
    },
    {
      name: 'date',
      title: 'Event Dates',
      type: 'string',
    },
    {
      name: 'url',
      title: 'Url',
      type: 'url',
      validation: (Rule) => Rule.required(),
    },
  ],
};

const events = {
  name: 'events',
  type: 'object',
  fieldsets: [
    {
      name: 'topEvent',
      title: 'Top Event Data',
      options: {
        collapsible: true,
        collapsed: true,
      },
    },
  ],
  fields: [
    {
      name: 'titleLines',
      title: 'Title Lines',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'bgImage',
      title: 'Background Image',
      type: 'image',
    },
    {
      name: 'firstEventTitle',
      fieldset: 'topEvent',
      title: 'Title Text',
      type: 'string',
    },
    {
      name: 'firstEventTitleLines',
      fieldset: 'topEvent',
      title: 'Event Title Lines',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'firstEventTypeText',
      fieldset: 'topEvent',
      title: 'Event Type',
      type: 'string',
    },
    {
      name: 'firstEventRemoteInfo',
      fieldset: 'topEvent',
      title: 'Remote Info Text',
      type: 'string',
    },
    {
      name: 'firstEventDate',
      fieldset: 'topEvent',
      title: 'Event Dates',
      type: 'string',
    },
    {
      name: 'firstEventUrl',
      fieldset: 'topEvent',
      title: 'Event Url',
      type: 'url',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'events',
      title: 'Events',
      type: 'array',
      of: [{ type: 'event' }],
    },
  ],
};

const link = {
  name: 'link',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'url',
      title: 'Url',
      type: 'url',
      validation: (Rule) => Rule.required(),
    },
  ],
};

const teamMember = {
  name: 'teamMember',
  type: 'object',
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
      name: 'links',
      title: 'Links',
      type: 'array',
      of: [{ type: 'link' }],
    },
  ],
};

const membersRow = {
  name: 'membersRow',
  type: 'object',
  preview: {
    select: {
      members: 'members',
    },
    prepare({ members }) {
      if (!members || !members.length) {
        return { title: 'empty' };
      }

      return { title: `${members.map((m) => m.name).join(', ')}` };
    },
  },
  fields: [
    {
      name: 'members',
      type: 'array',
      of: [{ type: 'teamMember' }],
    },
  ],
};

const team = {
  name: 'team',
  type: 'object',
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
      of: [{ type: 'membersRow' }],
    },
    {
      name: 'allVacanciesLink',
      title: 'Link To All Vacancies',
      type: 'url',
      validation: (Rule) => Rule.required(),
    },
  ],
};

const emailForm = {
  name: 'emailForm',
  type: 'object',
  groups: [
    {
      name: 'mainSectionConfigGroup',
      title: 'Section Config',
    },
  ],
  fields: [
    {
      name: 'titleLines',
      title: 'Title Lines',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'subtitle',
      title: 'SubTitle',
      type: 'string',
    },

    sectionConfigField,
  ],
};

const techs = {
  name: 'techs',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'subTitle',
      title: 'Subtitle',
      type: 'string',
    },
    {
      name: 'spheres',
      title: 'Spheres',
      type: 'array',
      of: [{ type: 'sphere' }],
    },
  ],
};

const sphere = {
  name: 'sphere',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'list',
      title: 'Technologies',
      type: 'array',
      of: [{ type: 'tech' }],
    },
  ],
};

const tech = {
  name: 'tech',
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
      type: 'url',
    },
    {
      name: 'isPartner',
      title: 'Partner',
      type: 'boolean',
    },
    {
      name: 'src',
      title: 'Image',
      type: 'image',
    },
  ],
};

export const mainPage = defineType({
  name: 'mainPage',
  title: 'Main Page',
  type: 'document',
  options: {
    singleton: true,
  },
  preview: { prepare: () => ({ title: 'Home Page' }) },
  icon: HomeIcon,
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
      name: 'heroLines',
      title: 'Hero Text Lines',
      type: 'array',
      of: [{ type: 'string' }],
      validate: (Rule) => Rule.max(50).warning('No more than 5 words are allowed'),
    },
    {
      name: 'aboutTextLines',
      title: 'About Text Lines',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'products',
      title: 'Products Preview Section',
      type: 'products',
    },
    {
      name: 'ourClients',
      title: 'Our Clients Section',
      type: 'ourClients',
    },
    {
      name: 'expertise',
      title: 'Our expertise Section',
      type: 'expertise',
    },
    {
      name: 'techs',
      title: 'Technologies',
      type: 'techs',
    },
    {
      name: 'events',
      title: 'Events Section',
      type: 'events',
    },
    {
      name: 'team',
      title: 'Team Section',
      type: 'team',
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
  mainSectionConfig,
  mainPage,
  products,
  product,
  ourClients,
  ourClientsItem,
  expertise,
  expertiseItem,
  expertiseNavItem,
  expertiseTechnologies,
  expertiseTechnologiesItems,
  events,
  event,
  team,
  teamMember,
  link,
  membersRow,
  emailForm,
  techs,
  tech,
  sphere,
];

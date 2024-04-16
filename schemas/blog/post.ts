import { BillIcon } from '@sanity/icons';
import { slugValidation } from '../validation';

const post = {
  name: 'post',
  title: 'Blog Posts',
  type: 'document',
  icon: BillIcon,
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required().custom(slugValidation),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'contentMarkdown',
      title: 'Content',
      type: 'markdown',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'heroImageCredits',
      title: 'Hero Image Credits',
      type: 'string',
    },
    {
      name: 'date',
      title: 'Date',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'authors',
      title: 'Authors',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'author' }],
        },
      ],
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'tag' }],
        },
      ],
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'technologies',
      title: 'Technologies',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Title',
          type: 'string',
        },
        {
          name: 'technologies',
          title: 'Technologies',
          type: 'array',
          of: [
            {
              type: 'reference',
              to: [{ type: 'technology' }],
            },
          ],
        },
      ],
    },
    {
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [
        {
          type: 'image',
        },
      ],
    },
    {
      name: 'isReadyForPreview',
      title: 'Ready for Preview',
      type: 'boolean',
      description: 'Turn this on when the post has all required fields filled',
    },
  ],
  preview: {
    select: {
      title: 'title',
      author0: 'authors.0.name',
      author1: 'authors.1.name',
      author2: 'authors.2.name',
      author3: 'authors.3.name',
      media: 'heroImage',
    },
    prepare: ({ title, author0, author1, author2, author3, media }) => {
      const authors = [author0, author1, author2].filter(Boolean);
      const subtitle = authors.length > 0 ? `by ${authors.join(', ')}` : '';
      const hasMoreAuthors = Boolean(author3);
      return {
        title,
        subtitle: hasMoreAuthors ? `${subtitle}…` : subtitle,
        media,
      };
    },
  },
};

export default post;

import { RobotIcon } from '@sanity/icons';

const technology = {
  name: 'technology',
  title: 'Technology',
  type: 'document',
  icon: RobotIcon,
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'picture',
      title: 'Picture',
      type: 'image',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'link',
      title: 'Link',
      type: 'string',
    },
  ],
};

export default technology;

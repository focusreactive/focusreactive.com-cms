import { ListItemBuilder, StructureBuilder, StructureResolver, StructureResolverContext } from 'sanity/desk';
import { EarthGlobeIcon, CogIcon, BulbOutlineIcon } from '@sanity/icons';
import { apiVersion } from '../settings';

type TypeSchema = { name: string; title: string; type: string; fields: object[]; options?: { singleton?: boolean } };

type SectionBuilder = (
  S: StructureBuilder,
  context: StructureResolverContext,
  documentTypes: { [key: string]: TypeSchema },
  section: SectionSettings,
) => ListItemBuilder;

type BuildDocumentType = (
  S: StructureBuilder,
  context: StructureResolverContext,
  typeSchema: TypeSchema,
) => Promise<ListItemBuilder>;

type SectionSettings = {
  id: string;
  title: string;
  types: string[];
  icon: any;
};

type Sections = {
  marketing: SectionSettings;
  blog: SectionSettings;
  settings: SectionSettings;
};

const marketingTypes = ['mainPage', 'landingPage', 'aboutUsPage', 'ourWorkPage'];
const blogTypes = ['post', 'author', 'tag'];

const sections: Sections = {
  marketing: {
    id: 'marketing',
    title: 'Marketing',
    types: marketingTypes,
    icon: EarthGlobeIcon,
  },
  blog: {
    id: 'blog',
    title: 'Blog',
    types: blogTypes,
    icon: BulbOutlineIcon,
  },
  settings: {
    id: 'settings',
    title: 'Settings',
    types: [],
    icon: CogIcon,
  },
};

const buildBlogType: BuildDocumentType = async (S, context, typeSchema) => {
  return S.listItem()
    .id(typeSchema.name)
    .title('Articles')
    .schemaType(typeSchema.name)
    .child(
      S.documentList()
        .id(typeSchema.name)
        .title('Articles')
        .schemaType(typeSchema.name)
        .apiVersion(apiVersion)
        // .filter("_type == 'post'&& $user in authors[]._ref")
        .filter("_type == 'post'")
        .params({ user: context.currentUser?.id }),
    );
  // .child(S.list().id(typeSchema.name).title('Articles').items());
};

const buildDocumentType: BuildDocumentType = async (S, context, typeSchema) => {
  if (typeSchema.options?.singleton) {
    const client = context.getClient({ apiVersion });
    const documents = await client.fetch<{ _id: string }[], { type: string }>('* [_type == $type]{_id}', {
      type: typeSchema.name,
    });
    const publishedIds = documents.map((d) => d._id.replace(/^drafts\./, ''));
    const uniqueDocuments = new Set(publishedIds);
    if (uniqueDocuments.size > 1) {
      throw new Error(`Singleton document of type ${typeSchema.title} [${typeSchema.name}] has multiple instances!`);
    }
    // TODO: typescript don't allow me to do this :)
    // if (documents.length === 0) {
    //   return undefined;
    // }
    return S.documentListItem().id(documents[0]._id).title(typeSchema.title).schemaType(typeSchema.name);
  }
  if (typeSchema.name === 'post') {
    return buildBlogType(S, context, typeSchema);
  }
  return S.documentTypeListItem(typeSchema.name);
};

const mainSection: SectionBuilder = (S, context, documentTypes, section) => {
  const id = section.id;
  const title = section.title;

  return S.listItem()
    .id(id)
    .title(title)
    .icon(section.icon)
    .child(async () =>
      S.list()
        .id(id)
        .title(title)
        .items(await Promise.all(section.types.map((tpName) => buildDocumentType(S, context, documentTypes[tpName])))),
    );
};

export const structure: StructureResolver = (S, context) => {
  const documentTypes = context.schema._original?.types
    .filter((tp) => tp.type === 'document')
    .reduce((types, tpSchema) => ({ ...types, [tpSchema.name]: tpSchema }), {}) as { [key: string]: TypeSchema };

  const settingsTypes = context.schema._original?.types
    .filter((tp) => tp.type === 'document')
    .filter((tp) => !(marketingTypes.includes(tp.name) || blogTypes.includes(tp.name)))
    .map((tp) => tp.name);

  sections.settings.types = settingsTypes!;
  // console.log('🚀 ~ documentTypes:', documentTypes);

  return S.list()
    .id('fr')
    .title('Focus Reactive')
    .items([
      mainSection(S, context, documentTypes, sections.marketing),
      mainSection(S, context, documentTypes, sections.blog),
      mainSection(S, context, documentTypes, sections.settings),
    ]);
};

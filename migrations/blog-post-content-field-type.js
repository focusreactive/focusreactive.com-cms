import { getCliClient } from 'sanity/cli';

// npx sanity exec ./migrations/blog-post-content-field-type.js --with-user-token
// This script migrates the `content` field
// from an array of markdown to a single markdown field.

const client = getCliClient({
  dataset: 'production',
});

const fetchDocuments = () =>
  client.fetch(`*[_type == 'post' && defined(content)] { _id, _rev, title, content, contentMarkdown }`);

const buildPatches = (docs) =>
  docs.map((doc) => ({
    id: doc._id,
    patch: {
      set: { contentMarkdown: doc.content[0] },
      unset: ['content'],
      // this will cause the transaction to fail if the documents has been
      // modified since it was fetched.
      ifRevisionID: doc._rev,
    },
  }));

const createTransaction = (patches) =>
  patches.reduce((tx, patch) => tx.patch(patch.id, patch.patch), client.transaction());

const commitTransaction = (tx) => tx.commit();

const migrateNextBatch = async () => {
  const documents = await fetchDocuments();
  const patches = buildPatches(documents);
  if (patches.length === 0) {
    console.log('\nNo more documents to migrate!');
    return null;
  }

  console.log(
    `Migrate ${patches.length} documents:\n%s`,
    documents.map((doc) => `${doc.title} [${doc._id}]`).join('\n'),
  );

  const transaction = createTransaction(patches);
  await commitTransaction(transaction);
  return migrateNextBatch();
};

migrateNextBatch().catch((err) => {
  console.error(err);
  process.exit(1);
});

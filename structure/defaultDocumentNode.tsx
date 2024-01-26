import React, { useCallback, useEffect, useState } from 'react';
import debounce from 'lodash.debounce';
import { DefaultDocumentNodeResolver } from 'sanity/desk';
import { SanityDocument } from '@sanity/types';

const MAIN_PREVIEW_URL = 'https://fr-11ty-migration-front.vercel.app';
const BLOG_PREVIEW_URL = 'https://focusreactivecom-blog-preview.vercel.app';

const sendPostMessage = () => {
  const iframe = document.getElementById('preview_iframe') as HTMLIFrameElement | null;

  if (!iframe || !iframe.contentWindow) return null;

  iframe.contentWindow.postMessage(
    'reload()',
    iframe.src.includes(BLOG_PREVIEW_URL) ? BLOG_PREVIEW_URL : MAIN_PREVIEW_URL,
  );
};

const getPreviewUrl = (document: Partial<SanityDocument>) => {
  if (document._type === 'post') {
    return getBlogPagePreviewUrl(document);
  }

  return getMainPagePreviewUrl(document);
};

const getMainPagePreviewUrl = (document: Partial<SanityDocument>) => {
  const documentSlug = document?.path?.current;
  let previewSlug = '';

  switch (document._type) {
    case 'landingPage': {
      previewSlug = `landing-preview?slug=${documentSlug}`;
      break;
    }
    case 'aboutUsPage': {
      previewSlug = 'preview?slug=about-preview';
      break;
    }
    case 'mainPage': {
      previewSlug = 'preview?slug=main-preview';
      break;
    }
    case 'ourWorkPage': {
      previewSlug = 'preview?slug=our-work-preview';
      break;
    }
    default: {
      previewSlug = 'default-preview';
      break;
    }
  }

  return `${MAIN_PREVIEW_URL}/api/${previewSlug}`;
};

const getBlogPagePreviewUrl = (document: Partial<SanityDocument>) => {
  const slug = document?.slug?.current;
  return `${BLOG_PREVIEW_URL}/${slug}`;
};

const JsonPreview = ({
  document: sanityDocument,
}: {
  document: {
    draft: SanityDocument | null;
    displayed: Partial<SanityDocument>;
    historical: Partial<SanityDocument> | null;
    published: SanityDocument | null;
  };
}) => {
  const [previewUrl, setPreviewUrl] = useState('');

  const debouncedChangeHandler = useCallback(debounce(sendPostMessage, 1000), []);

  useEffect(() => {
    if (debouncedChangeHandler) {
      debouncedChangeHandler();
    }
  }, [sanityDocument?.displayed?._updatedAt, debouncedChangeHandler]);

  useEffect(() => {
    setPreviewUrl(getPreviewUrl(sanityDocument?.displayed));
  }, []);

  return (
    <iframe
      title="page"
      id="preview_iframe"
      src={previewUrl}
      style={{ height: '100%', width: '100%', border: 'none' }}
    />
  );
};

export const defaultDocumentNode: DefaultDocumentNodeResolver = (S, { schemaType }) => {
  const documentsWithPreview = ['landingPage', 'aboutUsPage', 'mainPage', 'ourWorkPage', 'post'];

  if (documentsWithPreview.includes(schemaType)) {
    return S.document().views([S.view.form(), S.view.component(JsonPreview).title('Preview')]);
  }
  return S.document();
};

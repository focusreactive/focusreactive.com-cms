import { SanityDocument } from '@sanity/types';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import debounce from 'lodash.debounce';
import { Box, Button, Card, Flex, Spinner, Text, ThemeProvider } from '@sanity/ui';
import { UserViewComponent } from 'sanity/desk';
import { EarthGlobeIcon, LaunchIcon, RefreshIcon } from '@sanity/icons';
import { useHasActiveDeployments } from '../integrations/hooks/vercel';
import styled from 'styled-components';
import { BLOG_PREVIEW_REBUILD_EVENT_NAME } from '../constants';

const PRODUCTION_URL = 'https://focusreactive.com';
const MAIN_PREVIEW_URL = 'https://fr-11ty-migration-front.vercel.app';
const BLOG_PREVIEW_URL = 'https://focusreactivecom-blog-preview.vercel.app';

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
    case 'portfolioPage': {
      previewSlug = 'preview?slug=portfolio-preview';
      break;
    }
    case 'cmsKitPage': {
      previewSlug = 'preview?slug=cms-kit-preview';
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

const getProductionUrl = (document: Partial<SanityDocument>) => {
  let slug = document?.slug?.current || document?.path?.current;

  switch (document._type) {
    case 'mainPage': {
      slug = '';
      break;
    }
    case 'aboutUsPage': {
      slug = 'about';
      break;
    }
    case 'ourWorkPage': {
      slug = 'our-work';
      break;
    }
    case 'portfolioPage': {
      slug = 'portfolio';
      break;
    }
    case 'cmsKitPage': {
      slug = 'cms-kit';
      break;
    }
  }

  return `${PRODUCTION_URL}/${slug}`;
};

const BuildingStatus = styled.div`
  font-size: 12px;
  padding: 4px 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
`;

export const PreviewIframe: UserViewComponent = ({ document }) => {
  const iframe = useRef<HTMLIFrameElement>(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const { hasActiveDeployments, checkActiveDeployments } = useHasActiveDeployments();

  const { displayed: currentDocument } = document;
  const isPost = currentDocument._type === 'post';

  function reloadIframe() {
    const iframeNode = iframe.current;

    if (!iframeNode || !iframeNode.contentWindow) return null;

    const iframeWindow = iframeNode.contentWindow;

    iframeWindow.postMessage('reload()', isPost ? BLOG_PREVIEW_URL : MAIN_PREVIEW_URL);
  }
  const debouncedChangeHandler = useCallback(debounce(reloadIframe, 500), []);

  useEffect(() => {
    if (debouncedChangeHandler) {
      debouncedChangeHandler();
    }
  }, [currentDocument._updatedAt, debouncedChangeHandler]);

  useEffect(() => {
    setPreviewUrl(getPreviewUrl(currentDocument));
    window.addEventListener(BLOG_PREVIEW_REBUILD_EVENT_NAME, checkActiveDeployments);

    return () => {
      window.removeEventListener(BLOG_PREVIEW_REBUILD_EVENT_NAME, checkActiveDeployments);
    };
  }, []);

  useEffect(() => {
    if (hasActiveDeployments) return;
    reloadIframe();
  }, [hasActiveDeployments]);

  if (!previewUrl)
    return (
      <ThemeProvider>
        <Flex padding={5} align="center" justify="center">
          <Spinner />
        </Flex>
      </ThemeProvider>
    );

  return (
    <ThemeProvider>
      <Flex direction="column" style={{ height: `100%` }}>
        <Card paddingX={4} paddingY={3} borderBottom>
          <Flex align="center" gap={2}>
            <Box flex={1}>
              <Text size={1} textOverflow="ellipsis">
                {previewUrl}
              </Text>
            </Box>

            <Flex align="center" gap={1}>
              {isPost && hasActiveDeployments && (
                <BuildingStatus>
                  <Spinner muted /> Building...
                </BuildingStatus>
              )}

              <Button fontSize={[1]} icon={RefreshIcon} padding={[2]} text="Reload" onClick={reloadIframe} />

              <Button
                fontSize={[1]}
                icon={LaunchIcon}
                padding={[2]}
                text="Open"
                tone="primary"
                onClick={() => window.open(previewUrl)}
              />

              <Button
                fontSize={[1]}
                icon={EarthGlobeIcon}
                padding={[2]}
                text="Open FR"
                tone="positive"
                onClick={() => window.open(getProductionUrl(currentDocument))}
              />
            </Flex>
          </Flex>
        </Card>

        <Card tone="transparent" padding={0} style={{ height: `100%` }}>
          <Flex align="center" justify="center" style={{ height: `100%` }}>
            <iframe
              ref={iframe}
              title="preview"
              style={{ width: '100%', height: `100%`, maxHeight: `100%`, border: 0, backgroundColor: '#fff' }}
              src={previewUrl}
              referrerPolicy="origin-when-cross-origin"
            />
          </Flex>
        </Card>
      </Flex>
    </ThemeProvider>
  );
};

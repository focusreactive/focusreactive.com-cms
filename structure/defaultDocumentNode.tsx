import { DefaultDocumentNodeResolver } from 'sanity/desk';
import { PreviewIframe } from '../components/PreviewIfame';

export const defaultDocumentNode: DefaultDocumentNodeResolver = (S, { schemaType }) => {
  const documentsWithPreview = ['landingPage', 'aboutUsPage', 'mainPage', 'ourWorkPage', 'portfolioPage', 'post'];

  if (documentsWithPreview.includes(schemaType)) {
    return S.document().views([S.view.form(), S.view.component(PreviewIframe).title('Preview')]);
  }
  return S.document();
};

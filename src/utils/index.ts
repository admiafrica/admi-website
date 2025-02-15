import { IContentfulAsset, IContentfulEntry } from '@/types';

export * from './constants';

export const getCourseFormUrl = () => {
  return `https://airtable.com/app0kRJindIHzHTM2/pagmXFb9WKJbimfFa/form`;
};

export const getAssetDetails = (assets: IContentfulAsset[], assetId: string) => {
  const entry = assets.find((item) => item.sys.id === assetId);
  return entry;
};

// to help in embedding youtube videos
export function processVideoUrl(videoUrl: string): string {
  const youtubeRegex = /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/;
  const match = videoUrl.match(youtubeRegex);
  if (match && match[1]) {
    const videoId = match[1];
    return `https://www.youtube.com/embed/${videoId}`;
  }
  return videoUrl; // Return the original URL if it's not a YouTube link with `/watch`
}

// Helper function to resolve references
export const resolveReferences = (
  fields: Record<string, IContentfulEntry>,
  entries: Array<IContentfulEntry>,
  assets: Array<IContentfulAsset>
) => {
  const resolveField: any = (field: any) => {
    if (Array.isArray(field)) {
      return field.map((item) => resolveField(item));
    }
    if (field?.sys?.type === 'Link') {
      const linkedId = field.sys.id;
      const linkedType = field.sys.linkType;

      if (linkedType === 'Asset') {
        return assets.find((asset) => asset.sys.id === linkedId) || field;
      }
      if (linkedType === 'Entry') {
        return entries.find((entry) => entry.sys.id === linkedId) || field;
      }
    }
    return field;
  };

  return Object.entries(fields).reduce<Record<string, IContentfulEntry>>((resolvedFields, [key, value]) => {
    resolvedFields[key] = resolveField(value);
    return resolvedFields;
  }, {});
};

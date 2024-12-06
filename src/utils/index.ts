import { IContentfulEntry } from "@/types";

export * from "./constants";

export const getCourseFormUrl = () => {
  return `https://airtable.com/app0kRJindIHzHTM2/pagmXFb9WKJbimfFa/form`;
};

export const getAssetDetails = (
  assets: IContentfulEntry[],
  assetId: string
) => {
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
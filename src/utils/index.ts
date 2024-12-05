import { IContentfulEntry } from "@/types";

export * from "./constants";

export const getCourseFormUrl = (courseName: string) => {
  const encodedCourseName = encodeURIComponent(courseName);
  return `https://airtable.com/embed/app0kRJindIHzHTM2/pagmXFb9WKJbimfFa/form?prefill_Course=${encodedCourseName}&hide_Course=true`;
};

export const getAssetDetails = (
  assets: IContentfulEntry[],
  assetId: string
) => {
  const entry = assets.find((item) => item.sys.id === assetId);
  return entry;
};

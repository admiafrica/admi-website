export * from "./constants";

export const getCourseFormUrl = (courseName: string) => {
  return `https://airtable.com/embed/app0kRJindIHzHTM2/pagmXFb9WKJbimfFa/form?prefill_Course=${courseName}&hide_Course=true`;
};

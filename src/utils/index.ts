export * from "./constants";

export const getCourseFormUrl = (courseName: string) => {
  const encodedCourseName = encodeURIComponent(courseName);
  return `https://airtable.com/app0kRJindIHzHTM2/pagmXFb9WKJbimfFa/form?prefill_Course=${encodedCourseName}&hide_Course=true`;
};

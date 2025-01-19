import { useCallback, useEffect } from 'react';

import { MainLayout } from '@/layouts/v3/MainLayout';

export default function CoursesPage() {
  const fetchCourses = useCallback(async () => {
    try {
      const response = await fetch(`/api/v3/courses`);
      const data = await response.json();
      console.log('COURSES', data);
    } catch (error) {
      console.log('Error fetching courses:', error);
    }
  }, []);

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  return (
    <MainLayout footerBgColor="white">
      <div></div>
    </MainLayout>
  );
}

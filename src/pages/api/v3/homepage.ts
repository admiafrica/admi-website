import { IContentfulResponse } from '@/types';
import { resolveReferences } from '@/utils';
import axiosContentfulClient from '@/utils/axiosContentfulClient';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const spaceId = process.env.ADMI_CONTENTFUL_SPACE_ID;
  const accessToken = process.env.ADMI_CONTENTFUL_ACCESS_TOKEN;
  const environment = process.env.ADMI_CONTENTFUL_ENVIRONMENT;

  if (req.method === 'GET') {
    try {
      const response = await axiosContentfulClient.get<IContentfulResponse>(
        `/spaces/${spaceId}/environments/${environment}/entries?access_token=${accessToken}&content_type=homepage&include=10`
      );
      const data = response.data;

      const courseItems = data.items;
      const assets = data.includes?.Asset || [];
      const entries = data.includes?.Entry || [];

      // Resolve references in the main item
      const resolvedCourses = courseItems.map((course: any) => {
        return {
          ...course,
          fields: resolveReferences(course.fields, entries, assets),
          assets,
        };
      });

      res.status(200).json(resolvedCourses);
    } catch (error) {
      console.error('Failed to get courses', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}

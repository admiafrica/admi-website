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
      const { courseId, slug } = req.query;

      let query = '';
      if (courseId) {
        // Fetch FAQs by course ID reference
        query = `content_type=courseFaq&fields.course.sys.id=${courseId}&order=fields.displayOrder`;
      } else if (slug) {
        // First get the course by slug, then get its FAQs
        const courseResponse = await axiosContentfulClient.get<IContentfulResponse>(
          `/spaces/${spaceId}/environments/${environment}/entries?access_token=${accessToken}&content_type=course&fields.slug=${slug}&select=sys.id`
        );
        
        if (!courseResponse.data.items.length) {
          return res.status(404).json({ message: `No course found for slug: ${slug}` });
        }
        
        const courseId = courseResponse.data.items[0].sys.id;
        query = `content_type=courseFaq&fields.course.sys.id=${courseId}&order=fields.displayOrder`;
      } else {
        // Fetch all FAQs if no specific course is requested
        query = `content_type=courseFaq&order=fields.displayOrder`;
      }

      const response = await axiosContentfulClient.get<IContentfulResponse>(
        `/spaces/${spaceId}/environments/${environment}/entries?access_token=${accessToken}&${query}&include=2`
      );
      
      const data = response.data;
      const faqItems = data.items;
      const assets = data.includes?.Asset || [];
      const entries = data.includes?.Entry || [];

      // Resolve references in FAQ items
      const resolvedFAQs = faqItems.map((faq: any) => {
        return {
          ...faq,
          fields: resolveReferences(faq.fields, entries, assets),
        };
      });

      res.status(200).json({
        items: resolvedFAQs,
        total: resolvedFAQs.length
      });
    } catch (error) {
      console.error('Failed to get course FAQs', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}

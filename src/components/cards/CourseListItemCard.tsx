import Image from 'next/image';
import { Box, Card } from '@mantine/core';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import { Title } from '@/components/ui';
import { getAssetDetails } from '@/utils';

type Props = {
  course: any;
};

export default function CourseListItemCard({ course }: Props) {
  return (
    <Card className="my-4 h-[16vh] w-full shadow-lg cursor-pointer" withBorder key={course.sys.id} p={0}>
      <div className="flex h-full w-full">
        {/* Image Container */}
        <div className="relative h-full w-[240px] flex-shrink-0">
          <Image
            fill
            src={`https:${getAssetDetails(course.assets, course.fields.coverImage.sys.id)?.fields.file.url}`}
            alt={course.fields.name}
            style={{ objectFit: 'cover' }}
          />
        </div>

        {/* Content Section */}
        <Box className="flex flex-grow flex-col px-4 pt-6">
          <Title label={course.fields.name} size="20px" color="black" />
          <div
            className="line-clamp-[3] font-proxima text-gray-500"
            dangerouslySetInnerHTML={{
              __html: documentToHtmlString(course.fields.description),
            }}
          ></div>
        </Box>
      </div>
    </Card>
  );
}

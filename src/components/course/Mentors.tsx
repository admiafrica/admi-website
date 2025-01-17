import { Group, Text } from '@mantine/core';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import { CollapsibleContent } from '../shared/v3';
import { getAssetDetails } from '@/utils';
import Image from 'next/image';

type Props = {
  mentors: any[];
  assets: any[];
};

export default function CourseMentors(props: Props) {
  const showMentors = props.mentors.length > 1;

  if (!showMentors) return;

  return (
    <Group bg={'#F76335'} py={32}>
      <div className="mx-auto w-full max-w-screen-2xl px-4">
        <div className="mt-4 font-nexa text-white">
          <Text size="2em" fw={900}>
            Course Leader & Mentor
          </Text>

          {props.mentors.map((mentor) => (
            <CollapsibleContent
              isProfile
              key={mentor.fields.name}
              icon={
                <Image
                  height={98}
                  width={98}
                  src={`https:${getAssetDetails(props.assets, mentor.fields.image.sys.id)?.fields.file.url}`}
                  alt={mentor.fields.name}
                />
              }
              title={mentor.fields.name}
              subTitle={mentor.fields.professionalTitle}
              profileLink={mentor.fields.socialMediaLink}
              content={
                <div
                  className="z-20 font-proxima text-lg px-4"
                  dangerouslySetInnerHTML={{
                    __html: documentToHtmlString(mentor.fields.bio),
                  }}
                ></div>
              }
            />
          ))}
        </div>
      </div>
    </Group>
  );
}

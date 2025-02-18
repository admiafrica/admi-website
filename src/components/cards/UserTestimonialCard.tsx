import React from 'react';
import Image from 'next/image';
import { Avatar, Box, Card, Rating, ScrollArea } from '@mantine/core';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';

import { getAssetDetails } from '@/utils';
import { IContentfulAsset, IContentfulEntry } from '@/types';

import ImageKenyanFlag from '@/assets/images/kenyan-flag.svg';
import { Paragraph, Title } from '../ui';

type Props = {
  user: IContentfulEntry;
  testimonial: IContentfulEntry;
  assets: Array<IContentfulAsset>;
};

export default function UserTestimonialCard(props: Props) {
  return (
    <Card className="mb-16 mr-4 h-fit w-full max-w-[360px]" withBorder>
      <Rating value={5} fractions={2} color="admiRed" readOnly className="pb-2 pl-2" />
      <Card.Section>
        <ScrollArea h={'12em'} offsetScrollbars>
          <div
            className="mt-1 h-full px-6 font-proxima text-[18px] text-gray-600"
            dangerouslySetInnerHTML={{
              __html: documentToHtmlString(
                props.testimonial.fields.description
                  ? props.testimonial.fields.description
                  : props.testimonial.fields.testimonial
              ),
            }}
          ></div>
        </ScrollArea>
      </Card.Section>
      <div className="mt-8 flex px-2">
        {props.testimonial.fields.authorImage ? (
          <Avatar
            src={`https:${getAssetDetails(props.assets, props.testimonial.fields.authorImage.sys.id)?.fields.file.url}`}
            variant="transparent"
            size={56}
          />
        ) : (
          <Avatar
            src={`https:${getAssetDetails(props.assets, props.testimonial.fields.image.sys.id)?.fields.file.url}`}
            variant="transparent"
            size={56}
          />
        )}

        <div className="flex w-full px-4">
          <div className="flex grow flex-col">
            {props.testimonial.fields.authorName ? (
              <Box className="my-auto w-full">
                <Title label={props.testimonial.fields.authorName} size="18px" color="black" />
                <Paragraph size="16px">{props.testimonial.fields.authorRole}</Paragraph>
              </Box>
            ) : (
              <Box className="my-auto w-full">
                <Title label={props.testimonial.fields.fullName} size="18px" color="black" />
                <Paragraph size="16px" className="pt-2 text-gray-500">
                  {props.testimonial.fields.role}
                </Paragraph>
              </Box>
            )}
            {/* {props.testimonial.fields.authorName ? (
              <Paragraph size="16px">{props.testimonial.fields.authorRole}</Paragraph>
            ) : (
              <Paragraph size="16px" className="pt-2 text-gray-500">
                {props.testimonial.fields.role}
              </Paragraph>
            )} */}
          </div>

          <div className='flex justify-center items-center'>
            <Image src={ImageKenyanFlag} alt="Flag of Kenya" width={24} height={24}/>
          </div>
        </div>
      </div>
    </Card>
  );
}

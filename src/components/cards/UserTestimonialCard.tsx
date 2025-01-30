import React from 'react';
import { Avatar, Card, Rating, ScrollArea, Text } from '@mantine/core';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';

import { getAssetDetails } from '@/utils';
import { IContentfulAsset, IContentfulEntry } from '@/types';

type Props = {
  user: IContentfulEntry;
  testimonial: IContentfulEntry;
  assets: Array<IContentfulAsset>;
};

export default function UserTestimonialCard(props: Props) {
  return (
    <Card className="mb-16 mr-4 h-fit w-full max-w-[360px]">
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
          />
        ) : (
          <Avatar
            src={`https:${getAssetDetails(props.assets, props.testimonial.fields.image.sys.id)?.fields.file.url}`}
            variant="transparent"
          />
        )}

        <div className="flex flex-col px-4">
          <div className="font-nexa">
            {props.testimonial.fields.authorName ? (
              <Text fw={900}>{props.testimonial.fields.authorName}</Text>
            ) : (
              <Text fw={900}>{props.testimonial.fields.fullName}</Text>
            )}
          </div>
          <div className="font-proxima">
            {props.testimonial.fields.authorName ? (
              <Text fw={500}>{props.testimonial.fields.authorRole}</Text>
            ) : (
              <Text fw={500}>{props.testimonial.fields.role}</Text>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}

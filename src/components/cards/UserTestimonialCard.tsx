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
      <Rating value={5} fractions={2} color="admiRed" readOnly className="pl-2" />
      <Card.Section>
        <ScrollArea h={'12em'} offsetScrollbars>
          <div
            className="mt-1 h-full px-6 font-proxima text-gray-600"
            dangerouslySetInnerHTML={{
              __html: documentToHtmlString(props.testimonial.fields.description),
            }}
          ></div>
        </ScrollArea>
      </Card.Section>
      <div className="mt-8 flex px-2">
        <Avatar
          src={`https:${getAssetDetails(props.assets, props.testimonial.fields.authorImage.sys.id)?.fields.file.url}`}
          variant="transparent"
        />
        <div className="flex flex-col px-4">
          <div className="font-nexa">
            <Text fw={900}>{props.testimonial.fields.authorName}</Text>
          </div>
          <div className="font-proxima">
            <Text fw={500}>{props.testimonial.fields.authorRole}</Text>
          </div>
        </div>
      </div>
    </Card>
  );
}

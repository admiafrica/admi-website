import Image from 'next/image';
import { Text } from '@mantine/core';
import { CollapsibleContent } from '../shared/v3';

import IconBgImageYellow from '@/assets/icons/ellipse-yellow.svg';
import IconBgImageRed from '@/assets/icons/ellipse-red.svg';

type Props = {
  faqs: any[];
};
export default function CourseFAQs({ faqs }: Props) {
  return (
    <div className="relative w-full bg-[#FFF7F5]">
      {/* BACKGROUND IMAGES */}
      <div className="absolute left-1/2 top-[24rem] z-10 h-fit w-full -translate-x-1/2 transform">
        <div className="flex w-full justify-end pr-[10%]">
          <Image src={IconBgImageYellow} alt={'background image'} />
        </div>
      </div>

      <div className="absolute left-1/2 top-[-12rem] z-10 h-fit w-full -translate-x-1/2 transform">
        <div className="flex w-full">
          <Image src={IconBgImageRed} alt={'background image'} />
        </div>
      </div>
      <div className="mx-auto min-h-[40em] w-full max-w-screen-xl px-4 z-20 relative">
        <div className="pt-16 font-nexa z-20">
          <Text size="2em" fw={900}>
            Frequently Asked Questions
          </Text>
        </div>
        {faqs &&
          faqs.map((faq, index) => (
            <CollapsibleContent
              key={`faq-${index}`}
              title={faq.fields.title}
              content={
                <div className="font-proxima z-20">
                  <Text size="1.1em" fw={500}>
                    {faq.fields.description}
                  </Text>
                </div>
              }
            />
          ))}
      </div>
    </div>
  );
}

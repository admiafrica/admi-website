import Image from 'next/image';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import { CollapsibleContent } from '../shared/v3';

import IconBgImageYellow from '@/assets/icons/ellipse-yellow.svg';
import IconBgImageRed from '@/assets/icons/ellipse-red.svg';
import { Title } from '../ui';
import { useIsMobile } from '@/hooks/useIsMobile';

type Props = {
  faqs: any[];
};
export default function CourseFAQs({ faqs }: Props) {
  const isMobile = useIsMobile();
  if (faqs.length < 1) return null;

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

      <div className="relative z-20 mx-auto min-h-[40em] w-full max-w-screen-xl px-4 pb-16 2xl:px-0">
        <div className="z-20 py-8">
          <Title size={isMobile ? '24px' : '32px'} label="Frequently Asked Questions" color="black" className="mt-4" />
        </div>
        {faqs &&
          faqs.map((faq, index) => (
            <CollapsibleContent
              key={`faq-${index}`}
              title={faq.fields.question}
              content={
                <div
                  className="z-20 font-proxima text-lg"
                  dangerouslySetInnerHTML={{
                    __html: documentToHtmlString(faq.fields.answer),
                  }}
                ></div>
              }
            />
          ))}
      </div>
    </div>
  );
}

// 3
import { Text } from '@mantine/core';
import { CollapsibleContent } from '../shared/v3';

type Props = {
  faqs: any[];
};
export default function CourseFAQs({ faqs }: Props) {
  return (
    <div className="mx-auto w-full max-w-screen-xl px-4">
      <div className="font-nexa">
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
              <div className="font-proxima">
                <Text size="1.1em" fw={500}>
                  {faq.fields.description}
                </Text>
              </div>
            }
          />
        ))}
    </div>
  );
}

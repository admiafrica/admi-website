import { Card, Group, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { Button, Paragraph, Title } from '../ui';
import { IconAsterisk } from '@tabler/icons-react';

import ImageJoinNetworkBackground from '@/assets/images/join-network-bg.jpeg';
import Image from 'next/image';

export default function JoinForm() {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      email: '',
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    },
  });

  const handleSubmit = () => {
    console.log('VALUES', form.values);
  };

  return (
    <Card className="relative h-full w-full bg-white p-4 sm:p-8" radius="lg">
      {/* Background Image */}
      <Image
        src={ImageJoinNetworkBackground}
        placeholder="empty"
        alt="Join Network"
        fill
        priority
        className="absolute inset-0 z-0"
        style={{ objectFit: 'cover', transform: 'scaleX(-1)', objectPosition: '75% 5%' }}
      />

      {/* Radial Gradient Overlay */}
      <div
        className="z-5 absolute inset-0"
        style={{
          background: `linear-gradient(170.72deg, rgba(1, 198, 165, 0) 22.23%, rgba(1, 198, 165, 0.8) 89.36%),linear-gradient(218.97deg, rgba(246, 8, 52, 0.8) 7.01%, rgba(246, 8, 52, 0) 49.52%)`,
        }}
      ></div>
      <div className="relative">
        <Title label="Join the ADMI" color="white" />
        <Title label="Alumni Network" color="#B9C601" />
        <Paragraph className="text-white">
          If you haven’t already, we invite you to register with us and become an active member of the ADMI alumni
          community.
        </Paragraph>
      </div>
      <div className="relative mb-8">
        <Paragraph className="text-white">Alumni Registration Form</Paragraph>
      </div>
      <Card withBorder bg={'black'} p={12} radius={'md'}>
        <Title label="Alumni Network" color="white" size="20px" />
        <Paragraph className="py-2 text-white">Subscribe to our alumni network and stay updated.</Paragraph>S
        <form onSubmit={form.onSubmit((values) => console.log(values))}>
          <TextInput
            my={16}
            className="border-1 rounded-lg border-solid border-gray-200 py-2"
            label={
              <div className="flex pl-2">
                <Title label="Email Address" color="white" size="1.4em" />
                <IconAsterisk size={8} className="mt-1.5 text-admiRed" />
              </div>
            }
            placeholder="your@email.com"
            key={form.key('email')}
            {...form.getInputProps('email')}
          />
          <Group justify="flex-end" mt="2em" className="w-full">
            <Button size="lg" backgroundColor="admiRed" label="Subscribe" onClick={() => handleSubmit()} />
          </Group>
        </form>
      </Card>
    </Card>
  );
}

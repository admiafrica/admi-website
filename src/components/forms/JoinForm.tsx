import { Card, Group, Text, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { Button, Paragraph, Title } from '../ui';
import { IconAsterisk } from '@tabler/icons-react';

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
    <div className="h-full w-full bg-white p-4 sm:p-8">
      <div className="font-nexa">
        <Title label="Join the ADMI" color="black" />
        <Title label="Alumni Network" color="black" />
        <Paragraph>
          If you haven’t already, we invite you to register with us and become an active member of the ADMI alumni
          community.
        </Paragraph>
      </div>
      <div className="mb-8 font-proxima">
        <Paragraph>Alumni Registration Form</Paragraph>
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
    </div>
  );
}

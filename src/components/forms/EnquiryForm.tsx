import { Group, Select, Text, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { Button, Title } from '../ui';

export default function EnquiryForm() {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      email: '',
      firstName: '',
      lastName: '',
      phoneNumber: '',
      course: '',
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    },
  });

  return (
    <div>
      <div className="font-nexa">
        <Title label="Enquiry Form" color="black" />
      </div>
      <div className="font-proxima mb-8">
        <Text fw={600}>Kindly provide the details below</Text>
      </div>
      <form onSubmit={form.onSubmit((values) => console.log(values))}>
        <Select
          withAsterisk
          label={<Title label="Select Course" color="black" size="1.4em" />}
          placeholder="Select a course you're interested in"
          searchable
          nothingFoundMessage="No options"
          data={[
            { value: 'react', label: 'React' },
            { value: 'angular', label: 'Angular' },
            { value: 'vue', label: 'Vue' },
          ]}
          {...form.getInputProps('course')}
        />
        <div className="font-proxima my-4">
          <Text size="1.1em">
            Curious about our courses and the benefits they offer? Explore the details and discover what you could gain
            by visiting our <span className="font-bold text-admiShamrok brightness-90">Courses page</span>
          </Text>
        </div>
        <TextInput
          withAsterisk
          label={<Title label="Email" color="black" size="1.4em" />}
          placeholder="your@email.com"
          key={form.key('email')}
          {...form.getInputProps('email')}
        />
        <TextInput
          withAsterisk
          label={<Title label="First Name" color="black" size="1.4em" />}
          placeholder="Enter first name"
          key={form.key('firstName')}
          {...form.getInputProps('firstName')}
        />
        <TextInput
          withAsterisk
          label={<Title label="Last Name" color="black" size="1.4em" />}
          placeholder="Enter last name"
          key={form.key('lastName')}
          {...form.getInputProps('lastName')}
        />
        <TextInput
          withAsterisk
          label={<Title label="Phone Number" color="black" size="1.4em" />}
          placeholder="Enter phone number"
          key={form.key('phoneNumber')}
          {...form.getInputProps('phoneNumber')}
        />

        <Group justify="flex-end" mt="4em" className="w-full">
          <Button size="lg" backgroundColor="admiRed" label="Submit" />
        </Group>
      </form>
    </div>
  );
}

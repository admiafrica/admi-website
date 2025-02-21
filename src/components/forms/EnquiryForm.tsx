import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { Alert, Box, Group, Select, Text, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { Button, Paragraph, Title } from '../ui';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

import { IconAsterisk } from '@tabler/icons-react';

export default function EnquiryForm() {
  const router = useRouter();
  const [courses, setCourses] = useState<any[]>([]);
  const [countryCode, setCountryCode] = useState('254'); // State for the phone number
  const [alert, setAlert] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      email: '',
      firstName: '',
      lastName: '',
      phone: '',
      courseName: '',
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    },
  });

  const fetchCourses = useCallback(async () => {
    try {
      const response = await fetch(`/api/v3/courses`);
      const data = await response.json();
      setCourses(data);
    } catch (error) {
      console.log('Error fetching courses:', error);
    }
  }, []);

  const handleSubmit = async (values: any) => {
    setAlert(null); // Clear previous alerts

    // always remove leading zero from phone incase included
    const formattedPhone = values.phone.replace(/^0+/, '');
    const data = {
      ...values,
      phone: `${countryCode}${formattedPhone}`,
    };

    try {
      const response = await fetch('/api/v3/push-lead', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...data }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setAlert({ type: 'error', message: errorData.error || 'Failed to submit enquiry.' });
        return;
      }
      router.push('/v3/enquiry-thank-you');
    } catch (error) {
      setAlert({ type: 'error', message: 'An error occurred. Please try again later.' });
    }
  };

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  return (
    <div className="w-full rounded-lg bg-white p-4 sm:p-8">
      <div className="font-nexa">
        <Title label="Enquiry Form" color="black" />
      </div>
      <div className="mb-8 font-proxima">
        <Text fw={600}>Kindly provide the details below</Text>
      </div>
      <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
        <Select
          label={
            <div className="flex pl-2">
              <Title label="Select Course" color="black" size="1.4em" />
              <IconAsterisk size={8} className="mt-1.5 text-admiRed" />
            </div>
          }
          className="border-1 rounded-lg border-solid border-gray-200 py-2"
          placeholder="Select a course you're interested in"
          searchable
          nothingFoundMessage="No options"
          data={courses.map((course) => course.fields.name)}
          {...form.getInputProps('courseName')}
        />
        <div className="my-4 font-proxima">
          <Text size="1.1em">
            Curious about our courses and the benefits they offer? Explore the details and discover what you could gain
            by visiting our{' '}
            <span>
              <Link href="/v3/courses">
                <span className="font-bold text-admiShamrok brightness-90">Courses page</span>
              </Link>
            </span>
          </Text>
        </div>
        <TextInput
          my={16}
          className="border-1 rounded-lg border-solid border-gray-200 py-2"
          label={
            <div className="flex pl-2">
              <Title label="Email Address" color="black" size="1.4em" />
              <IconAsterisk size={8} className="mt-1.5 text-admiRed" />
            </div>
          }
          placeholder="your@email.com"
          key={form.key('email')}
          {...form.getInputProps('email')}
        />
        <TextInput
          my={16}
          className="border-1 rounded-lg border-solid border-gray-200 py-2"
          label={
            <div className="flex pl-2">
              <Title label="First Name" color="black" size="1.4em" />
              <IconAsterisk size={8} className="mt-1.5 text-admiRed" />
            </div>
          }
          placeholder="Enter first name"
          key={form.key('firstName')}
          {...form.getInputProps('firstName')}
        />
        <TextInput
          my={16}
          className="border-1 rounded-lg border-solid border-gray-200 py-2"
          label={
            <div className="flex pl-2">
              <Title label="Last Name" color="black" size="1.4em" />
              <IconAsterisk size={8} className="mt-1.5 text-admiRed" />
            </div>
          }
          placeholder="Enter last name"
          key={form.key('lastName')}
          {...form.getInputProps('lastName')}
        />
        <Box my={16} className="border-1 rounded-lg border-solid border-gray-200 py-2">
          <div className="flex pl-2">
            <Title label="Phone Number" color="black" size="1.4em" />
            <IconAsterisk size={8} className="mt-1.5 text-admiRed" />
          </div>
          <Box className="flex">
            <PhoneInput
              country={'ke'}
              value={countryCode}
              onChange={(value) => {
                setCountryCode(value);
              }}
              containerStyle={{
                border: 'none',
                width: 100,
              }}
              inputStyle={{
                border: 'none',
              }}
              buttonStyle={{
                border: 'none', // Remove dropdown button border
                marginLeft: '8px',
              }}
              dropdownStyle={{
                border: 'none', // Remove dropdown border
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', // Optional: Add a subtle shadow
              }}
            />
            <TextInput
              className="grow"
              placeholder="Enter phone i.e 0700000000"
              key={form.key('phone')}
              {...form.getInputProps('phone')}
            />
          </Box>
        </Box>
        <Group justify="flex-end" mt="2em" className="w-full">
          <Button size="lg" backgroundColor="admiRed" label="Submit" type="submit" />
        </Group>
      </form>
      {alert && (
        <Alert
          color={alert.type === 'success' ? '#339900' : '#ff9966'}
          title={<Paragraph fontWeight={900}>{alert.type === 'success' ? 'Success' : 'Error'}</Paragraph>}
          my={8}
        >
          <Paragraph>{alert.message}</Paragraph>
        </Alert>
      )}
    </div>
  );
}

const numberInputStyle: React.CSSProperties = {
  border: 'none',
};

const numberDropdownStyle: React.CSSProperties = {
  border: 'none',
};

import { Box, Card, Group, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { Button, Paragraph, Title } from '../ui';
import { IconAsterisk } from '@tabler/icons-react';

export default function PortalForm() {
  const handlePortalLogin = () => {
    console.log('login selected');
  };

  return (
    <div className="h-full w-full rounded-lg bg-white p-4 sm:p-8">
      <Title label="How to Access" color="black" size="24px" />
      <Box className="flex pb-4">
        <Title label="the" color="black" size="24px" className="pr-1" />
        <Title label="Student Portal" color="#B9C601" size="24px" />
      </Box>
      <Paragraph className="pb-6">
        To access the Student Portal, simply log in using your student credentials.
      </Paragraph>
      <Paragraph className="pb-6">
        If you are a new student, you will receive your login details during orientation. If you encounter any issues
        accessing the portal, please contact our IT support team for assistance.
      </Paragraph>
      <Group justify="flex-end" mt="2em" className="w-full">
        <Button size="lg" backgroundColor="admiRed" label="Student Portal Login" onClick={() => handlePortalLogin()} />
      </Group>
    </div>
  );
}

import { Outlet } from 'react-router-dom';

import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';

import '@mantine/core/styles.css';

const RootPage = () => {
  return (
    <MantineProvider>
      <Notifications />
      <Outlet />
    </MantineProvider>
  );
};

export default RootPage;

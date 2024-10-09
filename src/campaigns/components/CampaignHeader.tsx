import { Group, Text } from '@mantine/core';

export default function CampaignHeader() {
  return (
    <Group style={headerContentStyle}>
      {/* TODO: replace with logo asset */}
      <Text size="xl" fw={700} c="black">
        ADMI
      </Text>
    </Group>
  );
}

const headerContentStyle: React.CSSProperties = {
  flex: 1,
  padding: '0 20px',
  justifyContent: 'center',
  display: 'flex',
};

import { Text } from '@mantine/core';
import { CampaignLayout } from '../layouts/CampaignLayout';
import { useParams } from 'react-router-dom';

export function CampaignsPage() {
  const params = useParams();
  return (
    <CampaignLayout>
      <Text size="lg" my="md" maw={600} mx="auto">
        <strong>Country:</strong> {params.country}
      </Text>
      <Text size="lg" my="md" maw={600} mx="auto">
        <strong>Category:</strong> {params.category}
      </Text>
      <Text size="lg" my="md" maw={600} mx="auto">
        <strong>Campaign name:</strong> {params.campaign}
      </Text>
    </CampaignLayout>
  );
}

import { Text } from "@mantine/core";
import { CampaignLayout } from "../layouts/CampaignLayout";
import { useRouter } from "next/router";

export function CampaignsPage() {
  const { query } = useRouter();

  console.log("params", query);
  return (
    <CampaignLayout>
      <Text size="lg" my="md" maw={600} mx="auto">
        <strong>Country:</strong> {query.country}
      </Text>
      <Text size="lg" my="md" maw={600} mx="auto">
        <strong>Category:</strong> {query.category}
      </Text>
      <Text size="lg" my="md" maw={600} mx="auto">
        <strong>Campaign name:</strong> {query.campaign}
      </Text>
    </CampaignLayout>
  );
}

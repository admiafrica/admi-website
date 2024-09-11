import type { MetaFunction } from '@remix-run/node';
import { CampaignsPage } from '../campaigns';

export const meta: MetaFunction = () => {
  return [
    { title: 'Africa Digital Media Institute: Campaign' },
    { name: 'description', content: 'Campaign Route' },
  ];
};

export default function CampaignsRoute() {
  return <CampaignsPage />;
}

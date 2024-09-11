import type { MetaFunction } from '@remix-run/node';
import { HomePage } from '../pages/HomePage';

export const meta: MetaFunction = () => {
  return [
    { title: 'Africa Digital Media Institute' },
    { name: 'description', content: 'Welcome to ADMI' },
  ];
};

export default function Index() {
  return <HomePage />;
}

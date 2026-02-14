import { AppShell } from '@/lib/tw-mantine'

type Props = {
  children: React.ReactNode
}
export default function CampaignHeaderLayout({ children }: Props) {
  return <AppShell.Header style={headerStyle}>{children}</AppShell.Header>
}

const headerStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '0 20px',
  backgroundColor: 'white',
  borderBottom: '1px solid #dee2e6'
}

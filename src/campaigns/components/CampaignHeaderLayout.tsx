type Props = {
  children: React.ReactNode
}
export default function CampaignHeaderLayout({ children }: Props) {
  return <header style={headerStyle}>{children}</header>
}

const headerStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '0 20px',
  backgroundColor: 'white',
  borderBottom: '1px solid #dee2e6'
}

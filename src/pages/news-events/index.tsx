export async function getServerSideProps() {
  return {
    redirect: {
      destination: '/news',
      permanent: true
    }
  }
}

export default function LegacyNewsEventsRedirect() {
  return null
}

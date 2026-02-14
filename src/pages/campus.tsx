export async function getServerSideProps() {
  return {
    redirect: {
      destination: '/student-experience/campus',
      permanent: true
    }
  }
}

export default function LegacyCampusRedirect() {
  return null
}

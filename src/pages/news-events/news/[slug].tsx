export async function getServerSideProps(context: any) {
  const slug = context?.params?.slug

  if (!slug) {
    return {
      redirect: {
        destination: '/news',
        permanent: true
      }
    }
  }

  return {
    redirect: {
      destination: `/news/${slug}`,
      permanent: true
    }
  }
}

export default function LegacyNewsArticleRedirect() {
  return null
}

import Head from 'next/head';

interface Props {
  title?: string;
  description?: string;
}

function PageSEO(props: Props) {
  return (
    <Head>
      <title>{`ADMI ${props.title ? `- ${props.title}` : ''}`}</title>
      <meta name="description" content={props.description ? props.description : ''} />
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
}

export default PageSEO;

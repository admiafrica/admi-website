import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function useFullUrl() {
  const router = useRouter();
  const [fullUrl, setFullUrl] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setFullUrl(window.location.href);
    }
  }, [router.asPath]);

  return fullUrl;
}

'use client'; // Error components must be Client Components

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Error(error: any) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);
  const router = useRouter();
  return (
    <div>
      <h2>Something went wrong!</h2>
      <button onClick={() => router.push('/')}>Try again</button>
    </div>
  );
}

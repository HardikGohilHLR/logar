// SSO Login
'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { useClerk } from '@clerk/nextjs';

export const SSOCallback = () => {
  const router = useRouter();
  const { handleRedirectCallback } = useClerk();

  useEffect(() => {
    handleRedirectCallback({
      signInFallbackRedirectUrl: '/',
    });
  }, [handleRedirectCallback, router]);

  return (
    <>
      <div className="text-center">
        <h2 className="mb-2 text-xl font-semibold">Completing authentication...</h2>
        <p className="text-muted-foreground">Please wait while we sign you in.</p>
      </div>
    </>
  );
};

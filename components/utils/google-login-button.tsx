// Google Login button
import React from 'react';
import { useSignIn } from '@clerk/nextjs';

import { Button } from '@/components/ui/button';

export const GoogleLoginButton = () => {
  const { signIn } = useSignIn();

  const handleSignIn = async () => {
    await signIn?.authenticateWithRedirect({
      strategy: 'oauth_google',
      redirectUrl: '/sso-login',
      redirectUrlComplete: '/',
    });
  };

  return (
    <>
      <Button type="button" variant="outline" className="w-full" onClick={handleSignIn}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M23.9888 12.2245C23.9888 11.2413 23.9071 10.5238 23.7304 9.77966H12.2393V14.2176H18.9843C18.8484 15.3205 18.114 16.9815 16.4821 18.0976L16.4592 18.2462L20.0925 20.9964L20.3442 21.0209C22.656 18.9347 23.9888 15.8653 23.9888 12.2245Z"
            fill="#4285F4"
          />
          <path
            d="M12.2393 23.9176C15.5438 23.9176 18.3179 22.8545 20.3442 21.0209L16.4821 18.0976C15.4486 18.8018 14.0615 19.2934 12.2393 19.2934C9.00273 19.2934 6.25576 17.2074 5.27654 14.324L5.13301 14.3359L1.35507 17.1927L1.30566 17.3269C3.31829 21.2334 7.45238 23.9176 12.2393 23.9176Z"
            fill="#34A853"
          />
          <path
            d="M5.27634 14.3239C5.01797 13.5798 4.86844 12.7825 4.86844 11.9587C4.86844 11.1349 5.01797 10.3376 5.26275 9.59354L5.25591 9.43507L1.43063 6.53235L1.30547 6.59052C0.475969 8.21162 0 10.032 0 11.9587C0 13.8854 0.475969 15.7058 1.30547 17.3269L5.27634 14.3239Z"
            fill="#FBBC05"
          />
          <path
            d="M12.2393 4.62403C14.5374 4.62403 16.0877 5.59402 16.9717 6.40461L20.4258 3.10928C18.3044 1.1826 15.5438 0 12.2393 0C7.45238 0 3.31829 2.68406 1.30566 6.59056L5.26295 9.59359C6.25576 6.7102 9.00273 4.62403 12.2393 4.62403Z"
            fill="#EB4335"
          />
        </svg>
        Login with Google
      </Button>
    </>
  );
};

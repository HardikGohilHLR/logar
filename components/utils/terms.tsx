// Terms
import Link from 'next/link';
import React from 'react';

export const TermsFooter = () => {
  return (
    <>
      <div className="text-center">
        <p className="text-muted-foreground text-sm [&_a]:underline [&_a]:underline-offset-4">
          By clicking continue, you agree to our
          <br />
          <Link href={process.env.NEXT_PUBLIC_GITHUB_REPO!} className="hover:text-primary" target="_blank">
            Terms of Service
          </Link>{' '}
          and{' '}
          <Link href={process.env.NEXT_PUBLIC_GITHUB_REPO!} className="hover:text-primary" target="_blank">
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </>
  );
};

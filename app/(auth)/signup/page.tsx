// Signup
import React from 'react';
import { Metadata } from 'next';

import { SignupForm } from '@/components/auth/signup';

export const metadata: Metadata = {
  title: 'Create an Account | Logar',
  description: 'Create an Account | Logar',
};

const page = () => {
  return (
    <>
      <SignupForm />
    </>
  );
};

export default page;

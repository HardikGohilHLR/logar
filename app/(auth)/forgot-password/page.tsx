// Login
import React from 'react';
import { Metadata } from 'next';

import { ForgotPasswordForm } from '@/components/auth/forgot-password';

export const metadata: Metadata = {
  title: 'Forgot Password | Logar',
  description: 'Forgot Password | Logar',
};

const page = () => {
  return (
    <>
      <ForgotPasswordForm />
    </>
  );
};

export default page;

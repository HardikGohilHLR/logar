// Reset Password
import React from 'react';
import { Metadata } from 'next';

import { ResetPasswordForm } from '@/components/auth/reset-password';

export const metadata: Metadata = {
  title: 'Reset Password | Logar',
  description: 'Reset Password | Logar',
};

const page = () => {
  return (
    <>
      <ResetPasswordForm />
    </>
  );
};

export default page;

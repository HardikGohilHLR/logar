// Login
import React from 'react';
import { Metadata } from 'next';

import { LoginForm } from '@/components/auth/login';

export const metadata: Metadata = {
  title: 'Login | Logar',
  description: 'Login | Logar',
};

const page = async () => {
  return (
    <>
      <LoginForm />
    </>
  );
};

export default page;

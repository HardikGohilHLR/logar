// Provider
'use client';
import React, { ReactNode } from 'react';
import { ClerkProvider } from '@clerk/nextjs';
import { QueryClientProvider } from '@tanstack/react-query';

import { queryClient } from '@/lib/api';

import { Toaster } from '@/components/ui';

type Props = {
  children: ReactNode;
};

export const Provider = ({ children }: Props) => {
  return (
    <>
      <ClerkProvider>
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
      </ClerkProvider>

      <Toaster />
    </>
  );
};

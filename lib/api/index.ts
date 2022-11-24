// API
import axios from 'axios';
import { QueryClient } from '@tanstack/react-query';

import { toast } from '@/hooks/use-toast';

export const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      retry: 2,
    },
  },
});

export const queryMessages = ({ scb, ecb }: any) => {
  return {
    onSuccess: async ({ data }: any) => {
      if (!data?.error) {
        toast({ title: 'Success', description: data?.message });
        scb?.(data);
      } else {
        console.log('Success:', data?.message);

        toast({
          title: 'Error',
          description: data?.message,
          variant: 'destructive',
        });
      }
    },
    onError: async (error: any) => {
      console.log('Error:', error);

      toast({
        title: 'Error',
        description: error?.response?.data?.message || error?.message,
        variant: 'destructive',
      });
      ecb?.(error);
    },
  };
};

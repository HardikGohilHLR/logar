// User
import { useMutation } from '@tanstack/react-query';

import { API, queryMessages } from '@/lib/api';

export const useCreateUser = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: async (values: any) => {
      const response = await API.post(`/api/user`, { data: values });
      return response;
    },
  });

  return { mutate, isPending };
};

export const useVerifyUser = ({ scb }: any) => {
  const { mutate, isPending } = useMutation({
    mutationFn: async (values: any) => {
      const response = await API.patch(`/api/user/verify`, values);
      return response;
    },
    ...queryMessages({ scb }),
  });

  return { mutate, isPending };
};

// Profile
'use client';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useUser } from '@clerk/nextjs';

import { IProfileFormValues } from '@/lib/types';
import { profileSchema } from '@/lib/validations';
import { toast } from '@/hooks/use-toast';

import { Button, Input, Label } from '@/components/ui';

export const Profile = () => {
  const { user, isLoaded } = useUser();

  const form = useForm<IProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
    },
  });

  useEffect(() => {
    if (user?.id) {
      form.setValue('firstName', user?.firstName || '');
      form.setValue('lastName', user?.lastName || '');
      form.setValue('email', user?.primaryEmailAddress?.emailAddress || '');
    }
  }, [user]);

  const onSubmit = async (data: IProfileFormValues) => {
    if (!isLoaded) return;

    try {
      await user?.update({
        firstName: data?.firstName,
        lastName: data?.lastName,
      });

      toast({ title: 'Success', description: 'Profile updated successfully.' });
      form.trigger();
    } catch (error: any) {
      toast({ title: 'Error', description: error?.message, variant: 'destructive' });
    }
  };

  return (
    <>
      <div className="container max-w-5xl">
        <div className="flex flex-col gap-8">
          <div className="rounded-2xl border">
            <form onSubmit={form?.handleSubmit(onSubmit)}>
              <div className="border-b border-gray-200 p-3 px-6">
                <h3 className="text-base font-semibold">Basic info</h3>
              </div>

              <div className="flex flex-col gap-4 p-6">
                <div className="grid grid-cols-2 gap-8">
                  <div className="grid gap-2">
                    <Label htmlFor="firstName">First Name</Label>

                    <div className="flex flex-col gap-1">
                      <Input
                        id="firstName"
                        type="firstName"
                        placeholder="m@example.com"
                        {...form.register('firstName')}
                      />
                      {form?.formState?.errors?.firstName && (
                        <p className="text-destructive text-xs">{form?.formState?.errors?.firstName.message}</p>
                      )}
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="lastName">Last Name</Label>

                    <div className="flex flex-col gap-1">
                      <Input id="lastName" type="lastName" placeholder="m@example.com" {...form.register('lastName')} />
                      {form?.formState?.errors?.lastName && (
                        <p className="text-destructive text-xs">{form?.formState?.errors?.lastName.message}</p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>

                  <div className="flex flex-col gap-1">
                    <Input id="email" type="email" placeholder="m@example.com" {...form.register('email')} disabled />
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button className="btn btn-primary">Save Changes</Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

// Login
'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSignIn } from '@clerk/nextjs';

import { useToast } from '@/hooks/use-toast';

import { IForgotPasswordFormValues } from '@/lib/types';
import { forgotPasswordSchema } from '@/lib/validations';

import { Button, Input, Label } from '@/components/ui';
import { TermsFooter } from '@/components/imports';

export const ForgotPasswordForm = () => {
  const router = useRouter();

  const { toast } = useToast();
  const { signIn } = useSignIn();

  const form = useForm<IForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (data: IForgotPasswordFormValues) => {
    try {
      await signIn?.create({
        identifier: data?.email,
        strategy: 'reset_password_email_code',
      });

      router.push('/reset-password');
    } catch (error: any) {
      toast({ title: 'Error', description: error?.message, variant: 'destructive' });
    }
  };

  return (
    <>
      <div className="flex flex-col gap-6 rounded-xl border p-6">
        <div className="flex flex-col space-y-1.5 text-center">
          <h2 className="text-xl font-semibold tracking-tight">Forgot Password</h2>
          <p className="text-sm">Enter your email address and we will send you a link to reset your password.</p>
        </div>

        <form onSubmit={form?.handleSubmit(onSubmit)}>
          <div className="grid gap-6">
            <div className="grid gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>

                <div className="flex flex-col gap-1">
                  <Input id="email" type="email" placeholder="m@example.com" {...form.register('email')} />
                  {form.formState.errors.email && (
                    <p className="text-destructive text-xs">{form.formState.errors.email.message}</p>
                  )}
                </div>
              </div>

              <Button type="submit" className="w-full">
                Submit
              </Button>
            </div>

            <div className="text-center">
              <p className="text-sm">
                Want to login?{' '}
                <Link href="/login" className="underline underline-offset-4">
                  Login
                </Link>
              </p>
            </div>
          </div>
        </form>

        <TermsFooter />
      </div>
    </>
  );
};

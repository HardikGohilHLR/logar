// Reset Password
'use client';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSignIn, useAuth } from '@clerk/nextjs';

import { useToast } from '@/hooks/use-toast';

import { IResetPasswordFormValues } from '@/lib/types';
import { resetPasswordSchema } from '@/lib/validations';

import { Button, Input, Label } from '@/components/ui';
import { TermsFooter } from '@/components/imports';

export const ResetPasswordForm = () => {
  const router = useRouter();

  const { toast } = useToast();
  const { signIn, setActive } = useSignIn();
  const { signOut } = useAuth();

  const form = useForm<IResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      code: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: IResetPasswordFormValues) => {
    if (!signIn?.id) {
      toast({
        title: 'Error',
        description: 'No password reset requested.',
        variant: 'destructive',
      });

      return;
    }

    try {
      await signIn?.attemptFirstFactor({
        strategy: 'reset_password_email_code',
        code: data?.code,
        password: data?.password,
      });

      signOut();
      setActive?.({ session: '' });

      router.push('/login');
    } catch (error: any) {
      toast({ title: 'Error', description: error?.message, variant: 'destructive' });
    }
  };

  return (
    <>
      <div className="flex flex-col gap-6 rounded-xl border p-6">
        <div className="flex flex-col space-y-1.5 text-center">
          <h2 className="text-xl font-semibold tracking-tight">Reset Password</h2>
          <p className="text-sm">
            Please enter the code sent to your email along with your new password to reset your password.
          </p>
        </div>

        <form onSubmit={form?.handleSubmit(onSubmit)}>
          <div className="grid gap-6">
            <div className="grid gap-6">
              <div className="grid gap-2">
                <Label htmlFor="code">Code</Label>
                <div className="flex flex-col gap-1">
                  <Input id="code" type="code" {...form.register('code')} placeholder="Enter code" />
                  {form.formState?.errors?.code && (
                    <p className="text-destructive text-xs">{form?.formState?.errors?.code?.message}</p>
                  )}
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>

                <div className="flex flex-col gap-1">
                  <Input
                    id="password"
                    type="password"
                    {...form.register('password')}
                    placeholder="Enter your password"
                  />
                  {form.formState?.errors?.password && (
                    <p className="text-destructive text-xs">{form?.formState?.errors?.password?.message}</p>
                  )}
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <div className="flex flex-col gap-1">
                  <Input
                    id="confirmPassword"
                    type="password"
                    {...form.register('confirmPassword')}
                    placeholder="Enter confirm password"
                  />
                  {form?.formState?.errors?.confirmPassword && (
                    <p className="text-destructive text-xs">{form?.formState?.errors?.confirmPassword?.message}</p>
                  )}
                </div>
              </div>

              <Button type="submit" className="w-full">
                Submit
              </Button>
            </div>

            <div className="text-center">
              <p className="text-sm">
                Go back to login?{' '}
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

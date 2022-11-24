// Login
'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSignIn } from '@clerk/nextjs';

import { useToast } from '@/hooks/use-toast';

import { ILoginFormValues } from '@/lib/types';
import { loginSchema } from '@/lib/validations';

import { Button, Input, Label } from '@/components/ui';
import { GoogleLoginButton, GithubLoginButton, TermsFooter } from '@/components/imports';

export const LoginForm = () => {
  const { toast } = useToast();
  const router = useRouter();

  const { isLoaded, signIn, setActive } = useSignIn();

  const form = useForm<ILoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: ILoginFormValues) => {
    if (!isLoaded) return;

    try {
      const result = await signIn.create({
        identifier: data?.email,
        password: data?.password,
      });

      await setActive({ session: result?.createdSessionId });
      toast({ title: 'Success', description: 'You have successfully logged in.' });

      router.push('/');
      router.refresh();
    } catch (error: any) {
      toast({ title: 'Error', description: error?.message, variant: 'destructive' });
    }
  };

  return (
    <>
      <div className="flex flex-col gap-6 rounded-xl border p-6">
        <div className="flex flex-col space-y-1.5 text-center">
          <h2 className="text-xl font-semibold tracking-tight">Welcome back</h2>
          <p className="text-sm">Login with your Google account</p>
        </div>

        <form onSubmit={form?.handleSubmit(onSubmit)}>
          <div className="grid gap-6">
            <div className="flex gap-4">
              <GoogleLoginButton />
              <GithubLoginButton />
            </div>

            <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
              <span className="bg-background text-muted-foreground relative z-10 px-2">Or continue with</span>
            </div>

            <div className="grid gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>

                <div className="flex flex-col gap-1">
                  <Input id="email" type="email" placeholder="m@example.com" {...form.register('email')} />
                  {form?.formState?.errors?.email && (
                    <p className="text-destructive text-xs">{form?.formState?.errors?.email.message}</p>
                  )}
                </div>
              </div>

              <div className="grid gap-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link href="/forgot-password" className="text-sm underline-offset-4 hover:underline">
                    Forgot your password?
                  </Link>
                </div>

                <div className="flex flex-col gap-1">
                  <Input
                    id="password"
                    type="password"
                    {...form.register('password')}
                    placeholder="Enter your password"
                  />
                  {form?.formState?.errors?.password && (
                    <p className="text-destructive text-xs">{form?.formState?.errors?.password.message}</p>
                  )}
                </div>
              </div>

              <Button type="submit" className="w-full">
                Login
              </Button>
            </div>

            <div className="text-center">
              <p className="text-sm">
                Don&apos;t have an account?{' '}
                <Link href="signup" className="underline underline-offset-4">
                  Sign up
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

// Signup
'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSignUp } from '@clerk/nextjs';

import { useToast } from '@/hooks/use-toast';

import { useCreateUser, useVerifyUser } from '@/actions/user';
import { ISignupFormValues } from '@/lib/types';
import { signupSchema } from '@/lib/validations';

import { Button, Input, Label } from '@/components/ui';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui';

import { GithubLoginButton, GoogleLoginButton, TermsFooter } from '@/components/imports';

export const SignupForm = () => {
  const router = useRouter();

  const { toast } = useToast();
  const { signUp, setActive } = useSignUp();

  const { mutate } = useCreateUser();

  const { mutate: verifyUserMutate } = useVerifyUser({
    scb: () => {
      router.push('/');
      router.refresh();
      setModalOpen({ isOpen: false });
    },
  });

  const [modalOpen, setModalOpen] = useState<{
    isOpen: boolean;
    data?: any;
  }>({
    isOpen: false,
    data: {},
  });
  const [otp, setOtp] = useState<string>('');

  const form = useForm<ISignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: ISignupFormValues) => {
    try {
      await signUp?.create({
        firstName: data?.firstName,
        lastName: data?.lastName,
        emailAddress: data?.email,
        password: data?.password,
      });

      const { firstName, lastName, email, password } = data;
      mutate({ firstName, lastName, email, password });

      await signUp?.prepareEmailAddressVerification({ strategy: 'email_code' });

      setModalOpen({ isOpen: true, data });
    } catch (error: any) {
      toast({ title: 'Error', description: error?.message, variant: 'destructive' });
    }
  };

  const handle = {
    modal: (isOpen: boolean) => {
      setModalOpen({ isOpen });
    },
    attemptVerification: async () => {
      try {
        const result = await signUp?.attemptEmailAddressVerification({
          code: otp,
        });

        if (result?.status === 'complete') {
          verifyUserMutate({ email: result?.emailAddress, clerkId: result?.id });

          await setActive?.({ session: result?.createdSessionId });
        } else {
          toast({
            title: 'Error',
            description: 'Something went wrong! Please try again.',
            variant: 'destructive',
          });
        }
      } catch (error: any) {
        toast({ title: 'Error', description: error?.message, variant: 'destructive' });
      }
    },
  };

  return (
    <>
      <div className="flex flex-col gap-6 rounded-xl border p-6">
        <div className="flex flex-col space-y-1.5 text-center">
          <h2 className="text-xl font-semibold tracking-tight">Welcome To Logar</h2>
          <p className="text-sm">Signup with your Google account</p>
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
                <Label htmlFor="firstName">First Name</Label>
                <div className="flex flex-col gap-1">
                  <Input id="firstName" type="firstName" placeholder="John" {...form.register('firstName')} />
                  {form.formState.errors.firstName && (
                    <p className="text-destructive text-xs">{form.formState.errors.firstName.message}</p>
                  )}
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="lastName">Last Name</Label>
                <div className="flex flex-col gap-1">
                  <Input id="lastName" type="lastName" placeholder="Doe" {...form.register('lastName')} />
                  {form.formState.errors.lastName && (
                    <p className="text-destructive text-xs">{form.formState.errors.lastName.message}</p>
                  )}
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <div className="flex flex-col gap-1">
                  <Input id="email" type="email" placeholder="m@example.com" {...form.register('email')} />
                  {form.formState.errors.email && (
                    <p className="text-destructive text-xs">{form.formState.errors.email.message}</p>
                  )}
                </div>
              </div>

              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <div className="flex flex-col gap-1">
                  <Input
                    id="password"
                    type="password"
                    {...form.register('password')}
                    placeholder="Enter your password"
                  />
                  {form.formState.errors.password && (
                    <p className="text-destructive text-xs">{form.formState.errors.password.message}</p>
                  )}
                </div>
              </div>

              <Button type="submit" className="w-full">
                Create account
              </Button>
            </div>

            <div className="text-center">
              <p className="text-sm">
                Already have an account?{' '}
                <Link href="/login" className="underline underline-offset-4">
                  Login
                </Link>
              </p>
            </div>
          </div>
        </form>

        <TermsFooter />
      </div>

      {/* Verify Email */}
      <Dialog open={modalOpen?.isOpen} onOpenChange={handle.modal}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Verify your email</DialogTitle>
            <DialogDescription>
              We&apos;ve sent a verification code to your email address. Please enter the code below to verify your
              email.
            </DialogDescription>
          </DialogHeader>
          <div className="grid">
            <InputOTP maxLength={6} value={otp} onChange={(value) => setOtp(value)} className="w-full">
              <InputOTPGroup className="w-full">
                <InputOTPSlot index={0} className="h-16 w-full" />
                <InputOTPSlot index={1} className="h-16 w-full" />
                <InputOTPSlot index={2} className="h-16 w-full" />
                <InputOTPSlot index={3} className="h-16 w-full" />
                <InputOTPSlot index={4} className="h-16 w-full" />
                <InputOTPSlot index={5} className="h-16 w-full" />
              </InputOTPGroup>
            </InputOTP>
          </div>
          <DialogFooter>
            <Button type="button" onClick={handle.attemptVerification}>
              Submit
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

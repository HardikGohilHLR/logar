// User
import { NextRequest, NextResponse } from 'next/server';
import { eq } from 'drizzle-orm';

import { users } from '@/db/schema/users';
import { db } from '@/db/connection';

export async function POST(request: NextRequest) {
  const req = await request.json();

  const email = req?.data?.email_addresses?.[0]?.email_address || req?.data?.email;

  // Check if user already exists
  const existingUser = await db.select().from(users).where(eq(users.email, email)).limit(1);

  if (!existingUser?.length) {
    const signInType = req?.data?.email_addresses?.[0]?.verification?.strategy?.includes?.('google')
      ? 'google'
      : req?.data?.email_addresses?.[0]?.verification?.strategy?.includes?.('github')
        ? 'github'
        : 'email';

    const body = {
      firstName: req?.data?.first_name || req?.data?.firstName,
      lastName: req?.data?.last_name || req?.data?.lastName,
      email,
      clerkId: req?.data?.id || '',
      signInType,
      isVerified: signInType === 'google',
    };

    try {
      await db.insert(users).values(body);

      return NextResponse.json({
        error: false,
        data: {},
        message: 'User added successfully!',
      });
    } catch (err: any) {
      return NextResponse.json({ error: true, messge: err?.message });
    }
  }

  return NextResponse.json({
    error: false,
    data: {},
    message: '',
  });
}

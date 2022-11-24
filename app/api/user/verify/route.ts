// User - Verify
import { NextRequest, NextResponse } from 'next/server';
import { eq } from 'drizzle-orm';

import { users } from '@/db/schema/users';
import { db } from '@/db/connection';

export async function PATCH(request: NextRequest) {
  const req = await request.json();

  const { email, clerkId } = req;

  try {
    const existingUser = await db.select().from(users).where(eq(users.email, email)).limit(1);

    if (!existingUser.length) {
      return NextResponse.json({ error: true, message: 'Email does not exist!' });
    }

    await db.update(users).set({ isVerified: true, clerkId }).where(eq(users.email, email));

    return NextResponse.json({
      error: false,
      data: {},
      message: 'User verified successfully!',
    });
  } catch (err: any) {
    return NextResponse.json({ error: true, message: err?.message });
  }
}

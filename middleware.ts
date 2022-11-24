// Middleware
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const isProtectedRoute = createRouteMatcher(['/']);

const isPublicRoute = createRouteMatcher(['/login(.*)', '/signup(.*)', '/forgot-password(.*)', '/reset-password(.*)']);

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth();
  if (isProtectedRoute(req) && !userId && !isPublicRoute(req)) {
    req.nextUrl.pathname = '/login';

    return NextResponse.redirect(req.nextUrl);
  }

  if (isPublicRoute(req) && userId && !isProtectedRoute(req)) {
    req.nextUrl.pathname = '/';
    return NextResponse.redirect(req.nextUrl);
  }

  console.log('userId', userId);
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};

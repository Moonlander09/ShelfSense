// middleware.js (place in root directory of Next.js project)
import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

// Define your protected route prefixes (includes dynamic routes like /food/[id])
const PROTECTED_ROUTES = [
  '/food',
  '/household',
  '/other',
  '/cleaning',
  '/toiletries',
  '/updatePassword'
];

const AUTH_ROUTES = ['/signin', '/signup'];

export async function proxy(request) {
  const { pathname } = request.nextUrl;
  
  // Get token from cookies
  const token = request.cookies.get('token')?.value;

  console.log(token)
  
  let isAuthenticated = false;

  // Verify token if it exists
  if (token) {
    try {
      // Replace 'your-secret-key' with your actual JWT secret
      const secret = new TextEncoder().encode(
        process.env.JWT_SECRET);
      
      await jwtVerify(token, secret);
      isAuthenticated = true;
    } catch (error) {
      // Token is invalid or expired
      isAuthenticated = false;
      
      // Clear invalid token
      const response = NextResponse.next();
      response.cookies.delete('token');
    }
  }

  // Check if current path is a protected route or nested under protected routes
  const isProtectedRoute = PROTECTED_ROUTES.some(route => 
    pathname === route || pathname.startsWith(`${route}/`)
  );

  // Check if current path is an auth route
  const isAuthRoute = AUTH_ROUTES.some(route => pathname === route);

  // Redirect unauthenticated users trying to access protected routes
  if (isProtectedRoute && !isAuthenticated) {
    const url = request.nextUrl.clone();
    url.pathname = '/signin';
    url.searchParams.set('redirect', pathname); // Optional: save original destination
    return NextResponse.redirect(url);
  }

  // Redirect authenticated users trying to access auth routes
  if (isAuthRoute && isAuthenticated) {
    const url = request.nextUrl.clone();
    url.pathname = '/'; // Redirect to home or dashboard
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// Configure which routes the middleware should run on
export const config = {
  matcher: [
    // Auth routes
    '/signin',
    '/signup',
    
    // Protected routes (static)
    '/food',
    '/household',
    '/other',
    '/cleaning',
    '/toiletries',
    '/updatePassword',
    
    // Protected routes (dynamic - with IDs)
    '/food/:path*',
    '/household/:path*',
    '/other/:path*',
    '/cleaning/:path*',
    '/toiletries/:path*',
  ],
};
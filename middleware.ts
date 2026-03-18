import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('admin_token')?.value;
  const isLoginPage = request.nextUrl.pathname === '/';

    // If there's no token and the user is NOT on the login page, redirect to login
  if (!token && !isLoginPage) {
    // Only protect operational pages, allow public assets and API calls (though API calls should be handled by backend auth)
    const protectedPaths = [
        '/dashboard',
        '/analytics', 
        '/appointments', 
        '/approvals', 
        '/customers', 
        '/payments', 
        '/reviews', 
        '/salons', 
        '/services'
    ];

    if (protectedPaths.some(path => request.nextUrl.pathname.startsWith(path))) {
        return NextResponse.redirect(new URL('/', request.url));
    }
  }

  // If there's a token and the user is on the login page, redirect to dashboard
  if (token && isLoginPage) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};

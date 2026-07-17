import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { decryptSession } from './lib/auth';

const routePermissions: Record<string, string> = {
  '/admin/home-page': 'home_page:view',
  '/admin/services': 'services:view',
  '/admin/destinations': 'destinations:view',
  '/admin/universities': 'universities:view',
  '/admin/about-us': 'about_us:view',
  '/admin/testimonials': 'testimonials:view',
  '/admin/faq': 'faq:view',
  '/admin/team': 'team:view',
  '/admin/contact-messages': 'contact_messages:view',
  '/admin/consultations': 'consultations:view',
  '/admin/applications': 'consultations:view',
  '/admin/admin-users': 'admin_users:view',
  '/admin/roles': 'admin_users:view',
  '/admin/settings': 'settings:view',
  '/admin/website-settings': 'settings:view',
  '/admin/contact-details': 'settings:view',
};

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    const sessionCookie = request.cookies.get('admin_session');

    if (!sessionCookie) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    const payload = await decryptSession(sessionCookie.value);

    if (!payload) {
      const response = NextResponse.redirect(new URL('/admin/login', request.url));
      response.cookies.delete('admin_session');
      return response;
    }

    if (payload.role === 'super-admin') {
      return NextResponse.next();
    }

    const requiredPermission = routePermissions[pathname];
    if (requiredPermission && !payload.permissions.includes(requiredPermission)) {
      return NextResponse.redirect(new URL('/admin', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};

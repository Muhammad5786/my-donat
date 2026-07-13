import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';
import { updateSession } from '@/lib/supabase/middleware';
import { supabasePublishableKey, supabaseUrl } from '@/lib/supabase/env';

const ADMIN_LOGIN_ROUTE = '/admin/login';
const ADMIN_DASHBOARD_ROUTE = '/admin/dashboard';

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const response = await updateSession(request);

  if (!pathname.startsWith('/admin')) {
    return response;
  }

  const supabase = createServerClient(supabaseUrl, supabasePublishableKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) => {
          response.cookies.set(name, value, options);
        });
      },
    },
  });

  const { data } = await supabase.auth.getUser();
  const user = data?.user ?? null;

  if (pathname === ADMIN_LOGIN_ROUTE) {
    if (user) {
      return NextResponse.redirect(new URL(ADMIN_DASHBOARD_ROUTE, request.url));
    }
    return response;
  }

  if (!user) {
    return NextResponse.redirect(new URL(ADMIN_LOGIN_ROUTE, request.url));
  }

  return response;
}

export const config = {
  matcher: ['/admin/:path*'],
};

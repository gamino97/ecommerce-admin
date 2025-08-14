import { type NextRequest, NextResponse } from 'next/server';
import { updateSession } from '@/utils/supabase/middleware';
import acceptLanguage from 'accept-language';
import { fallbackLng, languages, cookieName, headerName } from './app/i18n/settings';

acceptLanguage.languages(languages);

export async function middleware(request: NextRequest) {
  // Ignore paths with "icon" or "chrome"
  if (request.nextUrl.pathname.indexOf('icon') > -1 || request.nextUrl.pathname.indexOf('chrome') > -1) return NextResponse.next();

  let lng;
  // Try to get language from cookie
  if (request.cookies.has(cookieName))
    lng = acceptLanguage.get(request.cookies.get(cookieName)?.value);
  // If no cookie, check the Accept-Language header
  if (!lng) lng = acceptLanguage.get(request.headers.get('Accept-Language'));
  // Default to fallback language if still undefined
  if (!lng) lng = fallbackLng;

  // Check if the language is already in the path
  const lngInPath = languages.find(
    loc => request.nextUrl.pathname.startsWith(`/${loc}`)
  );
  const headers = new Headers(request.headers);
  headers.set(headerName, lngInPath || lng);

  // If the language is not in the path, redirect to include it
  if (
    !lngInPath &&
      !request.nextUrl.pathname.startsWith('/_next')
  ) {
    return NextResponse.redirect(new URL(
      `/${lng}${request.nextUrl.pathname}${request.nextUrl.search}`,
      request.url
    ));
  }

  // If a referer exists, try to detect the language from there and set the cookie accordingly
  if (request.headers.has('referer')) {
    const refererUrl = new URL(request.headers.get('referer') || '');
    const lngInReferer = languages.find(
      (l) => refererUrl.pathname.startsWith(`/${l}`)
    );
    const response = NextResponse.next({ headers });
    if (lngInReferer) response.cookies.set(cookieName, lngInReferer);
    return response;
  }

  return await updateSession(request, headers);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};

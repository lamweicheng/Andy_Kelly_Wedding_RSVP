import { cookies } from 'next/headers';

const ADMIN_SESSION_COOKIE = 'wedding-admin-session';

export function isAdminProtectionEnabled() {
  return Boolean(process.env.ADMIN_PASSWORD);
}

export function isAdminAuthenticated() {
  if (!isAdminProtectionEnabled()) {
    return true;
  }

  return cookies().get(ADMIN_SESSION_COOKIE)?.value === process.env.ADMIN_PASSWORD;
}

export function createAdminSession() {
  if (!process.env.ADMIN_PASSWORD) {
    return;
  }

  cookies().set(ADMIN_SESSION_COOKIE, process.env.ADMIN_PASSWORD, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 12
  });
}

export function clearAdminSessionCookie() {
  cookies().delete(ADMIN_SESSION_COOKIE);
}
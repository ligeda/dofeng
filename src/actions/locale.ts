"use server";

import { cookies } from "next/headers";

import { defaultLocale, localeCookieName, locales, type Locale } from "@/i18n/config";

export async function setUserLocale(locale: Locale) {
  const cookieStore = await cookies();
  const safeLocale = locales.includes(locale) ? locale : defaultLocale;

  cookieStore.set(localeCookieName, safeLocale, {
    path: "/",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 365,
  });
}

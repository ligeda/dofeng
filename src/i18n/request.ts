import { cookies } from "next/headers";

import { getRequestConfig } from "next-intl/server";

import {
  defaultLocale,
  localeCookieName,
  locales,
  type Locale,
} from "@/i18n/config";

export default getRequestConfig(async () => {
  const cookieStore = await cookies();
  const localeFromCookie = cookieStore.get(localeCookieName)?.value;

  const locale: Locale = locales.includes(localeFromCookie as Locale)
    ? (localeFromCookie as Locale)
    : defaultLocale;

  return {
    locale,
    messages: {},
  };
});

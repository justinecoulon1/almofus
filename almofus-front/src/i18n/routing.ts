import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export enum Locales {
  en = 'en',
  fr = 'fr',
}

export const routing = defineRouting({
  locales: Object.values(Locales),
  defaultLocale: Locales.en,
});

export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing);

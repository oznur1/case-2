import {createNavigation} from "next-intl/navigation";

export const routing = {
  locales: ["en", "tr"] as const,
  defaultLocale: "en" as const,
};

export const {Link, redirect, usePathname, useRouter} = createNavigation({
  locales: routing.locales as unknown as string[],
});



import {getRequestConfig} from "next-intl/server";

export default getRequestConfig(async ({locale}): Promise<{messages: any; locale: string}> => {
  const normalizedLocale = locale ?? "en";
  try {
    const messages = (await import(`../messages/${normalizedLocale}.json`)).default;
    return {messages, locale: normalizedLocale};
  } catch {
    return {messages: {}, locale: normalizedLocale};
  }
});



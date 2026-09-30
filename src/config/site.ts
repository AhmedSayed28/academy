export interface NavigationItem {
  id: "home" | "courses" | "tracks" | "instructors" | "about" | "contact" | "faq" | "registerInterest";
  href: `/${string}`;
  available: boolean;
}

export interface SocialLink {
  label: string;
  href: string;
}

export function parseAppUrl(value: string | undefined): URL {
  if (!value) {
    throw new Error("NEXT_PUBLIC_APP_URL is required.");
  }

  let url: URL;

  try {
    url = new URL(value);
  } catch {
    throw new Error("NEXT_PUBLIC_APP_URL must be a valid absolute URL.");
  }

  const isSupportedProtocol = url.protocol === "https:" || url.protocol === "http:";
  const isOriginOnly =
    url.pathname === "/" && !url.search && !url.hash && !url.username && !url.password;

  if (!isSupportedProtocol || !isOriginOnly) {
    throw new Error("NEXT_PUBLIC_APP_URL must contain only an HTTP or HTTPS origin.");
  }

  return new URL(url.origin);
}

export function isPreviewDeployment(
  environment: Readonly<Record<string, string | undefined>> = process.env,
) {
  return environment.VERCEL_ENV === "preview";
}

const navigation = [
  { id: "home", href: "/", available: true },
  { id: "courses", href: "/courses", available: true },
  { id: "tracks", href: "/tracks", available: true },
  { id: "instructors", href: "/instructors", available: true },
  { id: "about", href: "/about", available: true },
  { id: "contact", href: "/contact", available: true },
] satisfies NavigationItem[];

const footerNavigation = [
  { id: "faq", href: "/faq", available: true },
] satisfies NavigationItem[];

export const siteConfig = {
  name: "Academy",
  url: parseAppUrl(process.env.NEXT_PUBLIC_APP_URL),
  navigation,
  footerNavigation,
  primaryAction: {
    id: "registerInterest",
    href: "/register-interest",
    available: true,
  } satisfies NavigationItem,
  contact: {
    email: null as string | null,
    whatsappNumber: null as string | null,
  },
  socialLinks: [] as SocialLink[],
} as const;

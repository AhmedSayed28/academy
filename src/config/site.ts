export interface NavigationItem {
  label: string;
  href: `/${string}`;
  available: boolean;
}

export interface SocialLink {
  label: string;
  href: string;
}

const navigation = [
  { label: "Home", href: "/", available: true },
  { label: "Courses", href: "/courses", available: true },
  { label: "Tracks", href: "/tracks", available: true },
  { label: "Instructors", href: "/instructors", available: false },
  { label: "About", href: "/about", available: false },
  { label: "Contact", href: "/contact", available: false },
] satisfies NavigationItem[];

export const siteConfig = {
  name: "Academy",
  description: "Practical, career-oriented technology education.",
  url: null as string | null,
  navigation,
  primaryAction: {
    label: "Explore Tracks",
    href: "/tracks",
    available: true,
  } satisfies NavigationItem,
  contact: {
    email: null as string | null,
    whatsappNumber: null as string | null,
  },
  socialLinks: [] satisfies SocialLink[],
} as const;

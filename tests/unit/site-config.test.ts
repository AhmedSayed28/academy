import { describe, expect, it } from "vitest";

import { siteConfig } from "../../src/config/site";

describe("site configuration", () => {
  it("keeps the approved Ernst identity and shared navigation in one source", () => {
    expect(siteConfig.name).toBe("Ernst Academy");
    expect(siteConfig.assets).toEqual({
      logo: "/brand/ernst-logo.svg",
      mark: "/brand/ernst-mark.svg",
      favicon: "/brand/ernst-favicon.png",
      openGraph: "/brand/ernst-og-image.png",
      geometricBackground: "/brand/ernst-geometric-background.png",
      footerCover: "/brand/ernst-footer-cover.png",
    });
    expect(siteConfig.navigation.map(({ id }) => id)).toEqual([
      "home",
      "courses",
      "tracks",
      "instructors",
      "about",
      "contact",
    ]);
  });

  it("only marks routes implemented in this phase as available", () => {
    expect(
      siteConfig.navigation.filter(({ available }) => available).map(({ href }) => href),
    ).toEqual(["/", "/courses", "/tracks", "/instructors", "/about", "/contact"]);
    expect(siteConfig.primaryAction).toMatchObject({
      id: "registerInterest",
      href: "/register-interest",
      available: true,
    });
    expect(siteConfig.footerNavigation).toEqual([
      { id: "faq", href: "/faq", available: true },
    ]);
  });

  it("does not invent contact or social details", () => {
    expect(siteConfig.contact).toEqual({ email: null, whatsappNumber: null });
    expect(siteConfig.socialLinks).toEqual([]);
  });
});

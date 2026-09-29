import { describe, expect, it } from "vitest";

import { siteConfig } from "../../src/config/site";

describe("site configuration", () => {
  it("keeps the placeholder brand and shared navigation in one source", () => {
    expect(siteConfig.name).toBe("Academy");
    expect(siteConfig.navigation.map(({ label }) => label)).toEqual([
      "Home",
      "Courses",
      "Tracks",
      "Instructors",
      "About",
      "Contact",
    ]);
  });

  it("only marks routes implemented in this phase as available", () => {
    expect(
      siteConfig.navigation.filter(({ available }) => available).map(({ href }) => href),
    ).toEqual(["/", "/courses", "/tracks", "/instructors", "/about", "/contact"]);
    expect(siteConfig.primaryAction).toMatchObject({
      label: "Register Interest",
      href: "/register-interest",
      available: true,
    });
  });

  it("does not invent contact or social details", () => {
    expect(siteConfig.contact).toEqual({ email: null, whatsappNumber: null });
    expect(siteConfig.socialLinks).toEqual([]);
  });
});

export const registrationOptions = [
  { slug: "istqb-foundation-level", name: "ISTQB Foundation Level", kind: "course" },
  { slug: "software-testing-practical", name: "Software Testing Practical", kind: "course" },
  { slug: "front-end-development", name: "Front End Development", kind: "course" },
  { slug: "back-end-development", name: "Back End Development", kind: "course" },
  { slug: "software-testing-track", name: "Software Testing Track", kind: "path" },
  { slug: "full-stack-development", name: "Full Stack Development", kind: "path" },
] as const;

export type RegistrationOptionSlug = (typeof registrationOptions)[number]["slug"];

export function getRegistrationOption(slug: string) {
  return registrationOptions.find((option) => option.slug === slug);
}

// Synthetic records for automated tests only. They are never part of the approved public dataset.
export const syntheticTrackRecords = [
  {
    id: "e2e-published-track",
    slug: "synthetic-software-testing-track",
    name: "Software Testing",
    shortDescription: "A synthetic purpose statement used only to verify published track pages.",
    description: "This synthetic overview exists only for automated browser verification.",
    careerGoal: "Verify that approved career-goal content renders in the correct section.",
    skills: ["Synthetic skill"],
    learningJourney: ["Synthetic first step", "Synthetic second step"],
    tools: ["Synthetic tool"],
    courseSlugs: ["synthetic-open-course", "synthetic-unpublished-course"],
    published: true,
  },
  {
    id: "e2e-unpublished-track",
    slug: "synthetic-backend-track",
    name: "Backend Development",
    shortDescription: "A synthetic unpublished record that must never be exposed.",
    description: "This fixture verifies public filtering and unpublished slug handling.",
    published: false,
  },
] as const;

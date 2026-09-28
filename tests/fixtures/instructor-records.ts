// Synthetic records for automated tests only. They are never part of the approved public dataset.
export const syntheticInstructorRecords = [
  {
    id: "e2e-published-instructor-with-link",
    slug: "synthetic-published-instructor",
    name: "Synthetic Published Instructor",
    role: "Synthetic Test Role",
    biography: "A synthetic biography used only to verify the instructor listing.",
    expertise: ["Synthetic expertise", "Test fixtures"],
    professionalLinks: [
      { label: "Synthetic profile", url: "https://example.test/synthetic-profile" },
    ],
    published: true,
  },
  {
    id: "e2e-published-instructor-minimal",
    slug: "synthetic-minimal-instructor",
    name: "Synthetic Minimal Instructor",
    role: "Synthetic Test Role",
    biography: "A synthetic profile without optional image or professional links.",
    expertise: ["Optional field testing"],
    published: true,
  },
  {
    id: "e2e-unpublished-instructor",
    slug: "synthetic-unpublished-instructor",
    name: "Synthetic Unpublished Instructor",
    role: "Hidden Synthetic Role",
    biography: "This unpublished synthetic profile must never be exposed.",
    expertise: ["Publication filtering"],
    published: false,
  },
] as const;

export const documentedTrackNames = [
  "Software Testing",
  "Frontend Development",
  "Backend Development",
  "Artificial Intelligence",
  "DevOps",
  "Data Engineering",
  "Cybersecurity",
  "Mobile Development",
] as const;

export type DocumentedTrackName = (typeof documentedTrackNames)[number];

export type LearningTrackIconName =
  | "bug"
  | "layout"
  | "server"
  | "brain"
  | "git-branch"
  | "database"
  | "shield"
  | "smartphone";

const trackIdentifiers: Record<
  DocumentedTrackName,
  { slug: string; icon: LearningTrackIconName }
> = {
  "Software Testing": { slug: "software-testing", icon: "bug" },
  "Frontend Development": { slug: "frontend-development", icon: "layout" },
  "Backend Development": { slug: "backend-development", icon: "server" },
  "Artificial Intelligence": { slug: "artificial-intelligence", icon: "brain" },
  DevOps: { slug: "devops", icon: "git-branch" },
  "Data Engineering": { slug: "data-engineering", icon: "database" },
  Cybersecurity: { slug: "cybersecurity", icon: "shield" },
  "Mobile Development": { slug: "mobile-development", icon: "smartphone" },
};

export const documentedLearningTracks = documentedTrackNames.map((name) => ({
  name,
  ...trackIdentifiers[name],
}));

export const learningTracks = [
  { name: "Software Testing", icon: "bug" },
  { name: "Frontend Development", icon: "layout" },
  { name: "Backend Development", icon: "server" },
  { name: "Artificial Intelligence", icon: "brain" },
  { name: "DevOps", icon: "git-branch" },
  { name: "Data Engineering", icon: "database" },
  { name: "Cybersecurity", icon: "shield" },
  { name: "Mobile Development", icon: "smartphone" },
] as const;

export type LearningTrackIcon = (typeof learningTracks)[number]["icon"];

export const academyDifferentiators = [
  {
    title: "Practical learning",
    description:
      "Move beyond concepts with practical exercises, projects, and real-world scenarios.",
  },
  {
    title: "Career-oriented paths",
    description:
      "Build knowledge in a structured sequence connected to a clear technology direction.",
  },
  {
    title: "Industry-oriented skills",
    description:
      "Develop confidence with the tools and working practices used in professional environments.",
  },
] as const;

export const learningJourney = [
  {
    title: "Choose a track",
    description: "Start with the technology direction that best matches your goals.",
  },
  {
    title: "Learn fundamentals",
    description: "Build the core knowledge needed to progress with confidence.",
  },
  {
    title: "Practice",
    description: "Apply each concept through practical exercises and real-world scenarios.",
  },
  {
    title: "Build projects",
    description: "Bring individual skills together through practical project work.",
  },
  {
    title: "Develop career skills",
    description: "Prepare to use your knowledge confidently in professional environments.",
  },
] as const;

import { trackCollectionSchema } from "@/features/tracks/schemas/track.schema";
import type { Track } from "@/features/tracks/types/track.types";

export interface TrackRepository {
  list(): Promise<readonly Track[]>;
}

export function createTrackRepository(sourceRecords: readonly unknown[]): TrackRepository {
  return {
    async list() {
      return trackCollectionSchema.parse(sourceRecords);
    },
  };
}

// Detailed public track records require approval. The documented names are presented separately.
const approvedTrackRecords: readonly unknown[] = [
  {
    id: "software-testing",
    slug: "software-testing",
    name: "Software Testing",
    shortDescription:
      "Progress from manual testing foundations through API and database testing to foundational UI automation.",
    description:
      "The Software Testing track builds practical quality assurance skills in a clear progression. Learners begin with manual testing and test design, then apply those foundations to APIs and databases before building UI automation tests with Java, Selenium WebDriver, and TestNG.",
    careerGoal:
      "Build a practical foundation for junior software testing and QA work while developing skills that can support continued growth in manual, API, database, and automation testing. Participation does not guarantee employment or a specific career outcome.",
    skills: [
      "Manual testing and test design",
      "Defect reporting and test planning",
      "API testing with Postman",
      "Database verification with SQL",
      "Foundational UI test automation",
    ],
    learningJourney: [
      "Build manual testing and software quality foundations.",
      "Test APIs and validate request and response behavior.",
      "Verify stored data and integrity with SQL.",
      "Create foundational UI automation tests with Java and Selenium WebDriver.",
    ],
    tools: ["Jira", "Postman", "SQL", "Java", "Selenium WebDriver", "TestNG", "Maven", "Git"],
    courseSlugs: ["software-testing-fundamentals"],
    published: true,
  },
];

function getSourceRecords(): readonly unknown[] {
  const testRecords = process.env.ACADEMY_TEST_TRACK_RECORDS;

  if (process.env.NODE_ENV !== "production" && testRecords) {
    const parsed: unknown = JSON.parse(testRecords);
    return trackCollectionSchema.parse(parsed);
  }

  return approvedTrackRecords;
}

export const trackRepository = createTrackRepository(getSourceRecords());

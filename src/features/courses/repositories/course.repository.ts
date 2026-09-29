import { courseCollectionSchema } from "@/features/courses/schemas/course.schema";
import type { Course } from "@/features/courses/types/course.types";

export interface CourseRepository {
  list(): Promise<readonly Course[]>;
}

export function createCourseRepository(sourceRecords: readonly unknown[]): CourseRepository {
  return {
    async list() {
      return courseCollectionSchema.parse(sourceRecords);
    },
  };
}

// Public course content must be approved before it is added here. Test records belong in tests.
const approvedCourseRecords: readonly unknown[] = [
  {
    id: "software-testing-fundamentals",
    slug: "software-testing-fundamentals",
    title: "Software Testing Fundamentals",
    shortDescription:
      "A four-month beginner software testing diploma spanning manual, API, database, and UI automation testing.",
    description:
      "A beginner-oriented software testing diploma covering manual testing, API testing, database testing, and UI test automation. Learners build foundational testing knowledge and apply it through practical exercises and a final project.",
    track: "Software Testing",
    trackSlug: "software-testing",
    level: "Beginner",
    duration: "4 months",
    availability: "Upcoming",
    startDate: "To be announced",
    price: { amount: 7500, currency: "EGP" },
    instructor: {
      name: "Ahmed Sayed Ahmed",
      slug: "ahmed-sayed-ahmed",
      title: "Software Testing Lead",
    },
    learningOutcomes: [
      "Design and execute meaningful manual test cases.",
      "Apply common test-design techniques.",
      "Report reproducible defects clearly.",
      "Test APIs using Postman.",
      "Verify database data using SQL.",
      "Build foundational UI automation tests using Java, Selenium, and TestNG.",
    ],
    targetAudience: [
      "Beginners entering software testing.",
      "Junior testers developing practical skills.",
      "Software professionals seeking a foundation in QA.",
    ],
    prerequisites: [
      "Basic computer skills.",
      "No previous software testing experience required.",
      "No prior Java knowledge is required; Java fundamentals are included.",
    ],
    curriculum: [
      {
        title: "Module 1 — Manual Testing",
        topics: [
          "Introduction to Software Quality and Testing",
          "Testing Principles and Testing Activities",
          "SDLC, STLC, and Agile Testing",
          "Test Levels and Test Types",
          "Static Testing and Reviews",
          "Equivalence Partitioning and Boundary Value Analysis",
          "Decision Tables and State Transition Testing",
          "Writing Test Cases and Managing Test Data",
          "Defect Reporting and Defect Lifecycle",
          "Test Planning, Smoke Testing, and Regression Testing",
        ],
      },
      {
        title: "Module 2 — API Testing",
        topics: [
          "APIs, HTTP, and Request/Response Fundamentals",
          "Methods, Status Codes, Headers, and Parameters",
          "JSON and Reading API Documentation",
          "Postman Requests, Collections, and Environments",
          "Authentication and Authorization Testing",
          "Positive, Negative, and Validation Scenarios",
          "Postman Assertions and Collection Execution",
        ],
      },
      {
        title: "Module 3 — Database Testing",
        topics: [
          "Relational Database Fundamentals",
          "SQL SELECT, Filtering, and Sorting",
          "Joins and Aggregate Queries",
          "Keys, Relationships, and Constraints",
          "Verifying Stored Data and Data Integrity",
          "Connecting UI/API Results to Database Checks",
        ],
      },
      {
        title: "Module 4 — UI Automation Testing",
        topics: [
          "Java Fundamentals for Test Automation",
          "Selenium WebDriver and Browser Interaction",
          "Locators and Element Handling",
          "Synchronization and Explicit Waits",
          "Assertions and TestNG",
          "Page Object Model and Test Data",
          "Maven, Git, and Test Execution",
          "Test Reports and Automation Maintenance",
          "Final Practical Testing Project",
        ],
      },
    ],
    registrationUrl: "/register-interest",
    featured: true,
    published: true,
  },
];

function getSourceRecords(): readonly unknown[] {
  const testRecords = process.env.ACADEMY_TEST_COURSE_RECORDS;

  if (process.env.NODE_ENV !== "production" && testRecords) {
    const parsed: unknown = JSON.parse(testRecords);
    return courseCollectionSchema.parse(parsed);
  }

  return approvedCourseRecords;
}

export const courseRepository = createCourseRepository(getSourceRecords());

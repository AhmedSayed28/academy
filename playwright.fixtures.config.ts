import { defineConfig, devices } from "@playwright/test";

import { syntheticCourseRecords } from "./tests/fixtures/course-records";

export default defineConfig({
  testDir: "./tests/e2e",
  testMatch: "courses-fixtures.spec.ts",
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  use: { baseURL: "http://localhost:3000" },
  webServer: {
    command: "pnpm dev",
    url: "http://localhost:3000",
    reuseExistingServer: false,
    env: {
      ...process.env,
      ACADEMY_TEST_COURSE_RECORDS: JSON.stringify(syntheticCourseRecords),
    },
  },
});

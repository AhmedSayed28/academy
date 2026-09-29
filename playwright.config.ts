import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/e2e",
  workers: 2,
  testIgnore: [
    "courses-fixtures.spec.ts",
    "tracks-fixtures.spec.ts",
    "instructors-fixtures.spec.ts",
    "leads-fixtures.spec.ts",
  ],
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  use: { baseURL: "http://localhost:3000" },
  webServer: {
    command: "pnpm dev",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
  },
});

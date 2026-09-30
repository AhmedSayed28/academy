import { describe, expect, it } from "vitest";

import {
  learningTracks,
} from "../../src/features/homepage/content";
import { getDictionary } from "../../src/i18n/translations";

describe("homepage content", () => {
  it("uses the eight documented initial learning tracks", () => {
    expect(learningTracks.map(({ name }) => name)).toEqual([
      "Software Testing",
      "Frontend Development",
      "Backend Development",
      "Artificial Intelligence",
      "DevOps",
      "Data Engineering",
      "Cybersecurity",
      "Mobile Development",
    ]);
  });

  it("keeps the documented learning journey in order", () => {
    expect(getDictionary("en").home.journey.items.map(({ title }) => title)).toEqual([
      "Choose a track",
      "Learn fundamentals",
      "Practice",
      "Build projects",
      "Develop career skills",
    ]);
  });

  it("limits Academy differentiators to approved product principles", () => {
    expect(getDictionary("en").home.why.items.map(({ title }) => title)).toEqual([
      "Practical learning",
      "Career-oriented paths",
      "Industry-oriented skills",
    ]);
  });
});

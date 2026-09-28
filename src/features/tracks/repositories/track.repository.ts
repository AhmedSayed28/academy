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
const approvedTrackRecords: readonly unknown[] = [];

function getSourceRecords(): readonly unknown[] {
  const testRecords = process.env.ACADEMY_TEST_TRACK_RECORDS;

  if (process.env.NODE_ENV !== "production" && testRecords) {
    const parsed: unknown = JSON.parse(testRecords);
    return trackCollectionSchema.parse(parsed);
  }

  return approvedTrackRecords;
}

export const trackRepository = createTrackRepository(getSourceRecords());

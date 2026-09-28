import type { z } from "zod";

import type { trackSchema } from "@/features/tracks/schemas/track.schema";

export type Track = z.infer<typeof trackSchema>;

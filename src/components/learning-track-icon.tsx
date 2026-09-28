import {
  BrainCircuit,
  Bug,
  Database,
  GitBranch,
  LayoutTemplate,
  Server,
  ShieldCheck,
  Smartphone,
  type LucideIcon,
} from "lucide-react";

import type { LearningTrackIconName } from "@/config/learning-tracks";

const icons: Record<LearningTrackIconName, LucideIcon> = {
  bug: Bug,
  layout: LayoutTemplate,
  server: Server,
  brain: BrainCircuit,
  "git-branch": GitBranch,
  database: Database,
  shield: ShieldCheck,
  smartphone: Smartphone,
};

export function LearningTrackIcon({ name, className }: { name: LearningTrackIconName; className?: string }) {
  const Icon = icons[name];
  return <Icon aria-hidden="true" className={className} />;
}

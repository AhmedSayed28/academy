import { documentedLearningTracks } from "@/config/learning-tracks";
import { LearningTrackIcon } from "@/components/learning-track-icon";

export function PlannedTracksState() {
  return (
    <section aria-labelledby="planned-tracks-title">
      <div className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-widest text-primary">Planned content</p>
        <h2 id="planned-tracks-title" className="mt-3 text-heading-2 font-bold tracking-tight">
          Track details are being prepared.
        </h2>
        <p className="mt-4 text-lg leading-8 text-muted-foreground">
          These eight technology directions are planned for Academy. Detailed goals, skills,
          learning sequences, tools, and related courses will appear only after approval.
        </p>
      </div>
      <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {documentedLearningTracks.map((track, index) => (
          <li key={track.name}>
            <article className="flex h-full min-h-44 flex-col rounded-xl border border-dashed border-primary/30 bg-primary/5 p-5">
              <div className="flex items-start justify-between gap-4">
                <span className="grid size-11 place-items-center rounded-lg bg-surface text-primary shadow-sm">
                  <LearningTrackIcon name={track.icon} className="size-5" />
                </span>
                <span className="text-sm font-medium text-muted-foreground">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="mt-auto pt-8 text-xl font-semibold tracking-tight">{track.name}</h3>
              <p className="mt-2 text-sm text-muted-foreground">Planned learning track</p>
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
}

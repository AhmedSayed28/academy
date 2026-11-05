alter table public.leads
  add column if not exists selected_course_slug text;

alter table public.leads
  add constraint leads_selected_course_slug_approved_check
  check (
    selected_course_slug is null or selected_course_slug in (
      'istqb-foundation-level',
      'software-testing-practical',
      'front-end-development',
      'back-end-development',
      'software-testing-track',
      'full-stack-development'
    )
  );

comment on column public.leads.selected_course_slug is
  'Stable approved course or bundled registration-path slug. Null only for historical leads.';

comment on table public.leads is
  'Course registration requests captured by POST /api/leads; historical general-interest rows remain valid.';

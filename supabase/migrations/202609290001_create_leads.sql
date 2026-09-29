create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  submission_id uuid not null unique,
  full_name text not null check (char_length(full_name) between 2 and 100),
  email text not null check (char_length(email) <= 254),
  phone text check (phone is null or char_length(phone) <= 30),
  message text check (message is null or char_length(message) <= 1000),
  created_at timestamptz not null default now()
);

comment on table public.leads is
  'General-interest submissions captured by POST /api/leads.';

alter table public.leads enable row level security;

revoke all on table public.leads from anon, authenticated;

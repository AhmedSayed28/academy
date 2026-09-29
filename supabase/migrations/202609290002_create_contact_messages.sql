create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  submission_id uuid not null unique,
  full_name text not null check (char_length(full_name) between 2 and 100),
  email text not null check (char_length(email) <= 254),
  phone text check (phone is null or char_length(phone) <= 30),
  subject text not null check (char_length(subject) between 2 and 150),
  message text not null check (char_length(message) between 10 and 2000),
  created_at timestamptz not null default now()
);

comment on table public.contact_messages is
  'Contact messages captured by POST /api/contact.';

alter table public.contact_messages enable row level security;

revoke all on table public.contact_messages from anon, authenticated;

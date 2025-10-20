-- =========================================================
-- Bluecrew – Security Policies (RLS & Storage)
-- =========================================================
-- Denne filen dokumenterer og håndhever at:
--  - Tabellene public.candidates og public.leads er låst for alle klient-roller
--  - Lagringsbucket 'candidates-private' er privat og utilgjengelig fra klient
--  - Serveren (service_role) bruker Supabase Service Role Key og bypasser RLS
-- =========================================================

-- ---------------------------------------------------------
-- 0) Storage bucket: sørg for at 'candidates-private' finnes og er privat
--    (on conflict gjør at scriptet er idempotent)
-- ---------------------------------------------------------
insert into storage.buckets (id, name, public)
values ('candidates-private', 'candidates-private', false)
on conflict (id) do update set public = excluded.public;

-- ---------------------------------------------------------
-- 1) RLS for tabeller
-- ---------------------------------------------------------
-- Aktiver RLS
alter table if exists public.candidates enable row level security;
alter table if exists public.leads      enable row level security;

-- Fjern eksisterende policies (valgfritt – kommentar ut hvis du vil beholde dem)
do $$
begin
  if exists (select 1 from pg_policies where schemaname='public' and tablename='candidates') then
    execute 'drop policy if exists "allow read candidates"  on public.candidates';
    execute 'drop policy if exists "allow write candidates" on public.candidates';
    -- dropp alle policies eksplisitt
    for r in (select polname from pg_policies where schemaname='public' and tablename='candidates')
    loop
      execute format('drop policy if exists %I on public.candidates', r.polname);
    end loop;
  end if;

  if exists (select 1 from pg_policies where schemaname='public' and tablename='leads') then
    execute 'drop policy if exists "allow read leads"  on public.leads';
    execute 'drop policy if exists "allow write leads" on public.leads';
    for r in (select polname from pg_policies where schemaname='public' and tablename='leads')
    loop
      execute format('drop policy if exists %I on public.leads', r.polname);
    end loop;
  end if;
end $$;

-- Ingen policies = ingen tilgang for anon/authenticated
-- Service role (server key) bypasser RLS per Supabase sin modell.

-- (Valgfritt) Dokumenterende policy for service_role – ikke nødvendig, men tydelig:
-- create policy "service_role full access candidates" on public.candidates
--   for all to service_role using (true) with check (true);
-- create policy "service_role full access leads" on public.leads
--   for all to service_role using (true) with check (true);

-- ---------------------------------------------------------
-- 2) STORAGE: Lås ned objekter i 'candidates-private'
-- ---------------------------------------------------------
-- RLS er som regel allerede enabled på storage.objects
alter table if exists storage.objects enable row level security;

-- Fjern eventuelle gamle policies som åpner for klienttilgang
do $$
begin
  for r in (
    select polname
    from pg_policies
    where schemaname='storage' and tablename='objects'
  )
  loop
    execute format('drop policy if exists %I on storage.objects', r.polname);
  end loop;
end $$;

-- Ingen allow-policy for anon/authenticated => ingen tilgang.
-- (Valgfritt) Tydeliggjør at service_role har tilgang:
-- create policy "service_role storage full" on storage.objects
--   for all to service_role using (true) with check (true);

-- ---------------------------------------------------------
-- 3) Oppsummering / forventet bruk
-- ---------------------------------------------------------
--  - Klient (browser) skal IKKE bruke direkte Supabase row/objekt-tilgang for disse ressursene.
--  - Server (Next.js route handlers) bruker SUPABASE_SERVICE_ROLE_KEY til å:
--      * insert/select i tabeller
--      * laste opp objekter til 'candidates-private'
--      * generere signerte URLer med kort TTL for admin-bruk
-- =========================================================

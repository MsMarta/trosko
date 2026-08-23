# Troško

Aplikacija za praćenje osobnih troškova i prihoda.

## Tehnologije

- Vue 3 (Composition API, `<script setup>`)
- Vite
- Vue Router 4
- Pinia
- Bootstrap 5 + BootstrapVueNext
- Supabase (`@supabase/supabase-js` v2) - baza podataka i autentifikacija, pozvani direktno iz frontenda (bez vlastitog Node/Express servera)

## Značajke

- Prijava korisnika (email + lozinka) - registracija nije implementirana, nove korisnike ručno dodaje admin u Supabase Dashboardu
- Svaki korisnik vidi i uređuje isključivo svoje podatke (Supabase Row Level Security)
- Pregled stanja računa s filtriranjem po periodu (dan / tjedan / mjesec / sve)
- Dodavanje, uređivanje i brisanje transakcija (troškova i prihoda)
- Dodavanje i uređivanje vlastitih kategorija troškova i prihoda

## Pokretanje projekta

1. Instaliraj ovisnosti:
```
   npm install
```

2. Napravi Supabase projekt na [supabase.com](https://supabase.com), zatim kopiraj
   `.env.example` u `.env` i upiši svoje podatke (Supabase Dashboard -> Project Settings -> API):
```
   cp .env.example .env
```

3. U Supabase SQL Editoru pokreni sljedeći SQL da napraviš obje tablice
   (uključuju `user_id` od početka, zato ne postoji korak "javnog" pristupa):

```sql
   create table transakcije (
     id uuid primary key default gen_random_uuid(),
     user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
     tip text not null check (tip in ('trosak', 'prihod')),
     iznos numeric not null,
     kategorija text not null,
     opis text,
     datum date not null,
     created_at timestamp with time zone default now()
   );

   alter table transakcije enable row level security;

   create policy "Korisnik vidi samo svoje transakcije" on transakcije
     for select using (auth.uid() = user_id);
   create policy "Korisnik dodaje samo svoje transakcije" on transakcije
     for insert with check (auth.uid() = user_id);
   create policy "Korisnik azurira samo svoje transakcije" on transakcije
     for update using (auth.uid() = user_id);
   create policy "Korisnik brise samo svoje transakcije" on transakcije
     for delete using (auth.uid() = user_id);

   create table kategorije (
     id uuid primary key default gen_random_uuid(),
     user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
     tip text not null check (tip in ('trosak', 'prihod')),
     naziv text not null,
     opis text,
     created_at timestamp with time zone default now()
   );

   alter table kategorije enable row level security;

   create policy "Korisnik vidi samo svoje kategorije" on kategorije
     for select using (auth.uid() = user_id);
   create policy "Korisnik dodaje samo svoje kategorije" on kategorije
     for insert with check (auth.uid() = user_id);
   create policy "Korisnik azurira samo svoje kategorije" on kategorije
     for update using (auth.uid() = user_id);
```

   Zahvaljujući `default auth.uid()` na stupcu `user_id`, frontend kod ne mora ništa
   ručno slati kod dodavanja - baza sama upisuje ID trenutno prijavljenog korisnika.

4. Dodaj barem jednog korisnika: Supabase Dashboard -> **Authentication -> Users -> Add user**
   -> upiši email i lozinku, obavezno uključi **Auto Confirm User** (nemamo registraciju/potvrdu
   e-maila - nove korisnike ručno dodaje admin, u skladu s dizajnom prototipa).

5. Pokreni razvojni server:
```
   npm run dev
```

## Struktura projekta

```
src/
├── main.js                # ulazna tocka - Pinia, Router, BootstrapVueNext, ceka auth.init() prije mounta
├── App.vue                 # layout: sidebar (skriven na /prijava) + router-view
├── router/index.js         # rute + guard koji preusmjerava neprijavljene na /prijava
├── store/
│   ├── auth.js             # Pinia store - prijava/odjava, trenutni korisnik
│   ├── transakcije.js      # Pinia store - transakcije, filtriranje po periodu, pozivi na Supabase
│   └── kategorije.js       # Pinia store - kategorije troskova/prihoda, pozivi na Supabase
├── supabase/client.js      # inicijalizacija Supabase klijenta
├── components/
│   ├── AppSidebar.vue         # bocni izbornik + email korisnika + odjava
│   ├── BalanceOverview.vue    # tabovi DAN/TJEDAN/MJESEC/SVE + stanje racuna
│   ├── TransactionForm.vue    # forma za dodavanje troska/prihoda (kategorija je dropdown)
│   ├── TransactionList.vue    # popis transakcija - uredivanje i brisanje
│   ├── CategoryForm.vue       # forma za dodavanje nove kategorije (prop: tip)
│   └── CategoryList.vue       # popis postojecih kategorija s uredivanjem (prop: tip)
└── views/
    ├── Prijava.vue                 # stranica za prijavu (email + lozinka)
    ├── Pregled.vue                 # glavna stranica (spaja gornje komponente)
    ├── KategorijeTroskova.vue      # CategoryForm + CategoryList za tip="trosak"
    └── KategorijePrihoda.vue       # CategoryForm + CategoryList za tip="prihod"
```

## Napomena

Registracija nije implementirana - nove korisnike ručno dodaje admin u Supabase Dashboardu
(korak 4 iznad), u skladu s dizajnom prototipa ("još nisi korisnik? Javi nam se putem e-maila").
# Troško

Aplikacija za praćenje osobnih troškova i prihoda.

## Tehnologije

- Vue 3 (Composition API, `<script setup>`)
- Vite
- Vue Router 4
- Pinia
- Bootstrap 5 + BootstrapVueNext
- Supabase (`@supabase/supabase-js` v2) - baza podataka, pozvana direktno iz frontenda

## Pokretanje projekta

1. Instaliraj ovisnosti:
   ```
   npm install
   ```

2. Kopiraj `.env.example` u `.env` i upiši svoje Supabase podatke
   (Supabase Dashboard -> Project Settings -> API):
   ```
   cp .env.example .env
   ```

3. U Supabase projektu (SQL Editor) pokreni sljedeći SQL da napraviš tablicu:

   ```sql
   create table transakcije (
     id uuid primary key default gen_random_uuid(),
     tip text not null check (tip in ('trosak', 'prihod')),
     iznos numeric not null,
     kategorija text not null,
     opis text,
     datum date not null,
     created_at timestamp with time zone default now()
   );

   alter table transakcije enable row level security;

   create policy "Javni pristup za citanje" on transakcije
     for select using (true);

   create policy "Javni pristup za pisanje" on transakcije
     for insert with check (true);
   ```

4. Pokreni razvojni server:
   ```
   npm run dev
   ```

## Struktura projekta

```
src/
├── main.js               # ulazna tocka, registracija Pinia, Router, BootstrapVueNext
├── App.vue                # layout: sidebar + router-view
├── router/index.js        # 3 rute: Pregled, Kategorije troskova, Kategorije prihoda
├── store/transakcije.js   # Pinia store - transakcije, filtriranje po periodu, pozivi na Supabase
├── supabase/client.js     # inicijalizacija Supabase klijenta
├── components/
│   ├── AppSidebar.vue        # bocni izbornik
│   ├── BalanceOverview.vue   # tabovi DAN/TJEDAN/MJESEC/SVE + stanje racuna
│   ├── TransactionForm.vue   # forma za dodavanje troska/prihoda
│   └── TransactionList.vue   # popis transakcija za odabrani period
└── views/
    ├── Pregled.vue                # glavna stranica (spaja gornje komponente)
    ├── KategorijeTroskova.vue     # placeholder, dolazi naknadno
    └── KategorijePrihoda.vue      # placeholder, dolazi naknadno
```

## Napomena

Prijava/registracija i stvarno upravljanje kategorijama (umjesto slobodnog teksta u formi)
namjerno nisu implementirani - dolaze u sljedecoj fazi projekta.


# Troško

Aplikacija za praćenje osobnih troškova i prihoda.

**Autorica:** Marta Kralj

<p align="center">
  <img src="./src/assets/fipu-logo.png" alt="Fakultet informatike u Puli" width="180">
</p>

**[Fakultet informatike u Puli (FIPU)](https://fipu.unipu.hr/)**
**Kolegij:** [Programsko inženjerstvo](http://ntankovic.unipu.hr/pi)
**Mentor:** [doc. dr. sc. Nikola Tanković](http://ntankovic.unipu.hr/)

## Opis funkcionalnosti

Troško je web aplikacija za praćenje osobnih financija. Korisnik se prijavljuje na svoj račun,
zatim dodaje troškove i prihode uz odabir kategorije, opisa i datuma. Aplikacija prikazuje
stanje računa (ukupni prihodi minus troškovi) s mogućnošću filtriranja po periodu (dan, tjedan,
mjesec, sve), a korisnik može uređivati i brisati postojeće transakcije te upravljati vlastitim
kategorijama troškova i prihoda. Svaki korisnik vidi i uređuje isključivo svoje podatke.

## Prototip

Javni Figma prototip: [Troško - Figma](https://www.figma.com/design/FV1g1IlWitrGvsnXptKeZQ/Tro%C5%A1ko?node-id=0-1&t=8PaeGgieEgCx84jP-1)

## Zaduženja po članu tima

**Marta Kralj:**
- [ ] Postavljanje projekta (Vue 3 + Vite + Pinia + Supabase)
- [ ] Prijava korisnika (Supabase Auth)
- [ ] Pregled stanja računa i filtriranje po periodu
- [ ] Dodavanje, uređivanje i brisanje transakcija
- [ ] Dodavanje, uređivanje i brisanje kategorija
- [ ] Row Level Security - odvajanje podataka po korisniku

## Tehnologije

- Vue 3 (Composition API, `<script setup>`)
- Vite
- Vue Router 4
- Pinia
- Bootstrap 5 + BootstrapVueNext
- Supabase - baza podataka i autentifikacija


## Napomena

Registracija nije implementirana - nove korisnike ručno dodaje admin u Supabase Dashboardu  u skladu s dizajnom prototipa ("još nisi korisnik? Javi nam se putem e-maila").
<template>
  <div class="balance-card">
    <div class="period-tabs">
      <button
        v-for="opcija in periodi"
        :key="opcija.vrijednost"
        type="button"
        class="period-tab"
        :class="{ 'period-tab--active': store.period === opcija.vrijednost }"
        @click="store.postaviPeriod(opcija.vrijednost)"
      >
        {{ opcija.naziv }}
      </button>
    </div>

    <p class="balance-label">Stanje računa</p>
    <p class="balance-amount">{{ store.stanjeRacuna.toFixed(0) }}€</p>

    <div class="balance-sub">
      <span class="balance-sub__label">Prihod</span>
      <span class="balance-sub__label balance-sub__label--right">Troškovi</span>
    </div>
    <div class="balance-sub">
      <span class="balance-sub__value balance-sub__value--pozitivno">+{{ store.ukupniPrihodi.toFixed(0) }}€</span>
      <span class="balance-sub__value balance-sub__value--negativno">-{{ store.ukupniTroskovi.toFixed(0) }}€</span>
    </div>
  </div>
</template>

<script setup>
import { useTransakcijeStore } from '@/store/transakcije'

const store = useTransakcijeStore()

const periodi = [
  { naziv: 'DAN', vrijednost: 'dan' },
  { naziv: 'TJEDAN', vrijednost: 'tjedan' },
  { naziv: 'MJESEC', vrijednost: 'mjesec' },
  { naziv: 'SVE', vrijednost: 'sve' }
]
</script>

<style scoped>
.balance-card {
  background-color: #ffffff;
  border: 1px solid #e5e5e8;
  border-radius: 10px;
  padding: 20px 24px;
  margin-bottom: 20px;
}

.period-tabs {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
}

.period-tab {
  background: none;
  border: none;
  padding: 0 0 6px 0;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.03em;
  color: #a6a6ab;
  cursor: pointer;
}

.period-tab--active {
  color: #2f2f33;
  border-bottom: 2px solid #3d4bf5;
}

.balance-label {
  font-size: 12px;
  color: #a6a6ab;
  margin-bottom: 4px;
}

.balance-amount {
  font-size: 36px;
  font-weight: 700;
  color: #2f2f33;
  margin-bottom: 12px;
}

.balance-sub {
  display: flex;
  justify-content: space-between;
  max-width: 140px;
}

.balance-sub__label {
  font-size: 11px;
  color: #a6a6ab;
}

.balance-sub__value {
  font-size: 13px;
  font-weight: 600;
}

.balance-sub__value--pozitivno {
  color: #1fa06a;
}

.balance-sub__value--negativno {
  color: #e0403f;
}
</style>

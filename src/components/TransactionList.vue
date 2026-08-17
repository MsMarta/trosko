<template>
  <div class="list-card">
    <p class="list-title">Transakcije - {{ store.period }}</p>

    <p v-if="store.ucitavanje" class="list-empty">Učitavanje...</p>
    <p v-else-if="store.transakcijeZaPeriod.length === 0" class="list-empty">
      Nema transakcija za odabrano razdoblje.
    </p>

    <ul v-else class="list-items">
      <li v-for="t in store.transakcijeZaPeriod" :key="t.id" class="list-item">
        <div>
          <p class="list-item__kategorija">{{ t.kategorija }}</p>
          <p class="list-item__datum">({{ formatDatum(t.datum) }})</p>
        </div>
        <span
          class="list-item__iznos"
          :class="t.tip === 'prihod' ? 'list-item__iznos--pozitivno' : 'list-item__iznos--negativno'"
        >
          {{ t.tip === 'prihod' ? '+' : '-' }}{{ Number(t.iznos).toFixed(0) }}€
        </span>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { useTransakcijeStore } from '@/store/transakcije'

const store = useTransakcijeStore()

function formatDatum (datum) {
  const d = new Date(datum)
  return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`
}
</script>

<style scoped>
.list-card {
  background-color: #ffffff;
  border: 1px solid #e5e5e8;
  border-radius: 10px;
  padding: 18px 20px;
}

.list-title {
  font-size: 13px;
  font-weight: 600;
  color: #2f2f33;
  margin-bottom: 12px;
}

.list-empty {
  font-size: 13px;
  color: #a6a6ab;
}

.list-items {
  list-style: none;
  margin: 0;
  padding: 0;
}

.list-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid #f0f0f2;
}

.list-item:last-child {
  border-bottom: none;
}

.list-item__kategorija {
  font-size: 13px;
  font-weight: 600;
  color: #2f2f33;
  margin: 0;
}

.list-item__datum {
  font-size: 11px;
  color: #a6a6ab;
  margin: 0;
}

.list-item__iznos {
  font-size: 13px;
  font-weight: 700;
}

.list-item__iznos--pozitivno {
  color: #1fa06a;
}

.list-item__iznos--negativno {
  color: #e0403f;
}
</style>

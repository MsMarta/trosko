<template>
  <div class="form-card">
    <div class="form-tabs">
      <button
        type="button"
        class="form-tab"
        :class="{ 'form-tab--active': tip === 'trosak' }"
        @click="tip = 'trosak'"
      >
        TROŠAK
      </button>
      <button
        type="button"
        class="form-tab"
        :class="{ 'form-tab--active': tip === 'prihod' }"
        @click="tip = 'prihod'"
      >
        PRIHOD
      </button>
    </div>

    <form @submit.prevent="posaljiFormu">
      <input
        v-model="iznos"
        type="number"
        step="0.01"
        min="0"
        class="form-input"
        placeholder="10,00€"
        required
      >

      <!-- TODO: kad kategorije budu gotove (Supabase tablica "kategorije"),
           ovo polje zamijeniti s <select> koji dohvaća kategorije prema tipu -->
      <input
        v-model="kategorija"
        type="text"
        class="form-input"
        placeholder="HRANA"
        required
      >

      <input
        v-model="opis"
        type="text"
        class="form-input"
        placeholder="OPIS"
      >

      <input
        v-model="datum"
        type="date"
        class="form-input"
        required
      >

      <button type="submit" class="form-submit" :disabled="store.ucitavanje">
        DODAJ {{ tip === 'trosak' ? 'TROŠAK' : 'PRIHOD' }}
      </button>

      <p v-if="store.greska" class="form-error">{{ store.greska }}</p>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useTransakcijeStore } from '@/store/transakcije'

const store = useTransakcijeStore()

function danasnjiDatum () {
  return new Date().toISOString().slice(0, 10)
}

const tip = ref('trosak')
const iznos = ref('')
const kategorija = ref('')
const opis = ref('')
const datum = ref(danasnjiDatum())

async function posaljiFormu () {
  const rezultat = await store.dodajTransakciju({
    tip: tip.value,
    iznos: Number(iznos.value),
    kategorija: kategorija.value.toUpperCase(),
    opis: opis.value,
    datum: datum.value
  })

  if (rezultat.uspjeh) {
    iznos.value = ''
    kategorija.value = ''
    opis.value = ''
    datum.value = danasnjiDatum()
  }
}
</script>

<style scoped>
.form-card {
  background-color: #ffffff;
  border: 1px solid #e5e5e8;
  border-radius: 10px;
  padding: 18px 20px;
}

.form-tabs {
  display: flex;
  gap: 16px;
  margin-bottom: 16px;
}

.form-tab {
  background: none;
  border: none;
  padding: 0 0 6px 0;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.03em;
  color: #a6a6ab;
  cursor: pointer;
}

.form-tab--active {
  color: #2f2f33;
  border-bottom: 2px solid #3d4bf5;
}

.form-input {
  display: block;
  width: 100%;
  background-color: #f5f5f7;
  border: 1px solid #e5e5e8;
  border-radius: 6px;
  padding: 10px 12px;
  font-size: 13px;
  color: #2f2f33;
  margin-bottom: 10px;
}

.form-input::placeholder {
  color: #a6a6ab;
}

.form-submit {
  width: 100%;
  background-color: #3d4bf5;
  color: #ffffff;
  border: none;
  border-radius: 6px;
  padding: 10px 12px;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.03em;
  cursor: pointer;
}

.form-submit:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.form-error {
  color: #e0403f;
  font-size: 12px;
  margin-top: 8px;
}
</style>

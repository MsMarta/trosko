<template>
  <div class="form-card">
    <p class="form-title">Dodaj kategoriju {{ tip === 'trosak' ? 'troška' : 'prihoda' }}</p>

    <form @submit.prevent="posaljiFormu">
      <input
        v-model="naziv"
        type="text"
        class="form-input"
        placeholder="NAZIV"
        required
      >

      <input
        v-model="opis"
        type="text"
        class="form-input"
        placeholder="OPIS"
      >

      <button type="submit" class="form-submit" :disabled="store.ucitavanje">
        DODAJ KATEGORIJU
      </button>

      <p v-if="store.greska" class="form-error">{{ store.greska }}</p>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useKategorijeStore } from '@/store/kategorije'

const props = defineProps({
  tip: {
    type: String,
    required: true
  }
})

const store = useKategorijeStore()

const naziv = ref('')
const opis = ref('')

async function posaljiFormu () {
  const rezultat = await store.dodajKategoriju({
    tip: props.tip,
    naziv: naziv.value.toUpperCase(),
    opis: opis.value
  })

  if (rezultat.uspjeh) {
    naziv.value = ''
    opis.value = ''
  }
}
</script>

<style scoped>
.form-card {
  background-color: #ffffff;
  border: 1px solid #e5e5e8;
  border-radius: 10px;
  padding: 18px 20px;
  margin-bottom: 20px;
  max-width: 320px;
}

.form-title {
  font-size: 12px;
  font-weight: 600;
  color: #a6a6ab;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  margin-bottom: 14px;
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
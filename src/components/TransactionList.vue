<template>
  <div class="list-card">
    <p class="list-title">Transakcije - {{ store.period }}</p>

    <p v-if="store.ucitavanje" class="list-empty">Učitavanje...</p>
    <p v-else-if="store.transakcijeZaPeriod.length === 0" class="list-empty">
      Nema transakcija za odabrano razdoblje.
    </p>

    <ul v-else class="list-items">
      <li v-for="t in store.transakcijeZaPeriod" :key="t.id" class="list-item">
        <template v-if="uredivanjeId === t.id">
          <div class="edit-row">
            <input v-model="izmjenaIznosa" type="number" step="0.01" min="0" class="edit-input edit-input--mali">
            <select v-model="izmjenaKategorije" class="edit-input">
              <option
                v-for="k in (t.tip === 'trosak' ? kategorijeStore.kategorijeTroskova : kategorijeStore.kategorijePrihoda)"
                :key="k.id"
                :value="k.naziv"
              >
                {{ k.naziv }}
              </option>
            </select>
            <input v-model="izmjenaOpisa" type="text" class="edit-input" placeholder="OPIS">
            <input v-model="izmjenaDatuma" type="date" class="edit-input">
          </div>
          <div class="edit-actions">
            <button type="button" class="edit-save" @click="spremiIzmjenu(t.id)">SPREMI</button>
            <button type="button" class="edit-cancel" @click="uredivanjeId = null">ODUSTANI</button>
          </div>
        </template>

        <template v-else>
          <div>
            <p class="list-item__kategorija">{{ t.kategorija }}</p>
            <p class="list-item__datum">({{ formatDatum(t.datum) }})</p>
          </div>
          <div class="list-item__desno">
            <span
              class="list-item__iznos"
              :class="t.tip === 'prihod' ? 'list-item__iznos--pozitivno' : 'list-item__iznos--negativno'"
            >
              {{ t.tip === 'prihod' ? '+' : '-' }}{{ Number(t.iznos).toFixed(0) }}€
            </span>
            <button type="button" class="list-item__akcija" @click="pokreniUredivanje(t)">UREDI</button>
            <button type="button" class="list-item__akcija list-item__akcija--obrisi" @click="obrisi(t.id)">OBRIŠI</button>
          </div>
        </template>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useTransakcijeStore } from '@/store/transakcije'
import { useKategorijeStore } from '@/store/kategorije'

const store = useTransakcijeStore()
const kategorijeStore = useKategorijeStore()

const uredivanjeId = ref(null)
const izmjenaIznosa = ref('')
const izmjenaKategorije = ref('')
const izmjenaOpisa = ref('')
const izmjenaDatuma = ref('')

function formatDatum (datum) {
  const d = new Date(datum)
  return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`
}

function pokreniUredivanje (t) {
  uredivanjeId.value = t.id
  izmjenaIznosa.value = t.iznos
  izmjenaKategorije.value = t.kategorija
  izmjenaOpisa.value = t.opis || ''
  izmjenaDatuma.value = t.datum
}

async function spremiIzmjenu (id) {
  const rezultat = await store.azurirajTransakciju(id, {
    iznos: Number(izmjenaIznosa.value),
    kategorija: izmjenaKategorije.value,
    opis: izmjenaOpisa.value,
    datum: izmjenaDatuma.value
  })

  if (rezultat.uspjeh) {
    uredivanjeId.value = null
  }
}

async function obrisi (id) {
  const potvrdeno = window.confirm('Sigurno želiš obrisati ovu transakciju?')
  if (potvrdeno) {
    await store.obrisiTransakciju(id)
  }
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
  gap: 12px;
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

.list-item__desno {
  display: flex;
  align-items: center;
  gap: 10px;
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

.list-item__akcija {
  background: none;
  border: none;
  padding: 0;
  font-size: 11px;
  font-weight: 600;
  color: #3d4bf5;
  cursor: pointer;
}

.list-item__akcija--obrisi {
  color: #e0403f;
}

.edit-row {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  flex: 1;
}

.edit-input {
  background-color: #f5f5f7;
  border: 1px solid #e5e5e8;
  border-radius: 6px;
  padding: 6px 8px;
  font-size: 12px;
  color: #2f2f33;
}

.edit-input--mali {
  width: 80px;
}

.edit-actions {
  display: flex;
  gap: 8px;
  margin-left: 12px;
}

.edit-save {
  background-color: #3d4bf5;
  color: #ffffff;
  border: none;
  border-radius: 6px;
  padding: 6px 10px;
  font-size: 11px;
  font-weight: 700;
  cursor: pointer;
}

.edit-cancel {
  background: none;
  border: 1px solid #e5e5e8;
  border-radius: 6px;
  padding: 6px 10px;
  font-size: 11px;
  font-weight: 600;
  color: #6b6b70;
  cursor: pointer;
}
</style>
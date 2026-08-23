<template>
  <div>
    <p class="list-title">Postojeće kategorije {{ tip === 'trosak' ? 'troškova' : 'prihoda' }}</p>

    <p v-if="store.ucitavanje" class="list-empty">Učitavanje...</p>
    <p v-else-if="kategorije.length === 0" class="list-empty">
      Još nema dodanih kategorija.
    </p>

    <div v-else class="category-grid">
      <div v-for="kategorija in kategorije" :key="kategorija.id" class="category-card">
        <template v-if="uredivanjeId === kategorija.id">
          <input v-model="izmjenaNaziva" type="text" class="edit-input" placeholder="NAZIV">
          <input v-model="izmjenaOpisa" type="text" class="edit-input" placeholder="OPIS">
          <div class="edit-actions">
            <button type="button" class="edit-save" @click="spremiIzmjenu(kategorija.id)">SPREMI</button>
            <button type="button" class="edit-cancel" @click="uredivanjeId = null">ODUSTANI</button>
          </div>
        </template>
        <template v-else>
          <p class="category-name">{{ kategorija.naziv }}</p>
          <p v-if="kategorija.opis" class="category-opis">{{ kategorija.opis }}</p>
          <button type="button" class="category-edit" @click="pokreniUredivanje(kategorija)">
            UREDI
          </button>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useKategorijeStore } from '@/store/kategorije'

const props = defineProps({
  tip: {
    type: String,
    required: true
  }
})

const store = useKategorijeStore()

const kategorije = computed(() =>
  props.tip === 'trosak' ? store.kategorijeTroskova : store.kategorijePrihoda
)

const uredivanjeId = ref(null)
const izmjenaNaziva = ref('')
const izmjenaOpisa = ref('')

function pokreniUredivanje (kategorija) {
  uredivanjeId.value = kategorija.id
  izmjenaNaziva.value = kategorija.naziv
  izmjenaOpisa.value = kategorija.opis || ''
}

async function spremiIzmjenu (id) {
  const rezultat = await store.azurirajKategoriju(id, {
    naziv: izmjenaNaziva.value.toUpperCase(),
    opis: izmjenaOpisa.value
  })

  if (rezultat.uspjeh) {
    uredivanjeId.value = null
  }
}
</script>

<style scoped>
.list-title {
  font-size: 12px;
  font-weight: 600;
  color: #a6a6ab;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  margin-bottom: 14px;
}

.list-empty {
  font-size: 13px;
  color: #a6a6ab;
}

.category-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
}

.category-card {
  background-color: #ffffff;
  border: 1px solid #e5e5e8;
  border-radius: 10px;
  padding: 14px 18px;
  min-width: 200px;
}

.category-name {
  font-size: 14px;
  font-weight: 700;
  color: #2f2f33;
  margin: 0 0 4px 0;
}

.category-opis {
  font-size: 12px;
  color: #a6a6ab;
  margin: 0 0 8px 0;
}

.category-edit {
  background: none;
  border: none;
  padding: 0;
  font-size: 11px;
  font-weight: 600;
  color: #3d4bf5;
  cursor: pointer;
}

.edit-input {
  display: block;
  width: 100%;
  background-color: #f5f5f7;
  border: 1px solid #e5e5e8;
  border-radius: 6px;
  padding: 8px 10px;
  font-size: 13px;
  color: #2f2f33;
  margin-bottom: 8px;
}

.edit-actions {
  display: flex;
  gap: 8px;
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
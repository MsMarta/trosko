import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { supabase } from '@/supabase/client'

const TABLE = 'kategorije'

export const useKategorijeStore = defineStore('kategorije', () => {
  const kategorije = ref([])
  const ucitavanje = ref(false)
  const greska = ref(null)

  const kategorijeTroskova = computed(() =>
    kategorije.value.filter((k) => k.tip === 'trosak')
  )

  const kategorijePrihoda = computed(() =>
    kategorije.value.filter((k) => k.tip === 'prihod')
  )

  async function dohvatiKategorije () {
    ucitavanje.value = true
    greska.value = null

    const { data, error } = await supabase
      .from(TABLE)
      .select('*')
      .order('naziv', { ascending: true })

    if (error) {
      greska.value = error.message
    } else {
      kategorije.value = data
    }

    ucitavanje.value = false
  }

  async function dodajKategoriju (novaKategorija) {
    greska.value = null

    const { data, error } = await supabase
      .from(TABLE)
      .insert([novaKategorija])
      .select()

    if (error) {
      greska.value = error.message
      return { uspjeh: false, error }
    }

    kategorije.value.push(data[0])
    return { uspjeh: true }
  }

  async function azurirajKategoriju (id, izmjene) {
    greska.value = null

    const { data, error } = await supabase
      .from(TABLE)
      .update(izmjene)
      .eq('id', id)
      .select()

    if (error) {
      greska.value = error.message
      return { uspjeh: false, error }
    }

    const indeks = kategorije.value.findIndex((k) => k.id === id)
    if (indeks !== -1) {
      kategorije.value[indeks] = data[0]
    }
    return { uspjeh: true }
  }

  async function obrisiKategoriju (id) {
  greska.value = null

  const { error } = await supabase
    .from(TABLE)
    .delete()
    .eq('id', id)

  if (error) {
    greska.value = error.message
    return { uspjeh: false, error }
  }

  kategorije.value = kategorije.value.filter((k) => k.id !== id)
  return { uspjeh: true }
}

  return {
    kategorije,
    ucitavanje,
    greska,
    kategorijeTroskova,
    kategorijePrihoda,
    dohvatiKategorije,
    dodajKategoriju,
    azurirajKategoriju,
    obrisiKategoriju
  }
})
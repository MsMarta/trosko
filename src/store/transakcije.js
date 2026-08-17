import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { supabase } from '@/supabase/client'

// Naziv tablice u Supabase bazi.
// Struktura tablice "transakcije" (SQL, vidi README.md):
//   id          uuid, primary key
//   tip         text   -> 'trosak' ili 'prihod'
//   iznos       numeric
//   kategorija  text
//   opis        text
//   datum       date
//   created_at  timestamp, default now()
const TABLE = 'transakcije'

export const useTransakcijeStore = defineStore('transakcije', () => {
  const transakcije = ref([])
  const ucitavanje = ref(false)
  const greska = ref(null)
  const period = ref('sve') // 'dan' | 'tjedan' | 'mjesec' | 'sve'

  const transakcijeZaPeriod = computed(() => {
    const danas = new Date()
    danas.setHours(0, 0, 0, 0)

    return transakcije.value.filter((t) => {
      if (period.value === 'sve') return true

      const datumTransakcije = new Date(t.datum)
      datumTransakcije.setHours(0, 0, 0, 0)
      const razlikaDana = (danas - datumTransakcije) / (1000 * 60 * 60 * 24)

      if (period.value === 'dan') return razlikaDana === 0
      if (period.value === 'tjedan') return razlikaDana >= 0 && razlikaDana < 7
      if (period.value === 'mjesec') return razlikaDana >= 0 && razlikaDana < 31

      return true
    })
  })

  const ukupniPrihodi = computed(() =>
    transakcijeZaPeriod.value
      .filter((t) => t.tip === 'prihod')
      .reduce((zbroj, t) => zbroj + Number(t.iznos), 0)
  )

  const ukupniTroskovi = computed(() =>
    transakcijeZaPeriod.value
      .filter((t) => t.tip === 'trosak')
      .reduce((zbroj, t) => zbroj + Number(t.iznos), 0)
  )

  const stanjeRacuna = computed(() => ukupniPrihodi.value - ukupniTroskovi.value)

  async function dohvatiTransakcije () {
    ucitavanje.value = true
    greska.value = null

    const { data, error } = await supabase
      .from(TABLE)
      .select('*')
      .order('datum', { ascending: false })

    if (error) {
      greska.value = error.message
    } else {
      transakcije.value = data
    }

    ucitavanje.value = false
  }

  async function dodajTransakciju (novaTransakcija) {
    greska.value = null

    const { data, error } = await supabase
      .from(TABLE)
      .insert([novaTransakcija])
      .select()

    if (error) {
      greska.value = error.message
      return { uspjeh: false, error }
    }

    transakcije.value.unshift(data[0])
    return { uspjeh: true }
  }

  function postaviPeriod (novaVrijednost) {
    period.value = novaVrijednost
  }

  return {
    transakcije,
    ucitavanje,
    greska,
    period,
    transakcijeZaPeriod,
    ukupniPrihodi,
    ukupniTroskovi,
    stanjeRacuna,
    dohvatiTransakcije,
    dodajTransakciju,
    postaviPeriod
  }
})

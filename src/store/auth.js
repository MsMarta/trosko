import { defineStore } from 'pinia'
import { ref } from 'vue'
import { supabase } from '@/supabase/client'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const ucitavanje = ref(false)
  const greska = ref(null)

  async function init () {
    const { data } = await supabase.auth.getSession()
    user.value = data.session?.user || null

    supabase.auth.onAuthStateChange((_dogadaj, session) => {
      user.value = session?.user || null
    })
  }

  async function prijava (email, lozinka) {
    ucitavanje.value = true
    greska.value = null

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password: lozinka
    })

    ucitavanje.value = false

    if (error) {
      greska.value = 'Pogrešan e-mail ili lozinka.'
      return { uspjeh: false }
    }

    user.value = data.user
    return { uspjeh: true }
  }

  async function odjava () {
    await supabase.auth.signOut()
    user.value = null
  }

  return { user, ucitavanje, greska, init, prijava, odjava }
})
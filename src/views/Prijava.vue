<template>
  <div class="prijava-wrapper">
    <div class="prijava-card">
      <p class="prijava-naslov">PRIJAVA U TROŠKO APLIKACIJU</p>

      <form @submit.prevent="posaljiFormu">
        <input
          v-model="email"
          type="email"
          class="prijava-input"
          placeholder="tvoj@email.com"
          required
        >
        <input
          v-model="lozinka"
          type="password"
          class="prijava-input"
          placeholder="Lozinka"
          required
        >

        <button type="submit" class="prijava-submit" :disabled="store.ucitavanje">
          PRIJAVI SE
        </button>

        <p v-if="store.greska" class="prijava-error">{{ store.greska }}</p>
      </form>

      <p class="prijava-napomena">
        *još nisi korisnik? Javi nam se putem e-maila<br>
        <a href="mailto:info@trosko.hr">info@trosko.hr</a>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/store/auth'

const store = useAuthStore()
const router = useRouter()

const email = ref('')
const lozinka = ref('')

async function posaljiFormu () {
  const rezultat = await store.prijava(email.value, lozinka.value)
  if (rezultat.uspjeh) {
    router.push('/')
  }
}
</script>

<style scoped>
.prijava-wrapper {
  min-height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5f5f7;
}

.prijava-card {
  background-color: #ffffff;
  border: 1px solid #e5e5e8;
  border-radius: 10px;
  padding: 24px 28px;
  width: 280px;
}

.prijava-naslov {
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.03em;
  color: #2f2f33;
  text-align: center;
  margin-bottom: 16px;
}

.prijava-input {
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

.prijava-submit {
  width: 100%;
  background-color: #f5f5f7;
  border: 1px solid #e5e5e8;
  color: #2f2f33;
  border-radius: 6px;
  padding: 10px 12px;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.03em;
  cursor: pointer;
  margin-bottom: 12px;
}

.prijava-submit:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.prijava-error {
  color: #e0403f;
  font-size: 12px;
  margin-bottom: 8px;
}

.prijava-napomena {
  font-size: 11px;
  color: #6b6b70;
  margin: 0;
  line-height: 1.5;
}

.prijava-napomena a {
  color: #3d4bf5;
}
</style>
<template>
  <aside class="sidebar">
    <div>
      <h1 class="sidebar-logo">Troško</h1>

      <nav class="sidebar-nav">
        <router-link to="/" class="sidebar-link" exact-active-class="sidebar-link--active">
          Pregled
        </router-link>
        <router-link to="/kategorije-troskova" class="sidebar-link" active-class="sidebar-link--active">
          Kategorije troškova
        </router-link>
        <router-link to="/kategorije-prihoda" class="sidebar-link" active-class="sidebar-link--active">
          Kategorije prihoda
        </router-link>
      </nav>
    </div>

    <div class="sidebar-footer">
      <p class="sidebar-user">{{ authStore.user?.email }}</p>
      <button type="button" class="sidebar-logout" @click="odjava">ODJAVA</button>
    </div>
  </aside>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/store/auth'

const authStore = useAuthStore()
const router = useRouter()

async function odjava () {
  await authStore.odjava()
  router.push('/prijava')
}
</script>

<style scoped>
.sidebar {
  width: 220px;
  flex-shrink: 0;
  background-color: #ffffff;
  border-right: 1px solid #e5e5e8;
  padding: 24px 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.sidebar-logo {
  font-size: 20px;
  font-weight: 600;
  color: #2f2f33;
  margin-bottom: 24px;
}

.sidebar-nav {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.sidebar-link {
  display: block;
  padding: 8px 10px;
  border-radius: 6px;
  color: #6b6b70;
  text-decoration: none;
  font-size: 14px;
}

.sidebar-link:hover {
  background-color: #f0f0f2;
  color: #2f2f33;
  text-decoration: none;
}

.sidebar-link--active {
  background-color: #eef2ff;
  color: #3d4bf5;
  font-weight: 600;
}

.sidebar-footer {
  border-top: 1px solid #e5e5e8;
  padding-top: 14px;
}

.sidebar-user {
  font-size: 11px;
  color: #a6a6ab;
  margin: 0 0 8px 0;
  word-break: break-all;
}

.sidebar-logout {
  background: none;
  border: none;
  padding: 0;
  font-size: 12px;
  font-weight: 600;
  color: #e0403f;
  cursor: pointer;
}
</style>
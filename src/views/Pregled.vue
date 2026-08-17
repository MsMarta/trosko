<template>
  <div class="pregled">
    <h2 class="pregled-naslov">Pregled-{{ store.period }}-trošak</h2>

    <BalanceOverview />

    <div class="pregled-grid">
      <TransactionForm />
      <TransactionList />
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useTransakcijeStore } from '@/store/transakcije'
import BalanceOverview from '@/components/BalanceOverview.vue'
import TransactionForm from '@/components/TransactionForm.vue'
import TransactionList from '@/components/TransactionList.vue'

const store = useTransakcijeStore()

onMounted(() => {
  store.dohvatiTransakcije()
})
</script>

<style scoped>
.pregled-naslov {
  font-size: 22px;
  font-weight: 500;
  color: #c7c7cc;
  margin-bottom: 20px;
}

.pregled-grid {
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 20px;
}
</style>

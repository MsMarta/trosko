<template>
  <div class="pregled">

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
.pregled-grid {
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 20px;
}
</style>

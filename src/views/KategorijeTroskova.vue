<template>
  <div>
    <h2 class="naslov">Kategorije troškova</h2>
    <CategoryForm tip="trosak" />
    <CategoryList tip="trosak" />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useKategorijeStore } from '@/store/kategorije'
import CategoryForm from '@/components/CategoryForm.vue'
import CategoryList from '@/components/CategoryList.vue'

const store = useKategorijeStore()

onMounted(() => {
  store.dohvatiKategorije()
})
</script>

<style scoped>
.naslov {
  font-size: 22px;
  font-weight: 500;
  color: #2f2f33;
  margin-bottom: 20px;
}
</style>
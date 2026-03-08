<template>
  <div class="price-filter border-bottom">
    <h3 class="title-small">Price</h3>
    <Input
      :min="priceRange.minPrice"
      :max="priceRange.maxPrice"
      :gap="10"
      @update-range="(range) => $emit('update-price', range)"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Input from "../ui/Input.vue";
import { fetchPriceRange } from "@/services/api";

defineEmits(["update-price"]);

const priceRange = ref({ minPrice: 0, maxPrice: 5998 });

onMounted(async () => {
  const { data, error } = await fetchPriceRange();
  if (error) return;
  priceRange.value = {
    minPrice: Math.floor(data.minPrice),
    maxPrice: Math.ceil(data.maxPrice),
  };
});
</script>

<style scoped>
.price-filter {
  padding: 20px 0;
}
</style>

<template>
  <div class="select-cont border-bottom">
    <Select v-model="selectedSort" :options="orderOptions" />
    <Select v-model="selectedHits" :options="hitsOptions" />
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import Select from "./ui/Select.vue";

const emit = defineEmits(["sort-updated"]);

const selectedSort = ref("relevance");
const selectedHits = ref(12);

const orderOptions = [
  { label: "Relevance", value: "relevance" },
  { label: "Price: Low to High", value: "price_asc" },
  { label: "Price: High to Low", value: "price_desc" },
];

const hitsOptions = [
  { label: "12 per page", value: 12 },
  { label: "24 per page", value: 24 },
  { label: "32 per page", value: 32 },
];

watch([selectedSort, selectedHits], () => {
  emit("sort-updated", {
    sort: selectedSort.value,
    hits: selectedHits.value,
  });
});
</script>

<style scoped>
.select-cont {
  width: 1000px;
  height: 75px;
  margin-top: 25px;
  display: flex;
  justify-content: right;
}

.custom-select:first-child {
  margin-right: 20px;
}

@media (max-width: 1400px) {
  .select-cont {
    width: 800px;
  }
}

@media (max-width: 850px) {
  .select-cont {
    width: 90%;
    margin: auto;
  }
}
</style>

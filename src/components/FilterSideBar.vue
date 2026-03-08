<template>
  <aside class="active">
    <div class="filters-btn" @click="toggleFilters"><FiltersBtn /></div>
    <h2 class="aside-h2 border-bottom title">
      Filters
      <span @click="clearFilters" style="cursor: pointer">⟳ Clear filters</span>
    </h2>
    <PriceFilter
      :key="`price-${resetKey}`"
      @update-price="
        (rango) => {
          filters.minPrice = rango.min;
          filters.maxPrice = rango.max;
        }
      "
    />
    <RatingFilter :key="`rat-${resetKey}`" v-model="filters.rating" />
    <BestSellersFilter v-model="filters.bestSellersOnly" />
    <CategoriesFilter v-model="filters.category" />
  </aside>
</template>

<script setup>
import { reactive, watch, ref } from "vue";
import CategoriesFilter from "./filters/CategoriesFilter.vue";
import PriceFilter from "./filters/PriceFilter.vue";
import RatingFilter from "./filters/RatingFilter.vue";
import BestSellersFilter from "./filters/BestSellersFilter.vue";
import FiltersBtn from "./ui/FiltersBtn.vue";

const emit = defineEmits(["filters-updated"]);

const resetKey = ref(0);

const filters = reactive({
  category: null,
  minPrice: null,
  maxPrice: null,
  rating: null,
  bestSellersOnly: false,
});

const clearFilters = () => {
  filters.category = null;
  filters.minPrice = null;
  filters.maxPrice = null;
  filters.rating = null;
  filters.bestSellersOnly = null;

  resetKey.value++;
};

const toggleFilters = () => {
  const aside = document.querySelector("aside");
  aside.classList.toggle("active");
  aside.scrollTop = 0;
  document.body.style.position = aside.classList.contains("active")
    ? ""
    : "fixed";
  document.body.style.width = aside.classList.contains("active") ? "" : "100%";
};

window.addEventListener("resize", () => {
  if (window.innerWidth > 1200) {
    document.body.style.width = "";
    document.body.style.position = "";
  } else if (!document.querySelector("aside").classList.contains("active")) {
    document.body.style.width = "100%";
    document.body.style.position = "fixed";
  }
});

watch(
  filters,
  (newFilters) => {
    emit("filters-updated", { ...newFilters });
  },
  { deep: true },
);
</script>

<style scoped>
aside {
  width: 300px;
  margin-right: 50px;
}

.filters-btn {
  display: none;
}

.aside-h2 {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 75px;
  margin-top: 25px;
}

.aside-h2 > span {
  cursor: pointer;
  font-size: 12px;
  font-weight: 500;
  color: var(--font-medium);
}

.aside-h2 > span:hover {
  color: #000;
}

@media (max-width: 1200px) {
  aside {
    transition: 1s;
    position: fixed;
    bottom: -25px;
    left: 0;
    width: 100%;
    max-height: 600px;
    overflow: auto;
    z-index: 10;
    border-radius: 5px;
    box-shadow: 0px -1px 5px #999;
    background: var(--bg);
  }

  aside > * {
    width: 80%;
    margin: auto;
  }

  .filters-btn {
    position: relative;
    z-index: 30;
    display: block;
    margin-top: 20px;
    width: min-content;
    color: var(--bg);
    padding: 15px;
    pointer-events: all;
  }

  .active {
    overflow: hidden;
    bottom: -500px;
    background: #0000;
    box-shadow: none;
    color: #0000;
    z-index: 0;
    pointer-events: none;
  }
}
</style>

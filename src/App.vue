<script setup>
import { ref, onMounted, watch, computed } from "vue";
import { fetchAllProducts, fetchSearchProducts } from "./services/api";
import FilterSideBar from "./components/FilterSideBar.vue";
import AppHeader from "./components/AppHeader.vue";
import SortBar from "./components/SortBar.vue";
import ProductGrid from "./components/ProductGrid.vue";
import Pagination from "./components/Pagination.vue";
import { useLoading } from "./composables/useLoading";

const { isLoading, withLoading } = useLoading();

const products = ref([]);
const activeFilters = ref({});
const activeSort = ref({ sort: "relevance", hits: 12 });
const query = ref("");

const nextCursor = ref(null);
const cursorHistory = ref([]);
const hasNext = ref(false);
const hasPrev = computed(() => cursorHistory.value.length > 0);

let timeout;

const fetchProducts = (cursor = null) => {
  clearTimeout(timeout);
  timeout = setTimeout(() => {
    withLoading(async () => {
      const params = {
        limit: activeSort.value.hits,
        sort: activeSort.value.sort,
        isBestSeller: activeFilters.value.bestSellersOnly ? true : null,
        category: activeFilters.value.category,
        minPrice: activeFilters.value.minPrice,
        maxPrice: activeFilters.value.maxPrice,
        minStars: activeFilters.value.rating,
        after: cursor,
      };

      let result;
      if (query.value.length < 3) {
        result = await fetchAllProducts(params);
      } else {
        result = await fetchSearchProducts({ ...params, query: query.value });
      }

      products.value = result.data.products;
      nextCursor.value = result.data.nextCursor;
      hasNext.value = result.data.hasNext;
    });
  }, 300);
};

onMounted(() => fetchProducts());

watch(
  [query, activeFilters, activeSort],
  () => {
    cursorHistory.value = [];
    nextCursor.value = null;
    fetchProducts();
  },
  { deep: true },
);

const handleNext = () => {
  cursorHistory.value.push(nextCursor.value);
  fetchProducts(nextCursor.value);
  window.scrollTo({ top: 0, behavior: "smooth" });
};

const handlePrev = () => {
  cursorHistory.value.pop();
  const cursor = cursorHistory.value[cursorHistory.value.length - 1] ?? null;
  fetchProducts(cursor);
  window.scrollTo({ top: 0, behavior: "smooth" });
};

const handleFilters = (newFilters) => {
  activeFilters.value = newFilters;
};

const handleSort = (newSort) => {
  activeSort.value = newSort;
};

const handleQuery = (newQuery) => {
  query.value = newQuery;
};
</script>

<template>
  <AppHeader @query-change="handleQuery" />
  <div class="main-cont">
    <FilterSideBar @filters-updated="handleFilters" />
    <div class="sort-grid-cont">
      <SortBar @sort-updated="handleSort" />
      <ProductGrid :products="products" :loading="isLoading" />
    </div>
  </div>
  <Pagination
    :has-next="hasNext"
    :has-prev="hasPrev"
    @next="handleNext"
    @prev="handlePrev"
  />
</template>

<style>
.main-cont {
  display: flex;
  width: 100%;
  justify-content: center;
}

.title {
  font-size: 20px;
  font-weight: 500;
}

.title-small {
  font-size: 15px;
  margin-bottom: 12px;
  font-weight: 500;
}

.border-bottom {
  border-bottom: 1px solid var(--font-light);
}

@media (max-width: 1200px) {
  .overflow-hidden {
    overflow: hidden;
  }
}

@media (max-width: 850px) {
  .sort-grid-cont {
    width: 100%;
  }
}
</style>

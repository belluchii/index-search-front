<script setup>
import Product from "./Product.vue";
import Spinner from "./ui/Spinner.vue";

defineProps({
  products: {
    type: Array,
    default: () => [],
  },
  loading: {
    type: Boolean,
    default: true,
  },
});
</script>

<template>
  <main>
    <div v-if="loading" class="loading">
      <Spinner />
    </div>
    <template v-else>
      <div v-if="!products.length" class="empty">
        <img class="empty-icon" src="/search-icon.svg" alt="" />
        <p>No products found</p>
        <span>Try adjusting your filters or search terms</span>
      </div>
      <Product
        v-else
        v-for="p in products"
        :category="p.category_name"
        :key="p.asin"
        :name="p.title"
        :price="p.price"
        :rating="p.stars"
        :image="p.imgUrl"
      />
    </template>
  </main>
</template>

<style scoped>
main {
  width: 1000px;
  min-height: 1000px;
  margin-top: 20px;
  display: grid;
  grid-template-columns: repeat(4, 200px);
  justify-content: space-between;
  gap: 30px;
}

.loading {
  grid-column: 1 / -1;
  display: flex;
  justify-content: center;
  padding-top: 60px;
}

.empty {
  grid-column: 1 / -1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 60px 20px;
  gap: 8px;
}

.empty-icon {
  height: 40px;
  margin-bottom: 8px;
}

.empty p {
  font-size: 1.1rem;
  font-weight: 600;
  color: #333;
}

.empty span:last-child {
  font-size: 0.85rem;
  color: var(--font-medium);
}

@media (max-width: 1400px) {
  main {
    width: 800px;
    grid-template-columns: repeat(3, 200px);
  }
}

@media (max-width: 850px) {
  main {
    margin: auto;
    margin-top: 20px;
    width: 90%;
    grid-template-columns: repeat(2, 200px);
  }
}

@media (max-width: 500px) {
  main {
    justify-content: center;
    grid-template-columns: repeat(1, 200px);
  }
}
</style>

<template>
  <header>
    <h1>Search among half a million Amazon products</h1>
    <div class="search-wrapper">
      <button class="search-icon">
        <img src="/search-icon.svg" alt="search" width="20" height="20" />
      </button>
      <input
        v-model="query"
        type="text"
        placeholder="Search products..."
        class="search"
        id="search"
      />
    </div>
  </header>
</template>

<script setup>
import { ref, watch } from "vue";

const emit = defineEmits(["query-change"]);
const query = ref("");

watch(query, (val) => {
  emit("query-change", val);
});
</script>

<style scoped>
header {
  background-image: url("/amazon-boxes.jpg");
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed;
  height: 280px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 16px;
  position: relative;
}

header::after {
  content: "";
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
}

h1 {
  color: #fff;
  font-size: 1.4rem;
  font-weight: 700;
  letter-spacing: 0.01em;
  text-align: center;
  position: relative;
  z-index: 1;
}

.search-wrapper {
  position: relative;
  z-index: 1;
  width: 700px;
  display: flex;
  align-items: center;
  background: #fff;
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}

.search {
  flex: 1;
  border: none;
  padding: 14px 18px;
  font-size: 15px;
  outline: none;
}

.search-icon {
  background: var(--bg);
  border: none;
  padding: 0 18px;
  height: 100%;
  cursor: pointer;
  font-size: 18px;
  display: flex;
  align-items: center;
  transition: background 0.2s;
}

.search-icon:hover {
  background: #f3a847;
}

@media (max-width: 850px) {
  .search-wrapper {
    width: 90%;
  }
}
</style>

<template>
  <div class="pagination">
    <button class="btn arrow" :disabled="!hasPrev" @click="$emit('prev')">
      ←
    </button>
    <button class="btn arrow" :disabled="!hasNext" @click="$emit('next')">
      →
    </button>
  </div>
</template>

<script setup>
defineProps({
  hasNext: { type: Boolean, default: false },
  hasPrev: { type: Boolean, default: false },
});

defineEmits(["next", "prev"]);
</script>

<style scoped>
.pagination {
  margin: auto;
  justify-content: center;
  display: flex;
  gap: 4px;
  margin: 50px 0;
}

.btn {
  min-width: 36px;
  height: 36px;
  padding: 0 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: #fff;
  font-size: 13px;
  cursor: pointer;
  transition:
    background 0.15s,
    border-color 0.15s;
}

.btn:hover:not(:disabled):not(.active) {
  background: #f0f0f0;
  border-color: #aaa;
}

.btn.active {
  background: var(--yellow);
  border-color: var(--yellow);
  color: #fff;
  font-weight: 600;
  cursor: default;
}

.btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.arrow {
  font-size: 15px;
}

.dots {
  padding: 0 6px;
  color: #555;
  font-size: 13px;
}
</style>

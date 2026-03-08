<template>
  <div class="best-sellers-filter border-bottom">
    <h3 class="title-small">Best sellers</h3>
    <div class="switch-cont">
      <p>Display best sellers only</p>
      <Switch
        :modelValue="modelValue"
        @update:modelValue="$emit('update:modelValue', $event)"
      />
    </div>
  </div>
</template>

<script setup>
import Switch from "../ui/Switch.vue";
defineProps(["modelValue"]);
defineEmits(["update:modelValue"]);
</script>

<style scoped>
.best-sellers-filter {
  padding: 20px 0;
}

.switch-cont {
  width: 100%;
  justify-content: space-between;
  font-size: 14px;
  display: flex;
  color: var(--font-medium);
}

.switch-cont > p {
  margin-left: 10px;
}
</style>

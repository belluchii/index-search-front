<template>
  <div class="stars-filter border-bottom">
    <h3 class="title-small">Rating</h3>
    <Stars
      :modelValue="modelValue"
      @update:modelValue="$emit('update:modelValue', $event)"
    />
  </div>
</template>

<script setup>
import Stars from "../ui/Stars.vue";

defineProps(["modelValue"]);
defineEmits(["update:modelValue"]);
</script>

<style scoped>
.stars-filter {
  padding: 20px 0;
}
</style>

<template>
  <div class="rating">
    <template v-for="star in [5, 4, 3, 2, 1]" :key="star">
      <input
        type="radio"
        :id="`star${star}-${uniqueId}`"
        :name="`rating-${uniqueId}`"
        :value="star"
        :checked="modelValue === star"
        @change="$emit('update:modelValue', star)"
      />
      <label :for="`star${star}-${uniqueId}`"></label>
    </template>
  </div>
</template>

<script setup>
import { ref } from "vue";

defineProps({
  modelValue: {
    type: Number,
    default: 0,
  },
});

defineEmits(["update:modelValue"]);

const uniqueId = ref(Math.random().toString(36).substring(2, 9));
</script>

<style scoped>
.rating {
  margin-left: 10px;
  display: inline-block;
}

.rating input {
  display: none;
}

.rating label {
  float: right;
  cursor: pointer;
  color: #ccc;
  transition: color 0.3s;
}

.rating label:before {
  content: "\2605";
  font-size: 25px;
}

.rating input:checked ~ label,
.rating label:hover,
.rating label:hover ~ label {
  color: var(--yellow);
  transition: color 0.3s;
}
</style>

<template>
  <div class="custom-select" @click="toggleDropdown" ref="selectRef">
    <div class="selected">
      {{ selectedOption || options[0]?.label }}
      <span class="arrow" :class="{ open: isOpen }">▼</span>
    </div>

    <ul class="options" v-if="isOpen">
      <li
        v-for="option in options"
        :key="option.value"
        @click="selectOption(option)"
      >
        {{ option.label }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const props = defineProps({
  options: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(["update:modelValue"]);

const isOpen = ref(false);
const selectedOption = ref(null);
const selectRef = ref(null);

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

const selectOption = (option) => {
  selectedOption.value = option.label;
  emit("update:modelValue", option.value);
  isOpen.value = false;
};

// Cerrar al hacer click fuera
const handleClickOutside = (e) => {
  if (selectRef.value && !selectRef.value.contains(e.target)) {
    isOpen.value = false;
  }
};

onMounted(() => document.addEventListener("click", handleClickOutside));
onUnmounted(() => document.removeEventListener("click", handleClickOutside));
</script>

<style scoped>
.custom-select {
  position: relative;
  width: 168px;
  cursor: pointer;
  user-select: none;
  display: flex;
  align-items: center;
  justify-content: end;
}

.selected {
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
}

.arrow {
  font-size: 12px;
  transition: transform 0.3s;
}

.arrow.open {
  transform: rotate(180deg);
}

.options {
  position: absolute;
  top: 110%;
  left: 0;
  right: 0;
  border: 1px solid #ccc;
  background: #fff;
  list-style: none;
  padding: 4px 0;
  margin: 0;
  z-index: 100;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.options li {
  text-align: right;
  padding: 10px 16px;
  transition: background 0.2s;
}

.options li:hover {
  background: #f0f0f0;
}
</style>

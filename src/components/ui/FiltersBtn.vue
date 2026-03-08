<template>
  <button
    @click="toggleFocus"
    class="setting-btn"
    :class="{ focus: isFocused }"
  >
    <span class="bar bar1"></span>
    <span class="bar bar2"></span>
    <span class="bar bar1"></span>
  </button>
</template>

<script setup>
import { ref } from "vue";

const isFocused = ref(false);

const toggleFocus = () => {
  isFocused.value = !isFocused.value;
};
</script>

<style scoped>
.setting-btn {
  width: 45px;
  height: 45px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
  background-color: #000;
  border-radius: 10px;
  cursor: pointer;
  border: none;
  box-shadow: 0px 0px 0px 2px #000;
}
.bar {
  width: 50%;
  height: 2px;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  border-radius: 2px;
}
.bar::before {
  content: "";
  width: 2px;
  height: 2px;
  background-color: #000;
  position: absolute;
  border-radius: 50%;
  border: 2px solid white;
  transition: all 0.3s;
  box-shadow: 0px 0px 5px white;
}
.bar1::before {
  transform: translateX(-4px);
}
.bar2::before {
  transform: translateX(4px);
}
.focus .bar1::before {
  transform: translateX(4px);
}
.focus .bar2::before {
  transform: translateX(-4px);
}
</style>

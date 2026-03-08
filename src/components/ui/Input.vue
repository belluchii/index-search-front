<template>
  <div class="slider-container">
    <div class="slider-wrapper">
      <div class="slider-track" :style="trackStyle"></div>

      <input
        type="range"
        :min="min"
        :max="max"
        v-model.number="localMin"
        @input="enforceMinGap"
        :style="{ zIndex: lastMoved === 'min' ? 3 : 1 }"
      />

      <input
        type="range"
        :min="min"
        :max="max"
        v-model.number="localMax"
        @input="enforceMaxGap"
        :style="{ zIndex: lastMoved === 'max' ? 3 : 1 }"
      />
    </div>

    <div class="values">
      <span><b>$</b> {{ localMin }}</span>
      <span><b>$</b> {{ localMax }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";

const props = defineProps({
  min: { type: Number, default: 0 },
  max: { type: Number, default: 100 },
  gap: { type: Number, default: 5 },
});

const emit = defineEmits(["update-range"]);

const localMin = ref(props.min);
const localMax = ref(props.max);
const lastMoved = ref("max");

const enforceMinGap = () => {
  lastMoved.value = "min";
  if (localMax.value - localMin.value < props.gap) {
    localMin.value = localMax.value - props.gap;
  }
};

const enforceMaxGap = () => {
  lastMoved.value = "max";
  if (localMax.value - localMin.value < props.gap) {
    localMax.value = localMin.value + props.gap;
  }
};

const trackStyle = computed(() => {
  const percent1 =
    ((localMin.value - props.min) / (props.max - props.min)) * 100;
  const percent2 =
    ((localMax.value - props.min) / (props.max - props.min)) * 100;

  return {
    background: `linear-gradient(to right, #fff ${percent1}%, #000 ${percent1}%, #000 ${percent2}%, #fff ${percent2}%)`,
  };
});

watch([localMin, localMax], () => {
  emit("update-range", { min: localMin.value, max: localMax.value });
});
</script>

<style scoped>
.slider-container {
  width: 100%;
  font-family: Arial, sans-serif;
}

.slider-wrapper {
  position: relative;
  width: 100%;
  height: 30px;
  display: flex;
  align-items: center;
}

.slider-track {
  width: 100%;
  height: 5px;
  position: absolute;
  border-radius: 5px;
  border: 1px solid #777;
}

input[type="range"] {
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  position: absolute;
  background-color: transparent;
  pointer-events: none;
  outline: none;
}

input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  height: 20px;
  width: 20px;
  background-color: #fff;
  box-shadow: 1px 1px 3px #777;
  border-radius: 50%;
  cursor: pointer;
  pointer-events: auto;
}

input[type="range"]::-moz-range-thumb {
  -moz-appearance: none;
  height: 20px;
  width: 20px;
  background-color: #000;
  border-radius: 50%;
  cursor: pointer;
  pointer-events: auto;
  border: none;
}

.values {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  font-weight: bold;
  color: #333;
}

span {
  font-size: 12px;
  color: var(--font-medium);
}

b {
  color: var(--yellow);
  font-size: 10px;
}
</style>

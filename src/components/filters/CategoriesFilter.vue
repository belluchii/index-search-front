<template>
  <div class="categories-filter">
    <h3 class="title-small">Categories</h3>
    <div class="spinner-cont" v-if="isLoading">
      <Spinner />
    </div>
    <ul v-else class="categories-cont">
      <template v-for="(items, group) in grouped" :key="group">
        <li v-if="items.length > 1" class="group">
          <div class="group-header" @click="toggleGroup(group)">
            {{ group }}
            <span class="arrow">{{
              openGroups.includes(group) ? "▾" : "▸"
            }}</span>
          </div>
          <ul v-if="openGroups.includes(group)" class="sub-list">
            <li
              v-for="cat in items"
              :key="cat"
              :class="{ active: modelValue === cat }"
              @click="$emit('update:modelValue', cat)"
            >
              {{ cat }}
            </li>
          </ul>
        </li>
        <li
          v-else
          :class="{ active: modelValue === items[0] }"
          @click="$emit('update:modelValue', items[0])"
        >
          {{ items[0] }}
        </li>
      </template>
    </ul>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { fetchCategories } from "@/services/api";
import Spinner from "@/components/ui/Spinner.vue";

defineEmits(["update:modelValue"]);

const props = defineProps(["modelValue"]);
const isLoading = ref(true);
const categories = ref([]);
const openGroups = ref([]);

const toggleGroup = (group) => {
  const hasActive = grouped.value[group]?.includes(props.modelValue);
  if (hasActive) return;

  const idx = openGroups.value.indexOf(group);
  if (idx === -1) openGroups.value.push(group);
  else openGroups.value.splice(idx, 1);
};

const grouped = computed(() => {
  const groups = {};
  categories.value.forEach((cat) => {
    const key = cat.split(" ")[0];
    if (!groups[key]) groups[key] = [];
    groups[key].push(cat);
  });
  return groups;
});

onMounted(async () => {
  const { data, error } = await fetchCategories();
  isLoading.value = false;
  if (error) return;
  categories.value = data;
});
</script>

<style scoped>
.spinner-cont {
  display: flex;
  justify-content: center;
}

.categories-filter {
  padding: 20px 0;
  padding-bottom: 50px;
}

.categories-cont {
  max-height: 500px;
  overflow: auto;
}

.categories-cont > * {
  margin-left: 10px;
}

.categories-cont::-webkit-scrollbar {
  width: 6px;
}

.categories-cont::-webkit-scrollbar-track {
  background: transparent;
}

.categories-cont::-webkit-scrollbar-thumb {
  background: #ccc;
  border-radius: 10px;
}

.categories-cont::-webkit-scrollbar-button {
  display: none;
  height: 0;
}

.categories-cont > li {
  margin: 5px 0px;
  padding-left: 20px;
  font-size: 14px;
  font-weight: 500;
  color: var(--font-medium);
  cursor: pointer;
}

.categories-cont > li.group {
  padding-left: 10px;
}

.categories-cont > li.group .group-header {
  padding-left: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.categories-cont > li.group .group-header:hover {
  color: var(--yellow);
}

.categories-cont > li.group .sub-list li {
  padding-left: 20px;
}

.categories-cont > li.group .sub-list li:hover {
  color: var(--yellow);
}

.categories-cont li.active {
  color: var(--yellow);
  font-weight: 600;
  border-left: 3px solid var(--yellow);
}

.categories-cont > li:not(.group):hover {
  color: var(--yellow);
}
</style>

<template>
  <div class="spinner"></div>
</template>

<style scoped>
.spinner {
  width: 36px;
  height: 36px;
  border: 3px solid #eee;
  border-top-color: #000;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>

<template>
  <div class="product-cont">
    <div class="product-img-cont">
      <img class="product-img" :src="image" :alt="name" />
    </div>
    <div class="desc-cont">
      <h3 class="product-cat">{{ category }}</h3>
      <h2 class="product-name">{{ name }}</h2>
      <p class="product-price">
        <span class="product-sign">{{ price < 1 ? "" : "$" }}</span
        >{{ price < 1 ? "Out of Stock" : price }}
        <span class="product-rating">★{{ rating }}</span>
      </p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  category: String,
  name: String,
  price: Number,
  rating: Number,
  image: String,
});
</script>

<style scoped>
.product-img-cont {
  height: 200px;
  width: 200px;
}
.product-img {
  object-fit: contain;
  width: 200px;
  height: 200px;
}
.product-cont {
  width: 200px;
}
.product-cat {
  margin-top: 7px;
  font-size: 12px;
  font-weight: 700;
  color: var(--font-medium);
}
.product-name {
  overflow-wrap: break-word;
  margin-top: 4px;
  font-size: 14px;
  font-weight: 700;
}
.product-desc {
  font-size: 14px;
  font-weight: 500;
}
.product-price {
  margin-top: 7px;
  font-size: 14px;
  font-weight: 700;
  color: var(--font-medium);
}
.product-rating {
  border: 1px solid var(--yellow);
  border-radius: 3px;
  padding: 3px;
}
.product-sign,
.product-rating {
  font-size: 12px;
  color: var(--yellow);
}
</style>

<script setup>
defineProps({
  data: {
    type: Object,
    required: true
  },
  products: {
    type: Array,
    default: () => []
  }
})
</script>

<template>
  <section class="section-new-arrivals">
    <div class="section-new-arrivals__bg">
      <NuxtImg
        v-if="data.backgroundImage"
        :src="data.backgroundImage"
        :alt="data.backgroundImageAlt"
        class="section-new-arrivals__bg-image"
        format="webp"
        loading="lazy"
      />
    </div>
    <div class="section-new-arrivals__inner">
      <div class="section-new-arrivals__head">
        <div class="section-new-arrivals__titles">
          <p class="section-new-arrivals__eyebrow">{{ data.eyebrow }}</p>
          <div class="section-new-arrivals__title-group">
            <h2 class="section-new-arrivals__title">{{ data.title }}</h2>
            <p v-if="data.description" class="section-new-arrivals__description">{{ data.description }}</p>
          </div>
        </div>
        <NuxtLink v-if="data.ctaHref" :to="data.ctaHref" class="section-new-arrivals__cta">
          {{ data.ctaLabel }}
        </NuxtLink>
      </div>
      <div v-if="products.length" class="section-new-arrivals__grid">
        <ProductCard
          v-for="product in products"
          :key="product.id"
          :product="product"
          class="section-new-arrivals__item"
        />
      </div>
    </div>
  </section>
</template>

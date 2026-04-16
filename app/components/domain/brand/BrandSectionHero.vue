<script setup>
defineProps({
  data: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <section class="brand-hero">
    <div class="brand-hero__bg" aria-hidden="true">
      <NuxtImg
        :src="data.image"
        :alt="data.imageAlt"
        class="brand-hero__bg-image"
        format="webp"
        width="1920"
        quality="75"
        loading="eager"
        fetchpriority="high"
      />
    </div>
    <div class="brand-hero__inner">
      <p class="brand-hero__eyebrow">{{ data.eyebrow }}</p>
      <h1 class="brand-hero__title">{{ data.title }}</h1>
      <p class="brand-hero__description">{{ data.description }}</p>
    </div>
  </section>
</template>

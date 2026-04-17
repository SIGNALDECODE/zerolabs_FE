<script setup>
defineProps({
  data: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <section class="wholesale-hero">
    <div class="wholesale-hero__bg" aria-hidden="true">
      <NuxtImg
        :src="data.image"
        :alt="data.imageAlt"
        class="wholesale-hero__bg-image"
        format="webp"
        width="1920"
        quality="75"
        loading="eager"
        fetchpriority="high"
      />
    </div>
    <div class="wholesale-hero__inner">
      <p class="wholesale-hero__eyebrow">{{ data.eyebrow }}</p>
      <h1 class="wholesale-hero__title">{{ data.title }}</h1>
      <p class="wholesale-hero__description">{{ data.description }}</p>
    </div>
  </section>
</template>

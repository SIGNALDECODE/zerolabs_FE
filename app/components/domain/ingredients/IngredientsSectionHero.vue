<script setup>
defineProps({
  data: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <section class="ingredients-hero">
    <div class="ingredients-hero__bg" aria-hidden="true">
      <NuxtImg
        :src="data.image"
        :alt="data.imageAlt"
        class="ingredients-hero__bg-image"
        format="webp"
        width="1920"
        quality="75"
        loading="eager"
        fetchpriority="high"
      />
    </div>
    <div class="ingredients-hero__inner">
      <p class="ingredients-hero__eyebrow">{{ data.eyebrow }}</p>
      <h1 class="ingredients-hero__title">{{ data.title }}</h1>
      <p class="ingredients-hero__description">{{ data.description }}</p>
    </div>
  </section>
</template>

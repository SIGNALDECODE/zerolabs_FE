<script setup>
defineProps({
  data: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <section class="section-philosophy">
    <div class="section-philosophy__bg">
      <NuxtImg
        v-if="data.backgroundImage"
        :src="data.backgroundImage"
        :alt="data.backgroundImageAlt"
        class="section-philosophy__bg-image"
        format="webp"
        loading="lazy"
      />
      <div class="section-philosophy__overlay" />
    </div>
    <div class="section-philosophy__inner">
      <p class="section-philosophy__eyebrow">{{ data.eyebrow }}</p>
      <h2 class="section-philosophy__title">{{ data.title }}</h2>
      <p v-if="data.description" class="section-philosophy__description">{{ data.description }}</p>
      <NuxtLink v-if="data.ctaHref" :to="data.ctaHref" class="section-philosophy__cta">
        {{ data.ctaLabel }}
      </NuxtLink>
    </div>
  </section>
</template>

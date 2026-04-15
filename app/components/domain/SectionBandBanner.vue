<script setup>
defineProps({
  data: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <section class="section-band">
    <div class="section-band__bg">
      <NuxtImg
        :src="data.image"
        :alt="data.imageAlt"
        class="section-band__image"
        format="webp"
        loading="lazy"
      />
    </div>
    <div class="section-band__inner">
      <div class="section-band__text">
        <p class="section-band__eyebrow">{{ data.eyebrow }}</p>
        <h2 class="section-band__title">{{ data.title }}</h2>
      </div>
      <NuxtLink v-if="data.ctaHref" :to="data.ctaHref" class="section-band__cta">
        {{ data.ctaLabel }}
      </NuxtLink>
    </div>
  </section>
</template>

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
    <div class="section-band__decor" aria-hidden="true">
      <img
        v-if="data.mountainImage"
        :src="data.mountainImage"
        alt=""
        class="section-band__mountain"
        loading="lazy"
      />
      <img
        v-if="data.iconsImage"
        :src="data.iconsImage"
        alt=""
        class="section-band__icons"
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

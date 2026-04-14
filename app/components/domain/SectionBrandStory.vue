<script setup>
defineProps({
  data: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <section class="section-brand-story">
    <div class="section-brand-story__inner">
      <figure class="section-brand-story__visual">
        <img
          :src="data.image"
          :alt="data.imageAlt"
          loading="lazy"
          decoding="async"
        >
      </figure>

      <div class="section-brand-story__content">
        <p class="section-brand-story__eyebrow">{{ data.eyebrow }}</p>
        <h2 class="section-brand-story__title">{{ data.title }}</h2>
        <div class="section-brand-story__body">
          <p
            v-for="(line, i) in data.body"
            :key="i"
          >
            {{ line }}
          </p>
        </div>
        <NuxtLink
          v-if="data.ctaHref"
          :to="data.ctaHref"
          class="section-brand-story__cta"
        >
          {{ data.ctaLabel }}
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

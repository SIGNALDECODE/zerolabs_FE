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
    <div class="section-philosophy__panel">
      <div class="section-philosophy__bg" aria-hidden="true">
        <NuxtImg
          v-if="data.backgroundImage"
          :src="data.backgroundImage"
          :alt="data.backgroundImageAlt"
          class="section-philosophy__bg-image"
          format="webp"
          loading="lazy"
        />
      </div>
      <div class="section-philosophy__inner">
        <div class="section-philosophy__content">
          <div class="section-philosophy__head">
            <p class="section-philosophy__eyebrow">{{ data.eyebrow }}</p>
            <div class="section-philosophy__text">
              <h2 class="section-philosophy__title">{{ data.title }}</h2>
              <p v-if="data.descriptionSegments?.length" class="section-philosophy__description">
                <span
                  v-for="(seg, i) in data.descriptionSegments"
                  :key="i"
                  :class="['section-philosophy__description-seg', { 'is-highlight': seg.highlight }]"
                >{{ seg.text }}</span>
              </p>
              <p v-else-if="data.description" class="section-philosophy__description">{{ data.description }}</p>
            </div>
          </div>
          <NuxtLink v-if="data.ctaHref" :to="data.ctaHref" class="section-philosophy__cta">
            {{ data.ctaLabel }}
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
defineProps({
  data: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <section class="brand-ingredients">
    <div class="brand-ingredients__inner">
      <header class="brand-ingredients__head">
        <p class="brand-ingredients__eyebrow">{{ data.eyebrow }}</p>
        <h2 class="brand-ingredients__title">
          <template v-if="data.titleSegments?.length">
            <span
              v-for="(seg, i) in data.titleSegments"
              :key="i"
              :class="['brand-ingredients__title-seg', { 'is-highlight': seg.highlight }]"
            >{{ seg.text }}</span>
          </template>
          <template v-else>{{ data.title }}</template>
        </h2>
        <p class="brand-ingredients__description">{{ data.description }}</p>
      </header>

      <ul class="brand-ingredients__grid">
        <li
          v-for="item in data.items"
          :key="item.id"
          class="brand-ingredients__card"
        >
          <span class="brand-ingredients__chip">{{ item.chip }}</span>
          <div class="brand-ingredients__image-wrap">
            <NuxtImg
              :src="item.image"
              :alt="item.imageAlt"
              class="brand-ingredients__image"
              format="webp"
              width="360"
              quality="80"
              loading="lazy"
            />
          </div>
          <div class="brand-ingredients__body">
            <h3 class="brand-ingredients__card-title">{{ item.title }}</h3>
            <p class="brand-ingredients__card-desc">{{ item.description }}</p>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>

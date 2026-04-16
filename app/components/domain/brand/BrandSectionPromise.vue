<script setup>
defineProps({
  data: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <section class="brand-promise">
    <div class="brand-promise__inner">
      <div class="brand-promise__content">
        <p class="brand-promise__eyebrow">{{ data.eyebrow }}</p>
        <h2 class="brand-promise__title">{{ data.title }}</h2>
        <div class="brand-promise__description">
          <p
            v-for="(line, i) in data.descriptionLines"
            :key="i"
            class="brand-promise__description-line"
          >
            {{ line }}
          </p>
        </div>
      </div>
      <div class="brand-promise__media">
        <NuxtImg
          :src="data.image"
          :alt="data.imageAlt"
          class="brand-promise__image"
          format="webp"
          width="780"
          quality="80"
          loading="lazy"
        />
      </div>
    </div>
  </section>
</template>

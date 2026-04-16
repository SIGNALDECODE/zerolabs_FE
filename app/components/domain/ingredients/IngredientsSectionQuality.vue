<script setup>
defineProps({
  data: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <section class="ingredients-quality">
    <div class="ingredients-quality__inner">
      <header class="ingredients-quality__head">
        <p class="ingredients-quality__eyebrow">{{ data.eyebrow }}</p>
        <h2 class="ingredients-quality__title">{{ data.title }}</h2>
        <p class="ingredients-quality__description">{{ data.description }}</p>
      </header>

      <div class="ingredients-quality__panel">
        <div class="ingredients-quality__bg" aria-hidden="true">
          <NuxtImg
            :src="data.backgroundImage"
            :alt="data.backgroundImageAlt"
            class="ingredients-quality__bg-image"
            format="webp"
            width="1400"
            quality="75"
            loading="lazy"
          />
        </div>
        <ul class="ingredients-quality__steps">
          <li
            v-for="(item, index) in data.items"
            :key="item.id"
            :class="['ingredients-quality__step', { 'is-active': index === 0 }]"
          >
            <span class="ingredients-quality__step-label">{{ item.label }}</span>
            <h3 class="ingredients-quality__step-title">{{ item.title }}</h3>
            <p class="ingredients-quality__step-desc">{{ item.description }}</p>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

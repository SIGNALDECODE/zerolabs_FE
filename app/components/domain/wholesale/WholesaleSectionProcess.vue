<script setup>
defineProps({
  data: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <section class="wholesale-process">
    <div class="wholesale-process__inner">
      <header class="wholesale-process__head">
        <p class="wholesale-process__eyebrow">{{ data.eyebrow }}</p>
        <h2 class="wholesale-process__title">{{ data.title }}</h2>
      </header>

      <ol class="wholesale-process__list">
        <li
          v-for="step in data.steps"
          :key="step.id"
          class="wholesale-process__item"
        >
          <div class="wholesale-process__circle">
            <span class="wholesale-process__badge">{{ step.step }}</span>
            <div class="wholesale-process__icon" aria-hidden="true">
              <NuxtImg
                v-if="step.iconImage"
                :src="step.iconImage"
                :alt="step.iconAlt || ''"
                class="wholesale-process__icon-image"
                format="webp"
                width="120"
                loading="lazy"
              />
            </div>
            <h3 class="wholesale-process__item-title">{{ step.title }}</h3>
          </div>
          <p class="wholesale-process__item-desc">{{ step.description }}</p>
        </li>
      </ol>
    </div>
  </section>
</template>

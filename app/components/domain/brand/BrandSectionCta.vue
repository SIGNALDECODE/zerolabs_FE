<script setup>
defineProps({
  data: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <section class="brand-cta">
    <div class="brand-cta__bg" aria-hidden="true">
      <div class="brand-cta__gradient" />
    </div>
    <span class="brand-cta__wordmark" aria-hidden="true">{{ data.wordmark }}</span>
    <div class="brand-cta__inner">
      <h2 class="brand-cta__title">{{ data.title }}</h2>
      <p class="brand-cta__description">{{ data.description }}</p>
      <div class="brand-cta__buttons">
        <NuxtLink :to="data.primary.href" class="brand-cta__button brand-cta__button--primary">
          {{ data.primary.label }}
        </NuxtLink>
        <NuxtLink :to="data.secondary.href" class="brand-cta__button brand-cta__button--secondary">
          {{ data.secondary.label }}
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup>
defineProps({
  data: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <section class="section-wholesale">
    <div class="section-wholesale__card">
      <NuxtImg
        :src="data.image"
        :alt="data.imageAlt"
        class="section-wholesale__image"
        format="webp"
        loading="lazy"
      />
      <div class="section-wholesale__overlay" />
      <div class="section-wholesale__content">
        <div class="section-wholesale__head">
          <div class="section-wholesale__titles">
            <p class="section-wholesale__eyebrow">{{ data.eyebrow }}</p>
            <h2 class="section-wholesale__title">{{ data.title }}</h2>
          </div>
          <p v-if="data.description" class="section-wholesale__description">{{ data.description }}</p>
          <dl v-if="data.contacts?.length" class="section-wholesale__contacts">
            <div
              v-for="contact in data.contacts"
              :key="contact.label"
              class="section-wholesale__contact"
            >
              <dt>{{ contact.label }}:</dt>
              <dd>{{ contact.value }}</dd>
            </div>
          </dl>
        </div>
        <NuxtLink v-if="data.ctaHref" :to="data.ctaHref" class="section-wholesale__cta">
          {{ data.ctaLabel }}
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

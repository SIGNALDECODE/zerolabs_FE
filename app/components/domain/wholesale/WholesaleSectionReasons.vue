<script setup>
defineProps({
  data: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <section class="wholesale-reasons">
    <div class="wholesale-reasons__inner">
      <header class="wholesale-reasons__head">
        <p class="wholesale-reasons__eyebrow">{{ data.eyebrow }}</p>
        <h2 class="wholesale-reasons__title">
          <template v-if="data.titleSegments?.length">
            <span
              v-for="(seg, i) in data.titleSegments"
              :key="i"
              :class="['wholesale-reasons__title-seg', { 'is-highlight': seg.highlight }]"
            >{{ seg.text }}</span>
          </template>
          <template v-else>{{ data.title }}</template>
        </h2>
        <p v-if="data.description" class="wholesale-reasons__description">{{ data.description }}</p>
      </header>

      <ul class="wholesale-reasons__grid">
        <li
          v-for="item in data.items"
          :key="item.id"
          class="wholesale-reasons__card"
        >
          <div class="wholesale-reasons__icon" aria-hidden="true">
            <NuxtImg
              v-if="item.iconImage"
              :src="item.iconImage"
              :alt="item.iconAlt || ''"
              class="wholesale-reasons__icon-image"
              format="webp"
              width="160"
              loading="lazy"
            />
          </div>
          <h3 class="wholesale-reasons__card-title">{{ item.title }}</h3>
        </li>
      </ul>
    </div>
  </section>
</template>

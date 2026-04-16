<script setup>
defineProps({
  data: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <section class="ingredients-principles">
    <div class="ingredients-principles__inner">
      <header class="ingredients-principles__head">
        <p class="ingredients-principles__eyebrow">{{ data.eyebrow }}</p>
        <h2 class="ingredients-principles__title">
          <template v-if="data.titleSegments?.length">
            <span
              v-for="(seg, i) in data.titleSegments"
              :key="i"
              :class="['ingredients-principles__title-seg', { 'is-highlight': seg.highlight }]"
            >{{ seg.text }}</span>
          </template>
          <template v-else>{{ data.title }}</template>
        </h2>
        <p class="ingredients-principles__description">{{ data.description }}</p>
      </header>

      <ul class="ingredients-principles__grid">
        <li
          v-for="item in data.items"
          :key="item.id"
          class="ingredients-principles__card"
        >
          <div class="ingredients-principles__image-wrap">
            <NuxtImg
              :src="item.image"
              :alt="item.imageAlt"
              class="ingredients-principles__image"
              format="webp"
              width="240"
              quality="80"
              loading="lazy"
            />
          </div>
          <div class="ingredients-principles__body">
            <h3 class="ingredients-principles__card-title">{{ item.title }}</h3>
            <p class="ingredients-principles__card-desc">{{ item.description }}</p>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>

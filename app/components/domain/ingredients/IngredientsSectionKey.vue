<script setup>
defineProps({
  data: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <section class="ingredients-key">
    <div class="ingredients-key__inner">
      <header class="ingredients-key__head">
        <p class="ingredients-key__eyebrow">{{ data.eyebrow }}</p>
        <h2 class="ingredients-key__title">
          <template v-if="data.titleSegments?.length">
            <span
              v-for="(seg, i) in data.titleSegments"
              :key="i"
              :class="['ingredients-key__title-seg', { 'is-highlight': seg.highlight }]"
            >{{ seg.text }}</span>
          </template>
          <template v-else>{{ data.title }}</template>
        </h2>
        <p class="ingredients-key__description">{{ data.description }}</p>
      </header>

      <ul class="ingredients-key__list">
        <li
          v-for="item in data.items"
          :key="item.id"
          :class="['ingredients-key__row', `ingredients-key__row--${item.mediaSide}`]"
        >
          <div class="ingredients-key__media">
            <NuxtImg
              :src="item.image"
              :alt="item.imageAlt"
              class="ingredients-key__image"
              format="webp"
              width="600"
              quality="80"
              loading="lazy"
            />
          </div>
          <div class="ingredients-key__body">
            <h3 class="ingredients-key__row-title">{{ item.title }}</h3>
            <p class="ingredients-key__row-desc">{{ item.description }}</p>
            <ul class="ingredients-key__tags">
              <li
                v-for="tag in item.tags"
                :key="tag"
                class="ingredients-key__tag"
              >
                {{ tag }}
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>

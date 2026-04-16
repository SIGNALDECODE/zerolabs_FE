<script setup>
defineProps({
  data: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <section class="ingredients-intro">
    <div class="ingredients-intro__inner">
      <div class="ingredients-intro__content">
        <div class="ingredients-intro__title-block">
          <span class="ingredients-intro__quote ingredients-intro__quote--open" aria-hidden="true">&#10077;</span>
          <h2 class="ingredients-intro__title">
            <span
              v-for="(seg, i) in data.titleSegments"
              :key="i"
              :class="['ingredients-intro__title-seg', { 'is-highlight': seg.highlight }]"
            >{{ seg.text }}</span>
          </h2>
          <span class="ingredients-intro__quote ingredients-intro__quote--close" aria-hidden="true">&#10078;</span>
        </div>

        <p class="ingredients-intro__description">
          <span
            v-for="(seg, i) in data.descriptionSegments"
            :key="i"
            :class="['ingredients-intro__desc-seg', { 'is-highlight': seg.highlight }]"
          >{{ seg.text }}</span>
        </p>
      </div>

      <NuxtImg
        :src="data.mascotImage"
        :alt="data.mascotAlt"
        class="ingredients-intro__mascot"
        format="webp"
        width="240"
        quality="80"
        loading="lazy"
      />
    </div>
  </section>
</template>

<script setup>
defineProps({
  data: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <section class="wholesale-intro">
    <div class="wholesale-intro__inner">
      <div class="wholesale-intro__content">
        <div class="wholesale-intro__title-block">
          <span class="wholesale-intro__quote wholesale-intro__quote--open" aria-hidden="true">&#10077;</span>
          <h2 class="wholesale-intro__title">
            <template v-if="data.titleSegments?.length">
              <span
                v-for="(seg, i) in data.titleSegments"
                :key="i"
                :class="['wholesale-intro__title-seg', { 'is-highlight': seg.highlight }]"
              >{{ seg.text }}</span>
            </template>
            <template v-else>{{ data.title }}</template>
          </h2>
          <span class="wholesale-intro__quote wholesale-intro__quote--close" aria-hidden="true">&#10078;</span>
        </div>

        <p class="wholesale-intro__description">
          <template v-if="data.descriptionSegments?.length">
            <span
              v-for="(seg, i) in data.descriptionSegments"
              :key="i"
              :class="['wholesale-intro__desc-seg', { 'is-highlight': seg.highlight }]"
            >{{ seg.text }}</span>
          </template>
          <template v-else>{{ data.description }}</template>
        </p>
      </div>

      <NuxtImg
        v-if="data.mascotImage"
        :src="data.mascotImage"
        :alt="data.mascotAlt"
        class="wholesale-intro__mascot"
        format="webp"
        width="240"
        quality="80"
        loading="lazy"
      />
    </div>
  </section>
</template>

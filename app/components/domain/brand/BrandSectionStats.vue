<script setup>
defineProps({
  data: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <section class="brand-stats">
    <div class="brand-stats__inner">
      <header class="brand-stats__head">
        <h2 class="brand-stats__title">
          <template v-if="data.titleSegments?.length">
            <span
              v-for="(seg, i) in data.titleSegments"
              :key="i"
              :class="['brand-stats__title-seg', { 'is-highlight': seg.highlight }]"
            >{{ seg.text }}</span>
          </template>
          <template v-else>{{ data.title }}</template>
        </h2>
        <p class="brand-stats__description">{{ data.description }}</p>
      </header>

      <ul class="brand-stats__list">
        <li
          v-for="item in data.items"
          :key="item.id"
          class="brand-stats__item"
        >
          <div class="brand-stats__value">
            <span class="brand-stats__value-text">{{ item.value }}</span>
            <IconStar v-if="item.icon === 'star'" size="md" color="filled" decorative class="brand-stats__value-icon" />
          </div>
          <p class="brand-stats__label">{{ item.label }}</p>
        </li>
      </ul>
    </div>
  </section>
</template>

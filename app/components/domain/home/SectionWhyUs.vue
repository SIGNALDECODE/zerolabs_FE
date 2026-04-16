<script setup>
defineProps({
  data: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <section class="section-why-us">
    <div class="section-why-us__inner">
      <header class="section-why-us__head">
        <p class="section-why-us__eyebrow">{{ data.eyebrow }}</p>
        <h2 class="section-why-us__title">{{ data.title }}</h2>
        <p class="section-why-us__desc">{{ data.description }}</p>
      </header>

      <ul class="section-why-us__grid">
        <li
          v-for="item in data.items"
          :key="item.id"
          class="section-why-us__item"
        >
          <div class="section-why-us__icon" :data-icon="item.icon" aria-hidden="true" />
          <h3 class="section-why-us__item-title">{{ item.title }}</h3>
          <p class="section-why-us__item-desc">{{ item.description }}</p>
        </li>
      </ul>
    </div>
  </section>
</template>

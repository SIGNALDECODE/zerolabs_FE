<script setup>
defineProps({
  data: {
    type: Object,
    required: true
  },
  markData: {
    type: Object,
    default: () => ({})
  }
})
</script>

<template>
  <section class="section-reasons">
    <div class="section-reasons__inner">
      <header class="section-reasons__head">
        <p class="section-reasons__eyebrow">{{ data.eyebrow }}</p>
        <h2 class="section-reasons__title">{{ data.title }}</h2>
        <p v-if="data.description" class="section-reasons__description">{{ data.description }}</p>
      </header>
      <ul class="section-reasons__grid">
        <li
          v-for="item in data.items"
          :key="item.id"
          class="section-reasons__card"
        >
          <div class="section-reasons__icon" aria-hidden="true">
            <img
              v-if="item.iconImage"
              :src="item.iconImage"
              alt=""
              class="section-reasons__icon-image"
            />
            <span v-else class="section-reasons__icon-dot" />
          </div>
          <h3 class="section-reasons__card-title">{{ item.title }}</h3>
        </li>
      </ul>
    </div>
    <p v-if="markData.text" class="section-reasons__mark" aria-hidden="true">{{ markData.text }}</p>
  </section>
</template>

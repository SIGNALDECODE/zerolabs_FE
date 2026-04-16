<script setup>
defineProps({
  data: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <section class="section-member-benefit">
    <div class="section-member-benefit__inner">
      <header class="section-member-benefit__head">
        <p class="section-member-benefit__eyebrow">{{ data.eyebrow }}</p>
        <h2 class="section-member-benefit__title">{{ data.title }}</h2>
        <p class="section-member-benefit__desc">{{ data.description }}</p>
      </header>

      <ul class="section-member-benefit__grid">
        <li
          v-for="item in data.items"
          :key="item.id"
          class="section-member-benefit__item"
        >
          <span class="section-member-benefit__badge">{{ item.badge }}</span>
          <h3 class="section-member-benefit__item-title">{{ item.title }}</h3>
          <p class="section-member-benefit__item-desc">{{ item.description }}</p>
        </li>
      </ul>
    </div>
  </section>
</template>

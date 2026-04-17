<script setup>
defineProps({
  data: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <section class="wholesale-contact">
    <div class="wholesale-contact__inner">
      <header class="wholesale-contact__head">
        <p class="wholesale-contact__eyebrow">{{ data.eyebrow }}</p>
        <h2 class="wholesale-contact__title">{{ data.title }}</h2>
        <p class="wholesale-contact__description">{{ data.description }}</p>
      </header>

      <ul class="wholesale-contact__list">
        <li
          v-for="card in data.cards"
          :key="card.id"
          class="wholesale-contact__card"
        >
          <a
            :href="card.href"
            class="wholesale-contact__link"
            :aria-label="`${card.label} ${card.value}`"
          >
            <span class="wholesale-contact__icon" aria-hidden="true">
              <img
                :src="card.iconImage"
                :alt="card.iconAlt || ''"
                class="wholesale-contact__icon-image"
                loading="lazy"
                width="24"
                height="24"
              />
            </span>
            <span class="wholesale-contact__body">
              <strong class="wholesale-contact__value">{{ card.value }}</strong>
              <span class="wholesale-contact__note">{{ card.note }}</span>
            </span>
          </a>
        </li>
      </ul>
    </div>
  </section>
</template>

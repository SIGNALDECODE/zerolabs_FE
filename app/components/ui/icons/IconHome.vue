<script setup>
defineProps({
  size: {
    type: String,
    default: '2xl'
  },
  color: {
    type: String,
    default: 'default',
    validator: (v) => ['default', 'light'].includes(v)
  }
})

const label = '홈'
</script>

<template>
  <BaseIcon :size="size" :color="color" :label="label">
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M5.333 13.333L16 5.333l10.667 8v12a1.333 1.333 0 0 1-1.333 1.333H6.667a1.333 1.333 0 0 1-1.334-1.333v-12Z"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linejoin="round"
      />
      <path
        d="M12 26.667v-6.667a1.333 1.333 0 0 1 1.333-1.333h5.334A1.333 1.333 0 0 1 20 20v6.667"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linejoin="round"
      />
    </svg>
  </BaseIcon>
</template>

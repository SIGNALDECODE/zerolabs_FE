<script setup>
import iconsData from '~/data/common/icons.json'

const props = defineProps({
  size: {
    type: String,
    default: 'sm',
    validator: (v) => ['xs', 'sm', 'md', 'lg'].includes(v)
  },
  color: {
    type: String,
    default: 'default'
  }
})

const label = iconsData.sort.label
</script>

<template>
  <BaseIcon :size="size" :color="color" :label="label">
    <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M4 5H16"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
      />
      <path
        d="M6 10H14"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
      />
      <path
        d="M8 15H12"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
      />
    </svg>
  </BaseIcon>
</template>

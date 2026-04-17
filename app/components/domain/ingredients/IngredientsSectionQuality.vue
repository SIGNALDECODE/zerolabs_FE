<script setup>
const props = defineProps({
  data: {
    type: Object,
    required: true
  },
  interval: {
    type: Number,
    default: 2500
  }
})

const activeIndex = ref(0)
const total = computed(() => props.data.items?.length || 0)

const sectionRef = ref(null)
let timer = null
let io = null
let isVisible = false

const tick = () => {
  if (total.value <= 1) return
  activeIndex.value = (activeIndex.value + 1) % total.value
}

const start = () => {
  stop()
  if (total.value <= 1) return
  // 사용자가 애니메이션 축소를 선호하면 순환 비활성화
  if (typeof window !== 'undefined'
    && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return
  timer = setInterval(tick, props.interval)
}
const stop = () => {
  if (timer) { clearInterval(timer); timer = null }
}

onMounted(() => {
  if (!sectionRef.value) return
  io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      isVisible = entry.isIntersecting
      if (isVisible) start()
      else stop()
    })
  }, { threshold: 0.2 })
  io.observe(sectionRef.value)
})

onUnmounted(() => {
  stop()
  io?.disconnect()
})
</script>

<template>
  <section ref="sectionRef" class="ingredients-quality">
    <div class="ingredients-quality__inner">
      <header class="ingredients-quality__head">
        <p class="ingredients-quality__eyebrow">{{ data.eyebrow }}</p>
        <h2 class="ingredients-quality__title">
          <template v-if="data.titleSegments?.length">
            <span
              v-for="(seg, i) in data.titleSegments"
              :key="i"
              :class="['ingredients-quality__title-seg', { 'is-highlight': seg.highlight }]"
            >{{ seg.text }}</span>
          </template>
          <template v-else>{{ data.title }}</template>
        </h2>
        <p class="ingredients-quality__description">{{ data.description }}</p>
      </header>

      <div class="ingredients-quality__grid">
        <div class="ingredients-quality__media">
          <NuxtImg
            :src="data.backgroundImage"
            :alt="data.backgroundImageAlt"
            class="ingredients-quality__image"
            format="webp"
            sizes="(max-width: 768px) 92vw, (max-width: 1024px) 88vw, 720px"
            densities="x1 x2"
            quality="85"
            loading="lazy"
          />
        </div>
        <ul class="ingredients-quality__steps" role="list">
          <li
            v-for="(item, index) in data.items"
            :key="item.id"
            :class="['ingredients-quality__step', { 'is-active': index === activeIndex }]"
            :aria-current="index === activeIndex ? 'step' : undefined"
          >
            <div class="ingredients-quality__step-head">
              <span class="ingredients-quality__step-label">{{ item.label }}</span>
              <span class="ingredients-quality__step-title">{{ item.title }}</span>
            </div>
            <p class="ingredients-quality__step-desc">{{ item.description }}</p>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

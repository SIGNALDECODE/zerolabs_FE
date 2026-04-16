<script setup>
const props = defineProps({
  data: {
    type: Object,
    required: true
  },
  products: {
    type: Array,
    default: () => []
  }
})

const visibleItems = ref(3)
const currentIndex = ref(0)
const itemWidth = ref(0)
const gap = 28
const sliderRef = ref(null)

const { swipeEvents: sliderSwipeEvents } = useSwipe({
  onSwipeLeft: () => nextSlide(),
  onSwipeRight: () => prevSlide()
})

const maxIndex = computed(() =>
  Math.max(0, props.products.length - visibleItems.value)
)
const canGoPrev = computed(() => currentIndex.value > 0)
const canGoNext = computed(() => currentIndex.value < maxIndex.value)

const sliderStyle = computed(() => ({
  transform: `translateX(-${currentIndex.value * (itemWidth.value + gap)}px)`
}))

const nextSlide = () => { if (canGoNext.value) currentIndex.value++ }
const prevSlide = () => { if (canGoPrev.value) currentIndex.value-- }

const updateLayout = () => {
  if (!sliderRef.value) return
  if (window.innerWidth >= 1024) visibleItems.value = 3
  else if (window.innerWidth >= 640) visibleItems.value = 2
  else visibleItems.value = 1
  const containerWidth = sliderRef.value.offsetWidth
  itemWidth.value = (containerWidth - gap * (visibleItems.value - 1)) / visibleItems.value
  if (currentIndex.value > maxIndex.value) currentIndex.value = maxIndex.value
}

let resizeTimer = null
const debouncedUpdate = () => {
  clearTimeout(resizeTimer)
  resizeTimer = setTimeout(updateLayout, 150)
}

onMounted(() => {
  updateLayout()
  window.addEventListener('resize', debouncedUpdate, { passive: true })
})
onUnmounted(() => {
  clearTimeout(resizeTimer)
  window.removeEventListener('resize', debouncedUpdate)
})
</script>

<template>
  <section class="section-new-arrivals">
    <div class="section-new-arrivals__title-bg" aria-hidden="true" />

    <div class="section-new-arrivals__inner">
      <div class="section-new-arrivals__head">
        <div class="section-new-arrivals__titles">
          <p class="section-new-arrivals__eyebrow">{{ data.eyebrow }}</p>
          <div class="section-new-arrivals__title-group">
            <h2 class="section-new-arrivals__title">{{ data.title }}</h2>
            <p v-if="data.description" class="section-new-arrivals__description">{{ data.description }}</p>
          </div>
        </div>
        <NuxtLink v-if="data.ctaHref" :to="data.ctaHref" class="section-new-arrivals__cta">
          {{ data.ctaLabel }}
        </NuxtLink>
        <div v-if="products.length > visibleItems" class="section-new-arrivals__controls">
          <IconSlideButton
            direction="prev"
            :disabled="!canGoPrev"
            :aria-label="data.arrowLabels?.prev"
            @click="prevSlide"
          />
          <IconSlideButton
            direction="next"
            :disabled="!canGoNext"
            :aria-label="data.arrowLabels?.next"
            @click="nextSlide"
          />
        </div>
      </div>

      <div
        v-if="products.length"
        class="section-new-arrivals__cards"
        v-on="sliderSwipeEvents"
      >
        <div ref="sliderRef" class="section-new-arrivals__viewport">
          <div class="section-new-arrivals__track" :style="sliderStyle">
            <ProductCard
              v-for="product in products"
              :key="product.id"
              :product="product"
              class="section-new-arrivals__item"
              :style="{ width: itemWidth > 0 ? `${itemWidth}px` : undefined }"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

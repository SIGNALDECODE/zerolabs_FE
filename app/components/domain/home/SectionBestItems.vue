<script setup>
const props = defineProps({
  data: {
    type: Object,
    required: true
  },
  products: {
    type: Array,
    default: () => []
  },
  loading: {
    type: Boolean,
    default: false
  }
})

const activeChipId = ref(props.data.chips?.[0]?.id ?? 'all')
const chips = computed(() => props.data.chips ?? [])

const sliderRef = ref(null)
const currentIndex = ref(0)
const itemWidth = ref(0)
const visibleItems = ref(4)
const gap = 28
const isReady = ref(false)

// Touch/Swipe
const { swipeEvents: sliderSwipeEvents } = useSwipe({
  onSwipeLeft: () => nextSlide(),
  onSwipeRight: () => prevSlide()
})

const maxIndex = computed(() => {
  return Math.max(0, props.products.length - visibleItems.value)
})

const canGoPrev = computed(() => currentIndex.value > 0)
const canGoNext = computed(() => currentIndex.value < maxIndex.value)

const nextSlide = () => {
  if (canGoNext.value) {
    currentIndex.value++
  }
}

const prevSlide = () => {
  if (canGoPrev.value) {
    currentIndex.value--
  }
}

const sliderStyle = computed(() => ({
  transform: `translateX(-${currentIndex.value * (itemWidth.value + gap)}px)`
}))

const updateItemWidth = () => {
  if (sliderRef.value) {
    const containerWidth = sliderRef.value.parentElement.offsetWidth
    if (window.innerWidth >= 1024) {
      visibleItems.value = 4
    } else if (window.innerWidth >= 768) {
      visibleItems.value = 3
    } else {
      visibleItems.value = 2
    }
    itemWidth.value = (containerWidth - gap * (visibleItems.value - 1)) / visibleItems.value
  }
}

let resizeTimer = null
const debouncedUpdate = () => {
  clearTimeout(resizeTimer)
  resizeTimer = setTimeout(updateItemWidth, 150)
}

// 스켈레톤 표시 조건: 로딩 중이거나 상품이 없음
const showSkeleton = computed(() => {
  return props.loading || props.products.length === 0
})

onMounted(() => {
  updateItemWidth()
  isReady.value = true
  window.addEventListener('resize', debouncedUpdate, { passive: true })
})

onUnmounted(() => {
  clearTimeout(resizeTimer)
  window.removeEventListener('resize', debouncedUpdate)
})
</script>

<template>
  <section class="section-best-items">
    <div class="section-best-items__inner">
      <div class="section-best-items__header">
        <div class="section-best-items__titles">
          <p v-if="data.eyebrow" class="section-best-items__eyebrow">{{ data.eyebrow }}</p>
          <h2 class="section-best-items__title">{{ data.title }}</h2>
          <p v-if="data.subtitle" class="section-best-items__subtitle">{{ data.subtitle }}</p>
        </div>
        <div class="section-best-items__controls">
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
      <div v-if="chips.length" class="section-best-items__chips" role="tablist">
        <button
          v-for="chip in chips"
          :key="chip.id"
          type="button"
          role="tab"
          class="section-best-items__chip"
          :class="{ 'is-active': chip.id === activeChipId }"
          :aria-selected="chip.id === activeChipId"
          @click="activeChipId = chip.id"
        >
          {{ chip.label }}
        </button>
      </div>
      <div
        class="section-best-items__slider-wrap"
        v-on="sliderSwipeEvents"
      >
        <!-- 스켈레톤 -->
        <div v-if="showSkeleton" class="section-best-items__skeleton">
          <div
            v-for="i in visibleItems"
            :key="i"
            class="section-best-items__skeleton-item"
            :style="itemWidth ? { width: itemWidth + 'px' } : {}"
          >
            <div class="section-best-items__skeleton-image"></div>
            <div class="section-best-items__skeleton-text"></div>
            <div class="section-best-items__skeleton-text--short"></div>
          </div>
        </div>
        <!-- 실제 슬라이더 -->
        <div
          v-show="!showSkeleton"
          ref="sliderRef"
          class="section-best-items__slider"
          :style="sliderStyle"
        >
          <ProductCard
            v-for="product in products"
            :key="product.id"
            :product="product"
            class="section-best-items__item"
            :style="{ width: itemWidth + 'px' }"
          />
          <!-- 더보기 카드 (기존 portfolio 스타일, viewAllHref 있을 때만) -->
          <NuxtLink
            v-if="data.viewAllHref"
            :to="data.viewAllHref"
            class="section-best-items__item section-best-items__more-card"
            :style="{ width: itemWidth + 'px' }"
          >
            <span class="section-best-items__more-label">더 많은 상품 확인하기</span>
            <span class="section-best-items__more-icon">→</span>
          </NuxtLink>
        </div>
      </div>
      <!-- 하단 CTA 버튼 -->
      <NuxtLink
        v-if="data.ctaHref"
        :to="data.ctaHref"
        class="section-best-items__cta"
      >
        {{ data.ctaLabel }}
      </NuxtLink>
    </div>
  </section>
</template>

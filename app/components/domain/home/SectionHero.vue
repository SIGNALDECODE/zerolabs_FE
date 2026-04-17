<script setup>
import mainData from '~/data/common/main.json'

const props = defineProps({
  data: {
    type: Object,
    required: true
  },
  slides: {
    type: Array,
    default: () => []
  },
  autoPlay: {
    type: Boolean,
    default: true
  },
  interval: {
    type: Number,
    default: 5000
  }
})

const arrowLabels = mainData.hero.arrowLabels
const playLabel = mainData.hero.playLabel
const pauseLabel = mainData.hero.pauseLabel

const sliderRef = ref(null)
const currentIndex = ref(0)
const isAnimating = ref(false)
const totalSlides = computed(() => props.slides.length || 1)

// Clone first and last slides for infinite effect
const extendedSlides = computed(() => {
  if (props.slides.length <= 1) return props.slides
  return [
    props.slides[props.slides.length - 1], // Clone of last
    ...props.slides,
    props.slides[0] // Clone of first
  ]
})

// Real slide index for display (1-based for indicator)
const displayIndex = computed(() => {
  if (currentIndex.value < 0) return totalSlides.value
  if (currentIndex.value >= totalSlides.value) return 1
  return currentIndex.value + 1
})

const isPaused = ref(false)
let autoPlayTimer = null

const goToSlide = (index, animate = true) => {
  if (isAnimating.value) return

  if (animate) {
    isAnimating.value = true
  }
  currentIndex.value = index
}

const nextSlide = () => {
  goToSlide(currentIndex.value + 1)
}

const prevSlide = () => {
  goToSlide(currentIndex.value - 1)
}

const sliderStyle = computed(() => {
  // 슬라이드가 1개 이하면 translateX 없음
  if (props.slides.length <= 1) {
    return {}
  }
  return {
    transform: `translateX(-${(currentIndex.value + 1) * 100}%)`,
    transition: isAnimating.value ? 'transform 0.5s ease-out' : 'none'
  }
})

const handleTransitionEnd = () => {
  isAnimating.value = false

  // Jump to real position without animation
  if (currentIndex.value >= totalSlides.value) {
    currentIndex.value = 0
  } else if (currentIndex.value < 0) {
    currentIndex.value = totalSlides.value - 1
  }
}

const startAutoPlay = () => {
  stopAutoPlay()
  if (props.autoPlay && totalSlides.value > 1) {
    autoPlayTimer = setInterval(nextSlide, props.interval)
  }
}

const stopAutoPlay = () => {
  if (autoPlayTimer) {
    clearInterval(autoPlayTimer)
    autoPlayTimer = null
  }
}

const togglePause = () => {
  if (isPaused.value) {
    isPaused.value = false
    startAutoPlay()
  } else {
    isPaused.value = true
    stopAutoPlay()
  }
}

// 모바일 터치 스와이프
const { swipeEvents: heroSwipeEvents, mouseEvents: heroMouseEvents, onClickCapture: heroClickCapture } = useSwipe({
  onSwipeLeft: () => { nextSlide(); startAutoPlay() },
  onSwipeRight: () => { prevSlide(); startAutoPlay() }
})

onMounted(() => {
  startAutoPlay()
})

onUnmounted(() => {
  stopAutoPlay()
})
</script>

<template>
  <section class="section-hero">
    <div
      ref="sliderRef"
      class="section-hero__slider"
      :style="sliderStyle"
      @transitionend="handleTransitionEnd"
      @touchstart="(e) => { stopAutoPlay(); heroSwipeEvents.touchstart(e) }"
      @touchmove="heroSwipeEvents.touchmove"
      @touchend="heroSwipeEvents.touchend"
      @mousedown="(e) => { stopAutoPlay(); heroMouseEvents.mousedown(e) }"
      @mousemove="heroMouseEvents.mousemove"
      @mouseup="(e) => { heroMouseEvents.mouseup(e); startAutoPlay() }"
      @mouseleave="(e) => { heroMouseEvents.mouseleave(e); startAutoPlay() }"
      @dragstart.prevent
      @click.capture="heroClickCapture"
    >
      <div
        v-for="(slide, index) in extendedSlides"
        :key="'slide-' + index"
        class="section-hero__slide"
      >
        <component
          :is="(slide.linkUrl || slide.href) ? 'a' : 'div'"
          :href="slide.linkUrl || slide.href || undefined"
          :target="(slide.linkUrl || slide.href) ? (slide.linkTarget || '_self') : undefined"
          :rel="slide.linkTarget === '_blank' ? 'noopener noreferrer' : undefined"
          class="section-hero__slide-link"
        >
          <NuxtImg
            :src="slide.imageUrl || slide.image"
            :alt="slide.title || slide.imageAlt"
            class="section-hero__image"
            format="webp"
            sizes="xs:100vw sm:100vw md:100vw lg:100vw xl:1920px 2xl:2560px"
            densities="x1 x2"
            quality="75"
            :loading="index <= 1 ? 'eager' : 'lazy'"
            :fetchpriority="index <= 1 ? 'high' : 'auto'"
          />
        </component>
      </div>
    </div>
    <!-- 심플 화살표 (chevron only) -->
    <div v-if="totalSlides > 1" class="section-hero__arrows">
      <button
        type="button"
        class="section-hero__arrow section-hero__arrow--left"
        :aria-label="arrowLabels.prev"
        @click="prevSlide"
      >
        <img src="/images/icons/pre_btn.svg" :alt="arrowLabels.prev" class="section-hero__arrow-icon">
      </button>
      <button
        type="button"
        class="section-hero__arrow section-hero__arrow--right"
        :aria-label="arrowLabels.next"
        @click="nextSlide"
      >
        <img src="/images/icons/next_btn.svg" :alt="arrowLabels.next" class="section-hero__arrow-icon">
      </button>
    </div>

    <!-- 슬라이드 프로그레스 + 재생/일시정지 -->
    <div v-if="totalSlides > 1" class="section-hero__indicator">
      <div
        class="section-hero__track"
        role="progressbar"
        :aria-valuenow="displayIndex"
        :aria-valuemin="1"
        :aria-valuemax="totalSlides"
        :aria-label="playLabel"
      >
        <div
          class="section-hero__track-fill"
          :style="{ width: `${(displayIndex / totalSlides) * 100}%` }"
        />
      </div>
      <button
        type="button"
        class="section-hero__play-btn"
        :aria-label="isPaused ? playLabel : pauseLabel"
        @click="togglePause"
      >
        <img
          v-if="!isPaused"
          src="/images/icons/Play_stop.svg"
          :alt="pauseLabel"
          class="section-hero__play-icon"
        >
        <svg
          v-else
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          class="section-hero__play-icon"
          aria-hidden="true"
        >
          <path d="M6 4.5L15 10L6 15.5V4.5Z" fill="white" stroke="white" stroke-width="1.5" stroke-linejoin="round"/>
        </svg>
      </button>
    </div>
  </section>
</template>

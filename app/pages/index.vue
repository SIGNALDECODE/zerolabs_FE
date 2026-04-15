<script setup>
import mainData from '~/data/main.json'
import homeData from '~/data/home.json'
import mockProducts from '~/data/mock-products.json'

useHead({ title: mainData.seo.title })
useSeoMeta({
  title: mainData.seo.title,
  description: mainData.seo.description || '',
  ogTitle: mainData.seo.title,
  ogDescription: mainData.seo.description || '',
  ogImage: mainData.seo.ogImage
})

const pending = ref(false)
const heroSlides = computed(() => mainData.hero.slides)

const bestActiveChip = ref('all')
const chipCategoryMap = {
  all: null,
  jerky: '져키',
  cereal: '시리얼',
  chewing: '추잉껌'
}
const bestProducts = computed(() => {
  const base = mockProducts.products.filter(p => p.isBest)
  const cat = chipCategoryMap[bestActiveChip.value]
  const filtered = cat ? base.filter(p => p.category === cat) : base
  return filtered.slice(0, 4)
})

const newArrivalProducts = computed(() =>
  mockProducts.products.filter(p => p.isNew).slice(0, 3)
)

let observer
onMounted(() => {
  nextTick(() => {
    const targets = document.querySelectorAll('.reveal')
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle('is-visible', entry.isIntersecting)
        })
      },
      { threshold: 0.15 }
    )
    targets.forEach((t) => observer.observe(t))
  })
})
onUnmounted(() => observer?.disconnect())
</script>

<template>
  <div class="page-main">
    <div class="page-main__hero-wrap">
      <SectionHero
        :data="mainData.hero"
        :slides="heroSlides"
      />
    </div>

    <main>
      <SectionBestItems
        class="reveal"
        :data="homeData.best"
        :products="bestProducts"
        :loading="pending"
      />

      <SectionBandBanner
        class="reveal"
        :data="homeData.bandBanner"
      />

      <SectionNewArrivals
        class="reveal"
        :data="homeData.newArrivals"
        :products="newArrivalProducts"
      />

      <SectionWholesale
        class="reveal"
        :data="homeData.wholesale"
      />

      <SectionReasons
        class="reveal"
        :data="homeData.reasons"
        :mark-data="homeData.brandMark"
      />

      <SectionPhilosophy
        class="reveal"
        :data="homeData.philosophy"
      />
    </main>
  </div>
</template>

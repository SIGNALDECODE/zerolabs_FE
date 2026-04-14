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

const bestProducts = computed(() =>
  mockProducts.products.filter(p => p.isBest)
)
const newProducts = computed(() =>
  mockProducts.products.filter(p => p.isNew)
)
const trialProducts = computed(() =>
  mockProducts.products.filter(p => p.category === '체험팩')
)
const pickProducts = computed(() => mockProducts.products.slice(0, 8))

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
    targets.forEach((target) => observer.observe(target))
  })
})

onUnmounted(() => {
  observer?.disconnect()
})
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
      <SectionWhyUs
        class="reveal"
        :data="homeData.whyUs"
      />

      <SectionBestItems
        class="reveal"
        :data="mainData.section1"
        :products="bestProducts"
        :loading="pending"
      />

      <SectionMemberBenefit
        class="reveal"
        :data="homeData.memberBenefit"
      />

      <SectionBestItems
        class="reveal"
        :data="mainData.section2"
        :products="newProducts"
        :loading="pending"
      />

      <SectionBrandStory
        class="reveal"
        :data="homeData.brandStory"
      />

      <SectionBestItems
        class="reveal"
        :data="mainData.section3"
        :products="trialProducts"
        :loading="pending"
      />

      <SectionBestItems
        class="reveal"
        :data="mainData.section4"
        :products="pickProducts"
        :loading="pending"
      />
    </main>
  </div>
</template>

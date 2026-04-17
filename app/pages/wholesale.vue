<script setup>
import wholesaleData from '~/data/wholesale/wholesale.json'

useHead({ title: wholesaleData.seo.title })
useSeoMeta({
  title: wholesaleData.seo.title,
  description: wholesaleData.seo.description,
  ogTitle: wholesaleData.seo.ogTitle,
  ogDescription: wholesaleData.seo.ogDescription,
  ogImage: wholesaleData.seo.ogImage
})

let observer
onMounted(() => {
  nextTick(() => {
    const targets = document.querySelectorAll('.wholesale .reveal')
    if (!targets.length) return
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
  <div class="wholesale">
    <WholesaleSectionHero :data="wholesaleData.hero" />
    <main>
      <WholesaleSectionIntro class="reveal" :data="wholesaleData.intro" />
      <WholesaleSectionReasons class="reveal" :data="wholesaleData.reasons" />
      <WholesaleSectionProcess class="reveal" :data="wholesaleData.process" />
      <WholesaleSectionContact class="reveal" :data="wholesaleData.contact" />
    </main>
  </div>
</template>

<script setup>
import brandStory from '~/data/brand/brand-story.json'

useHead({ title: brandStory.seo.title })
useSeoMeta({
  title: brandStory.seo.title,
  description: brandStory.seo.description,
  ogTitle: brandStory.seo.ogTitle,
  ogDescription: brandStory.seo.ogDescription,
  ogImage: brandStory.seo.ogImage
})

let observer
onMounted(() => {
  nextTick(() => {
    const targets = document.querySelectorAll('.brand-story .reveal')
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
  <div class="brand-story">
    <BrandSectionHero :data="brandStory.hero" />
    <main>
      <BrandSectionPromise class="reveal" :data="brandStory.promise" />
      <BrandSectionStats class="reveal" :data="brandStory.stats" />
      <BrandSectionIngredients class="reveal" :data="brandStory.ingredients" />
      <BrandSectionCta class="reveal" :data="brandStory.cta" />
    </main>
  </div>
</template>

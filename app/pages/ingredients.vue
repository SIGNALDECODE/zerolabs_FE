<script setup>
import ingredientsData from '~/data/ingredients/ingredients.json'

useHead({ title: ingredientsData.seo.title })
useSeoMeta({
  title: ingredientsData.seo.title,
  description: ingredientsData.seo.description,
  ogTitle: ingredientsData.seo.ogTitle,
  ogDescription: ingredientsData.seo.ogDescription,
  ogImage: ingredientsData.seo.ogImage
})

let observer
onMounted(() => {
  nextTick(() => {
    const targets = document.querySelectorAll('.ingredients .reveal')
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
  <div class="ingredients">
    <IngredientsSectionHero :data="ingredientsData.hero" />
    <main>
      <IngredientsSectionIntro class="reveal" :data="ingredientsData.intro" />
      <IngredientsSectionPrinciples class="reveal" :data="ingredientsData.principles" />
      <IngredientsSectionKey class="reveal" :data="ingredientsData.keyIngredients" />
      <IngredientsSectionQuality class="reveal" :data="ingredientsData.quality" />
      <BrandSectionCta class="reveal" :data="ingredientsData.cta" />
    </main>
  </div>
</template>

<script setup>
import bestData from '~/data/product/best.json'
import mockData from '~/data/home/mock-products.json'

useHead({ title: bestData.seo.title })
useSeoMeta({
  title: bestData.seo.title,
  description: bestData.seo.description,
  ogTitle: bestData.seo.title,
  ogDescription: bestData.seo.description,
  ogImage: bestData.seo.ogImage
})

const PAGE_SIZE = 12

const sortValue = ref('latest')
const currentPage = ref(1)

const baseProducts = computed(() => mockData.products.filter((p) => p.isBest))

const sortedProducts = computed(() => {
  const list = [...baseProducts.value]
  switch (sortValue.value) {
    case 'price_asc':
      return list.sort((a, b) => a.price - b.price)
    case 'price_desc':
      return list.sort((a, b) => b.price - a.price)
    case 'popular':
      return list.sort((a, b) => b.reviewCount - a.reviewCount)
    default:
      return list
  }
})

const totalCount = computed(() => sortedProducts.value.length)
const totalPages = computed(() => Math.max(1, Math.ceil(totalCount.value / PAGE_SIZE)))

const pagedProducts = computed(() => {
  const start = (currentPage.value - 1) * PAGE_SIZE
  return sortedProducts.value.slice(start, start + PAGE_SIZE)
})

watch(sortValue, () => {
  currentPage.value = 1
})
</script>

<template>
  <LayoutProductList
    :title="bestData.page.title"
    :total-count="totalCount"
    :labels="bestData.page"
    :sort-options="bestData.page.sortOptions"
    v-model:sort="sortValue"
    v-model:current-page="currentPage"
  >
    <ProductCard
      v-for="product in pagedProducts"
      :key="product.id"
      :product="product"
    />

    <template #pagination>
      <BasePagination
        v-if="totalPages > 1"
        v-model:current-page="currentPage"
        :total-pages="totalPages"
        :prev-label="bestData.page.pagination.prevLabel"
        :next-label="bestData.page.pagination.nextLabel"
        class="layout-product-list__pagination"
      />
    </template>
  </LayoutProductList>
</template>

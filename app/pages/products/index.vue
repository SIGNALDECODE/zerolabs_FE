<script setup>
import productsData from '~/data/products.json'
import mockData from '~/data/mock-products.json'

useHead({ title: productsData.seo.title })
useSeoMeta({
  title: productsData.seo.title,
  description: productsData.seo.description,
  ogTitle: productsData.seo.title,
  ogDescription: productsData.seo.description,
  ogImage: productsData.seo.ogImage
})

const PAGE_SIZE = 12

const activeTab = ref('all')
const sortValue = ref('latest')
const currentPage = ref(1)

const filteredProducts = computed(() => {
  if (activeTab.value === 'all') return mockData.products
  return mockData.products.filter((p) => p.category === activeTab.value)
})

const sortedProducts = computed(() => {
  const list = [...filteredProducts.value]
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

const handleTabChange = (value) => {
  activeTab.value = value
  currentPage.value = 1
}

watch(sortValue, () => {
  currentPage.value = 1
})
</script>

<template>
  <LayoutProductList
    :title="productsData.page.title"
    :total-count="totalCount"
    :labels="productsData.page"
    :sort-options="productsData.page.sortOptions"
    :tabs="productsData.page.tabs"
    :tabs-aria-label="productsData.page.tabsAriaLabel"
    :active-tab="activeTab"
    v-model:sort="sortValue"
    v-model:current-page="currentPage"
    @tab-change="handleTabChange"
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
        :prev-label="productsData.page.pagination.prevLabel"
        :next-label="productsData.page.pagination.nextLabel"
        class="layout-product-list__pagination"
      />
    </template>
  </LayoutProductList>
</template>

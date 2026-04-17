<script setup>
import searchData from '~/data/common/search.json'

const route = useRoute()
const router = useRouter()

// URL query 기반 검색어 (결과용)
const searchQuery = computed(() => route.query.q || '')

// 입력창 v-model (URL과 분리 — 제출 시점에만 URL 갱신)
const inputQuery = ref(searchQuery.value)
watch(searchQuery, (v) => { inputQuery.value = v })

const submitSearch = (value) => {
  const trimmed = (value ?? inputQuery.value).trim()
  if (!trimmed) return
  if (trimmed === searchQuery.value) return
  router.push({ path: '/search', query: { q: trimmed } })
}

// SEO
useHead({ title: searchQuery.value
  ? `'${searchQuery.value}' ${searchData.seo.title}`
  : searchData.page.titleWithoutQuery })
useSeoMeta({
  title: searchQuery.value
    ? `'${searchQuery.value}' ${searchData.seo.title}`
    : searchData.page.titleWithoutQuery,
  description: searchData.seo.description
})

// API
const { products, totalCount, pending, searchProducts } = useSearch()

// 검색 실행
const loadResults = async () => {
  if (!searchQuery.value) return
  await searchProducts({
    keyword: searchQuery.value,
    limit: 30
  })
}

// 검색어 변경 시 재검색
watch(searchQuery, () => {
  loadResults()
}, { immediate: true })
</script>

<template>
  <div class="page-search">
    <main class="page-search__main">
      <div class="page-search__container">
        <div class="page-search__header">
          <h1 class="page-search__title">
            <template v-if="searchQuery">
              '<strong>{{ searchQuery }}</strong>' {{ searchData.page.titleWithQuery }}
            </template>
            <template v-else>
              {{ searchData.page.titleWithoutQuery }}
            </template>
          </h1>
          <p v-if="searchQuery" class="page-search__count">{{ totalCount }}{{ searchData.page.countSuffix }}</p>
        </div>

        <div class="page-search__input-wrap">
          <BaseSearchInput
            v-model="inputQuery"
            :placeholder="searchData.page.inputPlaceholder"
            :close-label="searchData.page.resetLabel"
            @submit="submitSearch"
          />
        </div>

        <div v-if="pending" class="page-search__loading">
          <BaseSpinner />
        </div>

        <template v-else>
          <div v-if="products.length > 0" class="page-search__grid">
            <ProductCard
              v-for="product in products"
              :key="product.id"
              :product="product"
            />
          </div>

          <BaseEmpty
            v-if="searchQuery && products.length === 0"
            :message="searchData.page.emptyResult"
          />

          <div v-if="!searchQuery" class="page-search__empty">
            <p>{{ searchData.page.emptyQuery }}</p>
          </div>
        </template>
      </div>
    </main>
  </div>
</template>

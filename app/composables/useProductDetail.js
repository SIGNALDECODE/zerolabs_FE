import mockProducts from '~/data/home/mock-products.json'
import productDetails from '~/data/product/product-details.json'

/**
 * 상품 상세 composable (mock 모드)
 * - mock-products.json 의 기본 정보와 product-details.json 의 상세 데이터를 병합
 * - 추후 실제 API 연동 시 이 composable 만 교체
 */
export const useProductDetail = (productId) => {
  const defaults = productDetails.defaults || {}
  const overridesMap = productDetails.overrides || {}

  const resolved = computed(() => {
    const id = unref(productId)
    const base = mockProducts.products.find((p) => p.id === id)
    if (!base) return null

    const overrides = overridesMap[id] || {}
    const merged = { ...defaults, ...overrides }

    const galleryImages = overrides.images || [
      base.image,
      ...(merged.detailImages || [])
    ].filter(Boolean)

    return {
      id: base.id,
      name: base.name,
      subtitle: merged.subtitle || base.description,
      description: base.description,
      brand: '제로랩스',
      category: base.category,
      price: base.price,
      originalPrice: base.originalPrice,
      discount: base.discountRate || 0,
      currency: base.currency || '원',
      promotion: base.originalPrice ? merged.promotion : null,
      rating: base.rating,
      reviewCount: base.reviewCount,
      image: base.image,
      imageAlt: base.imageAlt,
      images: galleryImages,
      detailImages: merged.detailImages || [],
      detailContent: merged.detailContent || '',
      status: 'ON_SALE',
      specs: merged.specs || [],
      options: merged.options || [],
      variants: merged.variants || []
    }
  })

  const reviewsData = computed(() => {
    const id = unref(productId)
    const overrides = overridesMap[id] || {}
    return overrides.reviews || defaults.reviews || { items: [], total: 0, summary: null }
  })

  const qnasData = computed(() => {
    const id = unref(productId)
    const overrides = overridesMap[id] || {}
    return overrides.qnas || defaults.qnas || { items: [], total: 0 }
  })

  const optionGroups = computed(() => resolved.value?.options || [])
  const variants = computed(() => resolved.value?.variants || [])

  const pending = ref(false)
  const error = computed(() => (resolved.value ? null : new Error('PRODUCT_NOT_FOUND')))

  const refresh = async () => {
    // mock 모드에서는 재요청 불필요 — 시그니처 호환을 위해 유지
  }

  return {
    response: resolved,
    pending,
    error,
    refresh,
    product: resolved,
    optionGroups,
    variants,
    reviews: reviewsData,
    qnas: qnasData
  }
}

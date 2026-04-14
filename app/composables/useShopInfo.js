/**
 * 쇼핑몰 정보 전역 상태 관리
 * - 최초 1회만 API 호출
 * - useState로 SSR/CSR 모두 지원
 * - 앱 전체에서 재사용
 */
import mockShopInfo from '~/data/shop-info.json'

export const useShopInfo = () => {
  // 전역 상태 (앱 전체에서 공유) — mock 모드에서는 JSON 으로 즉시 초기화
  const shopInfo = useState('shop-info', () => mockShopInfo)
  const isLoaded = useState('shop-info-loaded', () => true)
  const pending = useState('shop-info-pending', () => false)
  const error = useState('shop-info-error', () => null)

  const fetchShopInfo = async () => {
    shopInfo.value = mockShopInfo
    isLoaded.value = true
    return mockShopInfo
  }

  /**
   * 강제 새로고침
   */
  const refresh = () => fetchShopInfo(true)

  // ============================================
  // Computed Getters (편의용)
  // ============================================

  // 기본 정보
  const shopName = computed(() => shopInfo.value?.shopName || '')
  const shopNameEn = computed(() => shopInfo.value?.shopNameEn || '')
  const logoUrl = computed(() => shopInfo.value?.logoUrl || '')
  const faviconUrl = computed(() => shopInfo.value?.faviconUrl || '')

  // 사업자 정보
  const businessInfo = computed(() => shopInfo.value?.businessInfo || {})

  // 고객센터 정보
  const customerServiceInfo = computed(() => shopInfo.value?.customerServiceInfo || {})

  // 개인정보 관리
  const privacyInfo = computed(() => shopInfo.value?.privacyInfo || {})

  // 저작권 문구
  const copyrightText = computed(() => {
    if (shopInfo.value?.copyrightText) return shopInfo.value.copyrightText
    const year = new Date().getFullYear()
    return `© ${year} ${shopName.value || 'Shop'}. All rights reserved.`
  })

  // SEO 정보
  const seoInfo = computed(() => shopInfo.value?.seoInfo || {})

  // SNS 정보
  const snsInfo = computed(() => shopInfo.value?.snsInfo || [])

  // 테마
  const theme = computed(() => shopInfo.value?.theme || 'green')

  // 헤더 메뉴
  const headerMenu = computed(() => shopInfo.value?.headerMenu || [])

  // 배송 정책
  const shippingPolicy = computed(() => shopInfo.value?.shippingPolicy || {})

  // 무료배송 기준 금액
  const freeShippingAmount = computed(() => shippingPolicy.value?.freeShippingAmount || 0)

  // 기본 배송비
  const baseShippingFee = computed(() => shippingPolicy.value?.baseShippingFee || 0)

  // 결제 기한 (일)
  const paymentDeadlineDays = computed(() => shopInfo.value?.paymentDeadlineDays || 3)

  return {
    // 상태
    shopInfo,
    isLoaded,
    pending,
    error,

    // 메서드
    fetchShopInfo,
    refresh,

    // Getters
    shopName,
    shopNameEn,
    logoUrl,
    faviconUrl,
    businessInfo,
    customerServiceInfo,
    privacyInfo,
    copyrightText,
    seoInfo,
    snsInfo,
    theme,
    headerMenu,
    shippingPolicy,
    freeShippingAmount,
    baseShippingFee,
    paymentDeadlineDays
  }
}

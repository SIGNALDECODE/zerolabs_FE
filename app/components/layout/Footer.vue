<script setup>
const props = defineProps({
  data: {
    type: Object,
    required: true
  }
})

const {
  shopName,
  logoUrl,
  businessInfo,
  customerServiceInfo,
  privacyInfo,
  copyrightText,
  snsInfo
} = useShopInfo()

const supportedSnsTypes = ['youtube', 'instagram', 'x']
const snsTypes = [
  { type: 'youtube', label: 'YouTube' },
  { type: 'instagram', label: 'Instagram' },
  { type: 'x', label: 'X' }
]

const socialLinks = computed(() => {
  const info = snsInfo.value
  if (!info) {
    return (props.data.social || []).filter((s) => supportedSnsTypes.includes(s.type))
  }
  if (typeof info === 'object' && !Array.isArray(info)) {
    return snsTypes
      .filter((sns) => info[sns.type])
      .map((sns) => ({ type: sns.type, href: info[sns.type], label: sns.label }))
  }
  if (Array.isArray(info) && info.length) {
    return info
      .filter((s) => supportedSnsTypes.includes(s.type))
      .map((s) => ({ type: s.type, href: s.url || s.href || '#', label: s.label || s.type }))
  }
  return (props.data.social || []).filter((s) => supportedSnsTypes.includes(s.type))
})

const company = computed(() => {
  const v = props.data.company?.values || {}
  const api = businessInfo.value || {}
  const address = api.address ? `${api.address} ${api.addressDetail || ''}`.trim() : v.address
  return {
    name: api.businessName || v.name,
    ceo: api.ceoName || v.ceo,
    ceoPhone: api.ceoPhone || v.ceoPhone,
    address,
    businessNumber: api.businessNumber || v.businessNumber,
    mailOrderNumber: api.mailOrderNumber || v.mailOrderNumber,
    privacyOfficer: privacyInfo.value?.officer || v.privacyOfficer
  }
})

const customer = computed(() => {
  const v = props.data.customer?.values || {}
  return {
    phone: customerServiceInfo.value?.phone || v.phone,
    email: businessInfo.value?.email || customerServiceInfo.value?.email || v.email,
    hours: customerServiceInfo.value?.hours || v.hours
  }
})

const phoneHref = computed(() => (customer.value.phone ? `tel:${customer.value.phone.replace(/-/g, '')}` : ''))
const csPhoneHref = computed(() => (company.value.ceoPhone ? `tel:${company.value.ceoPhone.replace(/-/g, '')}` : ''))

const logoSrc = computed(() => logoUrl.value || props.data.logo?.src || '')
const copyright = computed(() => copyrightText.value || props.data.copyright || '')

const companyLabels = computed(() => props.data.company?.labels || {})
const customerLabels = computed(() => props.data.customer?.labels || {})
const bank = computed(() => props.data.bank || {})
</script>

<template>
  <footer class="footer">
    <div class="footer__inner">
      <div class="footer__top">
        <div class="footer__left">
          <div class="footer__logo">
            <img
              v-if="logoSrc"
              :src="logoSrc"
              :alt="data.logo.alt"
              class="footer__logo-image"
            />
            <span v-else class="footer__logo-text">{{ shopName || data.logo.text }}</span>
          </div>

          <nav class="footer__nav" aria-label="푸터 내비게이션">
            <ul class="footer__nav-list">
              <li v-for="link in data.nav" :key="link.href" class="footer__nav-item">
                <NuxtLink
                  :to="link.href"
                  class="footer__nav-link"
                  :class="{ 'footer__nav-link--emphasis': link.emphasis }"
                >{{ link.label }}</NuxtLink>
              </li>
            </ul>
          </nav>

          <dl class="footer__info-grid">
            <div class="footer__info-row">
              <div class="footer__info-cell">
                <dt>{{ companyLabels.name }}</dt>
                <dd>{{ company.name }}</dd>
              </div>
              <div class="footer__info-cell">
                <dt>{{ companyLabels.ceo }}</dt>
                <dd>{{ company.ceo }}</dd>
              </div>
              <div class="footer__info-cell">
                <dt>{{ companyLabels.ceoPhone }}</dt>
                <dd>
                  <a v-if="csPhoneHref" :href="csPhoneHref" class="footer__link">{{ company.ceoPhone }}</a>
                  <template v-else>{{ company.ceoPhone }}</template>
                </dd>
              </div>
            </div>

            <div class="footer__info-row">
              <div class="footer__info-cell footer__info-cell--wide">
                <dt>{{ companyLabels.address }}</dt>
                <dd>{{ company.address }}</dd>
              </div>
            </div>

            <div class="footer__info-row">
              <div class="footer__info-cell">
                <dt>{{ companyLabels.businessNumber }}</dt>
                <dd>{{ company.businessNumber }}</dd>
              </div>
              <div class="footer__info-cell">
                <dt>{{ companyLabels.mailOrderNumber }}</dt>
                <dd>{{ company.mailOrderNumber }}</dd>
              </div>
            </div>

            <div class="footer__info-row">
              <div class="footer__info-cell">
                <dt>{{ companyLabels.privacyOfficer }}</dt>
                <dd>{{ company.privacyOfficer }}</dd>
              </div>
            </div>
          </dl>
        </div>

        <div class="footer__right">
          <div class="footer__col footer__col--customer">
            <h2 class="footer__col-title">{{ data.customer.title }}</h2>
            <dl class="footer__info-list">
              <div class="footer__info-item">
                <dt>{{ customerLabels.phone }}</dt>
                <dd>
                  <a v-if="phoneHref" :href="phoneHref" class="footer__link">{{ customer.phone }}</a>
                  <template v-else>{{ customer.phone }}</template>
                </dd>
              </div>
              <div class="footer__info-item">
                <dt>{{ customerLabels.email }}</dt>
                <dd class="footer__info-dim">{{ customer.email }}</dd>
              </div>
              <div class="footer__info-item">
                <dt>{{ customerLabels.hours }}</dt>
                <dd class="footer__info-dim">{{ customer.hours }}</dd>
              </div>
            </dl>
          </div>

          <div class="footer__col footer__col--bank">
            <h2 class="footer__col-title">{{ bank.title }}</h2>
            <p class="footer__bank">
              <span class="footer__bank-name">{{ bank.bankName }}</span>
              <span class="footer__bank-number">{{ bank.accountNumber }}({{ bank.holder }})</span>
            </p>
          </div>
        </div>
      </div>

      <div class="footer__bottom">
        <div class="footer__divider" role="presentation" />
        <div class="footer__bottom-row">
          <p class="footer__copyright">{{ copyright }}</p>

          <div v-if="socialLinks.length" class="footer__social">
            <a
              v-for="social in socialLinks"
              :key="social.type"
              :href="social.href"
              target="_blank"
              rel="noopener noreferrer"
              class="footer__social-link"
              :aria-label="social.label"
            >
              <IconSocial :type="social.type" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

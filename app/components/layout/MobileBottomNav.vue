<script setup>
import IconHome from '~/components/ui/icons/IconHome.vue'
import IconSearch from '~/components/ui/icons/IconSearch.vue'
import IconCart from '~/components/ui/icons/IconCart.vue'
import IconUser from '~/components/ui/icons/IconUser.vue'
import IconMenu from '~/components/ui/icons/IconMenu.vue'

defineProps({
  items: {
    type: Array,
    required: true
  },
  ariaLabel: {
    type: String,
    default: '모바일 하단 메뉴'
  }
})

const route = useRoute()
const mobileMenu = useMobileMenu()
const searchOverlay = useSearchOverlay()

const iconMap = {
  home: IconHome,
  search: IconSearch,
  cart: IconCart,
  user: IconUser,
  menu: IconMenu
}

const resolveIcon = (key) => iconMap[key] || IconHome

const isActive = (item) => {
  if (item.action === 'openSearch') return searchOverlay.isOpen.value || route.path.startsWith('/search')
  if (!item.href) return false
  if (item.match) return route.path.startsWith(item.match)
  return route.path === item.href
}

const handleAction = (item) => {
  if (item.action === 'toggleMenu') mobileMenu.toggle()
  if (item.action === 'openSearch') searchOverlay.open()
}
</script>

<template>
  <nav
    class="mobile-bottom-nav"
    :aria-label="ariaLabel"
  >
    <ul class="mobile-bottom-nav__list">
      <li
        v-for="item in items"
        :key="item.id"
        class="mobile-bottom-nav__item"
      >
        <NuxtLink
          v-if="item.href"
          :to="item.href"
          class="mobile-bottom-nav__link"
          :class="{ 'is-active': isActive(item) }"
          :aria-label="item.label"
          :aria-current="isActive(item) ? 'page' : undefined"
        >
          <span class="mobile-bottom-nav__icon">
            <component :is="resolveIcon(item.icon)" />
          </span>
          <span class="sr-only">{{ item.label }}</span>
        </NuxtLink>

        <button
          v-else
          type="button"
          class="mobile-bottom-nav__link"
          :class="{ 'is-active': isActive(item) }"
          :aria-label="item.label"
          :aria-expanded="item.action === 'toggleMenu'
            ? mobileMenu.isOpen.value
            : item.action === 'openSearch'
              ? searchOverlay.isOpen.value
              : undefined"
          @click="handleAction(item)"
        >
          <span class="mobile-bottom-nav__icon">
            <component :is="resolveIcon(item.icon)" />
          </span>
          <span class="sr-only">{{ item.label }}</span>
        </button>
      </li>
    </ul>
  </nav>
</template>

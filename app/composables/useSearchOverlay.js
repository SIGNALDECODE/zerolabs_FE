export const useSearchOverlay = () => {
  const isOpen = useState('search-overlay-open', () => false)

  const lockBody = (lock) => {
    if (import.meta.server) return
    document.body.style.overflow = lock ? 'hidden' : ''
  }

  const open = () => {
    isOpen.value = true
    lockBody(true)
  }

  const close = () => {
    isOpen.value = false
    lockBody(false)
  }

  const toggle = () => {
    if (isOpen.value) close()
    else open()
  }

  return { isOpen, open, close, toggle }
}

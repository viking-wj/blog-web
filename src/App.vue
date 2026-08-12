<template>
  <div class="app-shell">
    <AppHeader :solid="headerSolid" />
    <RouterView v-slot="{ Component }">
      <Transition name="page" mode="out-in">
        <component :is="Component" />
      </Transition>
    </RouterView>
    <AppFooter />
    <button v-show="showBackToTop" class="back-to-top" type="button" aria-label="返回页面顶部" @click="backToTop">
      <svg aria-hidden="true" viewBox="0 0 24 24">
        <path d="m6 15 6-6 6 6" />
      </svg>
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import AppFooter from '@/components/AppFooter.vue'
import AppHeader from '@/components/AppHeader.vue'

const route = useRoute()
const pageScrolled = ref(false)
const showBackToTop = ref(false)
const headerSolid = computed(() => route.name !== 'home' || pageScrolled.value)

function updateScrollState(): void {
  pageScrolled.value = window.scrollY > 16
  showBackToTop.value = window.scrollY > 480
}

function backToTop(): void {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  updateScrollState()
  window.addEventListener('scroll', updateScrollState, { passive: true })
})

onBeforeUnmount(() => window.removeEventListener('scroll', updateScrollState))
</script>

<style scoped>
.app-shell {
  min-height: 100vh;
}

.back-to-top {
  position: fixed;
  z-index: 20;
  right: max(var(--space-5), env(safe-area-inset-right));
  bottom: max(var(--space-5), env(safe-area-inset-bottom));
  display: grid;
  width: 3rem;
  height: 3rem;
  padding: 0;
  place-items: center;
  color: #fff;
  background: var(--color-primary);
  border: 0;
  border-radius: 50%;
  box-shadow: var(--shadow-md);
  transition: background var(--transition-fast), transform var(--transition-fast);
}

.back-to-top:hover {
  background: var(--color-primary-hover);
  transform: translateY(-2px);
}

.back-to-top svg {
  width: 1.4rem;
  fill: none;
  stroke: currentColor;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-width: 2;
}

.page-enter-active,
.page-leave-active {
  transition: opacity 180ms ease, transform 180ms ease;
}

.page-enter-from {
  opacity: 0;
  transform: translateY(6px);
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-3px);
}
</style>

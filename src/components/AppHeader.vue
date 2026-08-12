<template>
  <header class="site-header" :class="{ 'site-header--solid': solid }">
    <a class="skip-link" href="#main-content">跳到主要内容</a>
    <div class="site-header__inner container">
      <RouterLink class="brand" to="/" aria-label="W 的小站首页">
        <span class="brand__mark" aria-hidden="true">W</span>
        <span class="brand__text">W 的小站</span>
      </RouterLink>

      <nav aria-label="主导航">
        <RouterLink class="nav-link" to="/">
          <svg aria-hidden="true" viewBox="0 0 24 24">
            <path d="m3 11 9-8 9 8v9a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1z" />
          </svg>
          首页
        </RouterLink>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
defineProps<{
  solid: boolean
}>()
</script>

<style scoped>
.site-header {
  position: fixed;
  z-index: var(--layer-header);
  top: 0;
  right: 0;
  left: 0;
  color: #fff;
  background: transparent;
  transition: color var(--transition-base), background var(--transition-base), box-shadow var(--transition-base);
}

.site-header--solid,
.site-header:focus-within {
  color: var(--color-text);
  background: rgb(255 255 255 / 92%);
  box-shadow: var(--shadow-sm);
  backdrop-filter: blur(12px);
}

.site-header__inner {
  display: flex;
  min-height: var(--header-height);
  align-items: center;
  justify-content: space-between;
}

.brand,
.nav-link {
  display: inline-flex;
  min-height: 2.75rem;
  align-items: center;
  color: inherit;
  font-weight: 700;
}

.brand {
  gap: var(--space-3);
  font-size: var(--font-size-lg);
}

.brand__mark {
  display: grid;
  width: 2.5rem;
  height: 2.5rem;
  place-items: center;
  color: #fff;
  background: var(--color-primary);
  border-radius: var(--radius-pill);
  box-shadow: 0 4px 12px rgb(254 150 0 / 28%);
}

.nav-link {
  gap: var(--space-2);
  padding-inline: var(--space-3);
  border-radius: var(--radius-md);
}

.nav-link:hover,
.nav-link.router-link-exact-active {
  color: var(--color-primary);
  background: var(--color-primary-soft);
}

.nav-link svg {
  width: 1.1rem;
  fill: none;
  stroke: currentColor;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-width: 1.8;
}

.skip-link {
  position: absolute;
  top: -4rem;
  left: var(--space-4);
  z-index: var(--layer-overlay);
  padding: var(--space-3) var(--space-4);
  color: #fff;
  background: var(--color-primary-active);
  border-radius: var(--radius-md);
}

.skip-link:focus {
  top: var(--space-3);
}

@media (max-width: 47.99rem) {
  .brand__text {
    display: none;
  }
}
</style>

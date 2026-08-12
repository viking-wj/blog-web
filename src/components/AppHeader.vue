<template>
  <header class="site-header" :class="{ 'site-header--solid': solid }">
    <a class="skip-link" href="#main-content">跳到主要内容</a>
    <div class="site-header__inner container">
      <RouterLink class="brand" to="/" aria-label="W 的小站首页">
        <span class="brand__mark" aria-hidden="true">W.</span>
        <span>W 的小站</span>
      </RouterLink>
      <nav aria-label="主导航">
        <RouterLink class="nav-link" to="/">文章 <span aria-hidden="true">&nearr;</span></RouterLink>
      </nav>
    </div>
  </header>
</template>
<script setup lang="ts">
defineProps<{ solid: boolean }>()
</script>
<style scoped>
.site-header {
  position: sticky;
  z-index: var(--layer-header);
  top: 0;
  color: var(--ink);
  background: color-mix(in srgb, var(--paper) 84%, transparent);
  backdrop-filter: blur(16px);
  border-bottom: 1px solid transparent;
  transition: border-color var(--transition-base), background var(--transition-base);
}
.site-header--solid,
.site-header:focus-within {
  background: color-mix(in srgb, var(--paper) 96%, transparent);
  border-color: var(--line);
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
  font-weight: 800;
}
.brand {
  gap: var(--space-3);
  letter-spacing: -0.03em;
}
.brand__mark {
  display: grid;
  width: 2.75rem;
  height: 2.75rem;
  place-items: center;
  background: var(--acid);
  border-radius: 0.85rem;
  font-family: var(--font-family-display);
  font-size: 1.2rem;
}
.nav-link {
  gap: 0.5rem;
  padding-inline: 1rem;
  border-radius: var(--radius-pill);
  transition: background var(--transition-fast);
}
.nav-link:hover,
.nav-link.router-link-exact-active {
  background: var(--acid);
}
.skip-link {
  position: absolute;
  top: -4rem;
  left: 1rem;
  padding: 0.75rem 1rem;
  background: var(--acid);
  border-radius: var(--radius-md);
}
.skip-link:focus {
  top: 0.75rem;
}
</style>

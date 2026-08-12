<template>
  <footer class="site-footer">
    <div class="container site-footer__inner">
      <p>记录技术、生活与持续成长。</p>
      <p>© {{ currentYear }} W 的小站</p>
    </div>
  </footer>
</template>

<script setup lang="ts">
const currentYear = new Date().getFullYear()
</script>

<style scoped>
.site-footer {
  color: var(--color-text-secondary);
  background: var(--color-surface);
  border-top: 1px solid var(--color-border);
}

.site-footer__inner {
  display: flex;
  min-height: 7rem;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-4);
}

.site-footer p {
  margin: 0;
  font-size: var(--font-size-sm);
}

@media (max-width: 47.99rem) {
  .site-footer__inner {
    flex-direction: column;
    justify-content: center;
    text-align: center;
  }
}
</style>

<template>
  <footer class="site-footer">
    <div class="container site-footer__inner">
      <p>记录技术、生活与持续成长。</p>
      <p>&copy; {{ currentYear }} W 的小站</p>
    </div>
  </footer>
</template>

<script setup lang="ts">
const currentYear = new Date().getFullYear()
</script>
<style scoped>
.site-footer {
  color: var(--ink-soft);
  background: var(--mist);
  border-top: 1px solid var(--line);
}
.site-footer__inner {
  display: flex;
  min-height: 7rem;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-4);
}
p {
  margin: 0;
  font-size: var(--font-size-sm);
}
@media (max-width: 48rem) {
  .site-footer__inner {
    flex-direction: column;
    justify-content: center;
    text-align: center;
  }
}
</style>

<template>
  <main id="main-content" class="not-found page-shell" tabindex="-1">
    <div class="container">
      <AppState
        kind="empty"
        title="页面走丢了"
        message="你访问的地址不存在，可能已经被移动或删除。"
        action-label="返回首页"
        @action="router.push('/')"
      />
    </div>
  </main>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import AppState from '@/components/AppState.vue'

const router = useRouter()
</script>

<style scoped>
.not-found {
  display: grid;
  min-height: calc(100vh - 7rem);
  padding-top: var(--space-12);
  place-items: center;
}
</style>

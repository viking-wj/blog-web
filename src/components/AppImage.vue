<template>
  <img
    v-if="src && !failed"
    :src="src"
    :alt="alt"
    :width="width"
    :height="height"
    :loading="loading"
    decoding="async"
    @error="failed = true"
  />
  <span v-else class="app-image__fallback" :role="alt ? 'img' : undefined" :aria-label="alt || undefined">
    <slot name="fallback" />
  </span>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const props = withDefaults(
  defineProps<{
    src?: string
    alt: string
    width: number
    height: number
    loading?: 'eager' | 'lazy'
  }>(),
  {
    src: '',
    loading: 'lazy'
  }
)

const failed = ref(false)

watch(
  () => props.src,
  () => {
    failed.value = false
  }
)
</script>

<template>
  <section class="state-panel" :aria-busy="kind === 'loading'" :aria-live="kind === 'error' ? 'assertive' : 'polite'">
    <div class="state-panel__content">
      <span v-if="kind === 'loading'" class="spinner" aria-hidden="true"></span>
      <svg v-else aria-hidden="true" viewBox="0 0 24 24">
        <path
          v-if="kind === 'error'"
          d="M12 9v4m0 4h.01M10.3 3.7 2.6 17a2 2 0 0 0 1.7 3h15.4a2 2 0 0 0 1.7-3L13.7 3.7a2 2 0 0 0-3.4 0Z"
        />
        <path v-else d="M4 5h16v14H4zM8 9h8m-8 4h6" />
      </svg>
      <h2>{{ title }}</h2>
      <p>{{ message }}</p>
      <button v-if="actionLabel" class="button button--primary" type="button" @click="$emit('action')">
        {{ actionLabel }}
      </button>
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  kind: 'loading' | 'empty' | 'error'
  title: string
  message: string
  actionLabel?: string
}>()

defineEmits<{
  action: []
}>()
</script>

<style scoped>
.state-panel__content {
  display: grid;
  max-width: 28rem;
  justify-items: center;
  gap: var(--space-3);
}

.state-panel svg,
.spinner {
  width: 2rem;
  height: 2rem;
  color: var(--color-primary);
}

.state-panel svg {
  fill: none;
  stroke: currentColor;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-width: 1.8;
}

.state-panel h2,
.state-panel p {
  margin: 0;
}

.state-panel h2 {
  font-size: var(--font-size-lg);
}

.spinner {
  border: 3px solid var(--color-primary-soft);
  border-top-color: var(--color-primary);
  border-radius: 50%;
  animation: spin 700ms linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>

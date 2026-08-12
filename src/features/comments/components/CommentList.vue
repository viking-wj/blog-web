<template>
  <div v-if="comments.length" class="comment-list">
    <article v-for="comment in comments" :key="comment.id" class="comment">
      <div class="comment__avatar" aria-hidden="true">
        <AppImage :src="comment.author.avatarUrl" alt="" :width="48" :height="48">
          <template #fallback>{{ comment.author.name.slice(0, 1).toUpperCase() }}</template>
        </AppImage>
      </div>
      <div class="comment__body">
        <header class="comment__header">
          <strong>{{ comment.author.name }}</strong>
          <span v-if="comment.author.role" class="tag">{{ comment.author.role }}</span>
          <time :datetime="comment.createdAt">{{ formatDate(comment.createdAt) }}</time>
        </header>
        <p>{{ comment.content }}</p>
        <div v-if="comment.imageUrls.length" class="comment__images">
          <a v-for="image in comment.imageUrls" :key="image" :href="image" target="_blank" rel="noopener noreferrer">
            <AppImage :src="image" alt="评论附图" :width="120" :height="120">
              <template #fallback>图片加载失败</template>
            </AppImage>
          </a>
        </div>
      </div>
    </article>
  </div>
  <AppState v-else kind="empty" title="还没有评论" message="来留下第一条友善的评论吧。" />
</template>

<script setup lang="ts">
import AppState from '@/components/AppState.vue'
import AppImage from '@/components/AppImage.vue'
import { formatDate } from '@/shared/lib/format'
import type { ArticleComment } from '../model/types'

defineProps<{
  comments: ArticleComment[]
}>()
</script>

<style scoped>
.comment-list {
  display: grid;
  gap: var(--space-6);
}

.comment {
  display: grid;
  grid-template-columns: 3rem minmax(0, 1fr);
  gap: var(--space-4);
  padding-bottom: var(--space-6);
  border-bottom: 1px solid var(--color-border);
}

.comment__avatar {
  display: grid;
  width: 3rem;
  height: 3rem;
  place-items: center;
  overflow: hidden;
  color: #fff;
  background: var(--color-primary);
  border-radius: 50%;
  font-weight: 700;
}

.comment__avatar img,
.comment__avatar .app-image__fallback {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.comment__header {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-2);
}

.comment__header time {
  margin-left: auto;
  color: var(--color-text-muted);
  font-size: var(--font-size-xs);
}

.comment__body p {
  margin: var(--space-3) 0 0;
  white-space: pre-wrap;
}

.comment__images {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
  margin-top: var(--space-4);
}

.comment__images a,
.comment__images img {
  width: 7.5rem;
  height: 7.5rem;
  border-radius: var(--radius-md);
}

.comment__images img,
.comment__images .app-image__fallback {
  object-fit: cover;
}

.comment__images .app-image__fallback {
  display: grid;
  place-items: center;
  padding: var(--space-2);
  color: var(--color-text-muted);
  background: var(--mist);
  font-size: var(--font-size-xs);
  text-align: center;
}

@media (max-width: 35rem) {
  .comment__header time {
    width: 100%;
    margin-left: 0;
  }
}
</style>

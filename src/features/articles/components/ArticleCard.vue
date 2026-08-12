<template>
  <article class="article-card card card--interactive">
    <RouterLink class="article-card__media" :to="articleUrl" :aria-label="`阅读《${article.title}》`">
      <img
        v-if="article.thumbnailUrl"
        :src="article.thumbnailUrl"
        :alt="`${article.title}的封面`"
        width="720"
        height="480"
        loading="lazy"
        decoding="async"
      />
      <span v-else class="article-card__placeholder" aria-hidden="true">W</span>
    </RouterLink>
    <div class="card__body article-card__body">
      <div class="card__meta">
        <time :datetime="article.publishedAt">{{ formatDate(article.publishedAt) }}</time>
        <span>{{ article.commentCount }} 条评论</span>
      </div>
      <h2 class="card__title">
        <RouterLink :to="articleUrl">{{ article.title }}</RouterLink>
      </h2>
      <p>{{ excerpt }}</p>
      <div class="article-card__footer">
        <span>{{ article.author.name }}</span>
        <RouterLink class="article-card__read" :to="articleUrl">
          阅读全文 <span aria-hidden="true">&nearr;</span>
        </RouterLink>
      </div>
    </div>
  </article>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import { formatDate, plainTextExcerpt } from '@/shared/lib/format'
import type { ArticleSummary } from '../model/types'

const props = defineProps<{ article: ArticleSummary }>()
const articleUrl = computed(() => `/article/${encodeURIComponent(props.article.id)}`)
const excerpt = computed(() => plainTextExcerpt(props.article.excerpt) || '这篇文章暂时没有摘要。')
</script>
<style scoped>
.article-card {
  display: grid;
  grid-template-columns: minmax(16rem, 38%) 1fr;
  min-height: 19rem;
}
.article-card__media {
  min-height: 100%;
  overflow: hidden;
  background: linear-gradient(135deg, var(--acid), #d6e7da);
}
.article-card__media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform var(--transition-base);
}
.article-card:hover img {
  transform: scale(1.035);
}
.article-card__placeholder {
  display: grid;
  height: 100%;
  min-height: 16rem;
  place-items: center;
  color: color-mix(in srgb, var(--ink) 24%, transparent);
  font-size: 5rem;
  font-weight: 800;
}
.article-card__body {
  display: flex;
  flex-direction: column;
}
.article-card__body > p {
  color: var(--ink-soft);
  font-size: 1.02rem;
}
.article-card__footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-4);
  margin-top: auto;
  padding-top: var(--space-5);
  color: var(--color-text-muted);
  font-size: var(--font-size-sm);
  border-top: 1px solid var(--line);
}
.article-card__read {
  font-weight: 800;
}
@media (max-width: 48rem) {
  .article-card {
    grid-template-columns: 1fr;
  }
  .article-card__media {
    min-height: 13rem;
    aspect-ratio: 16/9;
  }
}
</style>

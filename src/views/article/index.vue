<template>
  <main id="main-content" class="article-page" tabindex="-1">
    <div class="article-page__header-spacer" aria-hidden="true"></div>

    <div class="article-container article-page__content">
      <AppState v-if="loading" kind="loading" title="正在加载文章" message="请稍候，内容马上就来。" />
      <AppState
        v-else-if="error"
        kind="error"
        title="文章加载失败"
        :message="error"
        action-label="重新加载"
        @action="load"
      />

      <template v-else-if="article">
        <article class="article card">
          <header class="article__header">
            <RouterLink class="article__back" to="/">← 返回文章列表</RouterLink>
            <h1>{{ article.title }}</h1>
            <div class="card__meta article__meta">
              <time :datetime="article.publishedAt">{{ formatDate(article.publishedAt) }}</time>
              <span>{{ article.author.name }}</span>
              <span>{{ article.commentCount }} 条评论</span>
            </div>
          </header>

          <!-- articleHtml 已由 shared/lib/markdown 的严格白名单进行消毒。 -->
          <!-- eslint-disable-next-line vue/no-v-html -->
          <div class="article__body markdown-body" v-html="articleHtml"></div>

          <footer class="article__author">
            <div class="article__avatar" aria-hidden="true">
              <img v-if="article.author.avatarUrl" :src="article.author.avatarUrl" alt="" width="64" height="64" />
              <span v-else>{{ article.author.name.slice(0, 1).toUpperCase() }}</span>
            </div>
            <div>
              <span class="text-muted">本文作者</span>
              <h2>{{ article.author.name }}</h2>
              <p>{{ article.author.bio || '热爱记录与分享。' }}</p>
            </div>
          </footer>
        </article>

        <section class="comments-section card" aria-labelledby="comments-title">
          <div class="card__body stack">
            <header class="comments-section__heading">
              <div>
                <span class="text-primary">DISCUSSION</span>
                <h2 id="comments-title">评论</h2>
              </div>
              <span class="text-muted">{{ visibleComments.length }} 条</span>
            </header>
            <CommentList :comments="visibleComments" />
            <hr class="divider" />
            <div>
              <h2>留下评论</h2>
              <p class="text-muted">邮箱不会公开。带 * 的字段为必填项。</p>
            </div>
            <CommentForm @submit="submitComment" />
            <p v-if="successMessage" class="success-message" role="status">{{ successMessage }}</p>
          </div>
        </section>
      </template>
    </div>
  </main>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import AppState from '@/components/AppState.vue'
import CommentForm from '@/features/comments/components/CommentForm.vue'
import CommentList from '@/features/comments/components/CommentList.vue'
import type { ArticleComment, CommentDraft } from '@/features/comments/model/types'
import { useArticleDetail } from '@/features/articles/composables/useArticleDetail'
import { formatDate } from '@/shared/lib/format'
import { renderMarkdown } from '@/shared/lib/markdown'
import { env } from '@/shared/config/env'
import { updateSeo } from '@/shared/lib/seo'
import 'highlight.js/styles/github-dark.css'

const route = useRoute()
const articleId = computed(() => String(route.params.id || ''))
const { article, loading, error, load } = useArticleDetail(articleId)
const localComments = ref<ArticleComment[]>([])
const successMessage = ref('')

const articleHtml = computed(() => renderMarkdown(article.value?.markdown || ''))
const visibleComments = computed(() => [...(article.value?.comments || []), ...localComments.value])

function releaseLocalImages(): void {
  for (const comment of localComments.value) {
    for (const imageUrl of comment.imageUrls) URL.revokeObjectURL(imageUrl)
  }
}

watch(articleId, () => {
  releaseLocalImages()
  localComments.value = []
  successMessage.value = ''
})

watch(article, (currentArticle) => {
  if (!currentArticle) return

  updateSeo(
    {
      title: currentArticle.title,
      description: currentArticle.excerpt || `阅读《${currentArticle.title}》。`,
      path: route.fullPath,
      imageUrl: currentArticle.thumbnailUrl,
      type: 'article'
    },
    env
  )
})

onBeforeUnmount(releaseLocalImages)

function submitComment(draft: CommentDraft): void {
  localComments.value.push({
    id: `local-${Date.now()}`,
    author: {
      name: draft.name,
      avatarUrl: '',
      role: '访客'
    },
    createdAt: new Date().toISOString(),
    content: draft.content,
    imageUrls: draft.images.map((image) => URL.createObjectURL(image))
  })
  successMessage.value = '评论已添加到当前页面。后端评论接口接入后即可永久保存。'
}
</script>

<style scoped>
.article-page {
  min-height: 100vh;
  padding-bottom: var(--space-16);
  background: linear-gradient(to bottom, #242424 0, #2e2e2e 21rem, var(--color-bg) 21rem);
}

.article-page__header-spacer {
  height: calc(var(--header-height) + var(--space-12));
}

.article-page__content {
  display: grid;
  gap: var(--space-8);
}

.article {
  overflow: visible;
}

.article__header {
  padding: clamp(var(--space-6), 6vw, var(--space-12));
  text-align: center;
  border-bottom: 1px solid var(--color-border);
}

.article__back {
  display: inline-flex;
  min-height: 2.75rem;
  align-items: center;
  font-size: var(--font-size-sm);
  font-weight: 700;
}

.article__header h1 {
  max-width: 22ch;
  margin: var(--space-5) auto;
  font-size: clamp(2rem, 7vw, 3.6rem);
  letter-spacing: -0.035em;
  text-wrap: balance;
}

.article__meta {
  justify-content: center;
}

.article__body {
  padding: clamp(var(--space-6), 6vw, var(--space-12));
}

.article__author {
  display: grid;
  grid-template-columns: 4rem 1fr;
  gap: var(--space-5);
  align-items: center;
  margin: 0 clamp(var(--space-6), 6vw, var(--space-12));
  padding: var(--space-8) 0;
  border-top: 1px solid var(--color-border);
}

.article__author h2,
.article__author p {
  margin: 0;
}

.article__author h2 {
  font-size: var(--font-size-lg);
}

.article__avatar {
  display: grid;
  width: 4rem;
  height: 4rem;
  place-items: center;
  overflow: hidden;
  color: #fff;
  background: var(--color-primary);
  border-radius: 50%;
  font-size: var(--font-size-xl);
  font-weight: 700;
}

.article__avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.comments-section__heading {
  display: flex;
  align-items: end;
  justify-content: space-between;
}

.comments-section__heading h2,
.comments-section__heading span,
.comments-section .card__body > div > h2 {
  margin: 0;
}

.comments-section__heading > div > span {
  font-size: var(--font-size-xs);
  font-weight: 800;
  letter-spacing: 0.12em;
}

.success-message {
  margin: 0;
  padding: var(--space-3) var(--space-4);
  color: #166534;
  background: #f0fdf4;
  border: 1px solid #bbf7d0;
  border-radius: var(--radius-md);
}

:deep(.markdown-body) {
  color: var(--color-text);
  font-size: 1.05rem;
  line-height: 1.82;
  overflow-wrap: anywhere;
}

:deep(.markdown-body > :first-child) {
  margin-top: 0;
}
:deep(.markdown-body > :last-child) {
  margin-bottom: 0;
}
:deep(.markdown-body h2) {
  margin-top: 2.4em;
  font-size: 1.75rem;
}
:deep(.markdown-body h3) {
  margin-top: 2em;
  font-size: 1.35rem;
}
:deep(.markdown-body a) {
  text-decoration: underline;
  text-underline-offset: 0.2em;
}
:deep(.markdown-body img) {
  margin: var(--space-8) auto;
  border-radius: var(--radius-lg);
}
:deep(.markdown-body blockquote) {
  margin-inline: 0;
  padding: var(--space-4) var(--space-5);
  color: var(--color-text-secondary);
  background: var(--color-primary-soft);
  border-left: 4px solid var(--color-primary);
  border-radius: 0 var(--radius-md) var(--radius-md) 0;
}
:deep(.markdown-body pre) {
  max-width: 100%;
  padding: var(--space-5);
  overflow-x: auto;
  background: #0d1117;
  border-radius: var(--radius-md);
}
:deep(.markdown-body :not(pre) > code) {
  padding: 0.15em 0.4em;
  color: #9a4c00;
  background: var(--color-primary-soft);
  border-radius: var(--radius-sm);
  font-family: var(--font-family-code);
  font-size: 0.9em;
}
:deep(.markdown-body table) {
  display: block;
  width: 100%;
  overflow-x: auto;
  border-collapse: collapse;
}
:deep(.markdown-body th),
:deep(.markdown-body td) {
  padding: var(--space-3);
  border: 1px solid var(--color-border);
}

@media (max-width: 47.99rem) {
  .article-page {
    background: linear-gradient(to bottom, #242424 0, #242424 13rem, var(--color-bg) 13rem);
  }

  .article__author {
    align-items: start;
  }
}
</style>

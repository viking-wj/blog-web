<template>
  <main id="main-content" tabindex="-1">
    <section class="hero" aria-labelledby="hero-title">
      <div class="hero__backdrop" aria-hidden="true"></div>
      <div class="container hero__content">
        <span class="hero__eyebrow">WELCOME TO MY BLOG</span>
        <h1 id="hero-title">记录思考，也记录生活</h1>
        <p>在这里分享开发实践、踩坑经验与日常灵感。愿每一次阅读，都能带来一点新的启发。</p>
        <a class="button button--primary hero__action" href="#latest-articles">开始阅读</a>
      </div>
    </section>

    <section id="latest-articles" class="page-shell" aria-labelledby="latest-title">
      <div class="container stack">
        <header class="section-heading">
          <div>
            <span class="section-heading__eyebrow">LATEST WRITING</span>
            <h2 id="latest-title">最新文章</h2>
          </div>
          <p>持续整理值得记录的技术与生活片段。</p>
        </header>

        <AppState v-if="loading" kind="loading" title="正在加载文章" message="请稍候，内容马上就来。" />
        <AppState
          v-else-if="error"
          kind="error"
          title="文章加载失败"
          :message="error"
          action-label="重新加载"
          @action="load"
        />
        <AppState
          v-else-if="!articles.length"
          kind="empty"
          title="暂时没有文章"
          message="新的内容正在准备中，过一会儿再来看看吧。"
          action-label="刷新"
          @action="load"
        />
        <div v-else class="article-list">
          <ArticleCard v-for="article in articles" :key="article.id" :article="article" />
        </div>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import AppState from '@/components/AppState.vue'
import ArticleCard from '@/features/articles/components/ArticleCard.vue'
import { useArticleList } from '@/features/articles/composables/useArticleList'

const { articles, loading, error, load } = useArticleList()
</script>

<style scoped>
.hero {
  position: relative;
  display: grid;
  min-height: max(40rem, 100svh);
  place-items: center;
  overflow: hidden;
  color: #fff;
  background: linear-gradient(120deg, rgb(15 23 42 / 78%), rgb(46 28 8 / 48%)),
    url('../../../static/image/10.jpg') center / cover no-repeat;
}

.hero__backdrop {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 75% 25%, rgb(254 150 0 / 22%), transparent 32%),
    linear-gradient(to top, rgb(16 24 40 / 28%), transparent 45%);
}

.hero__content {
  position: relative;
  max-width: 52rem;
  padding-block: calc(var(--header-height) + var(--space-12)) var(--space-16);
  text-align: center;
}

.hero__eyebrow,
.section-heading__eyebrow {
  color: var(--color-primary);
  font-size: var(--font-size-xs);
  font-weight: 800;
  letter-spacing: 0.16em;
}

.hero h1 {
  max-width: 14ch;
  margin: var(--space-5) auto var(--space-6);
  color: #fff;
  font-size: clamp(2.5rem, 8vw, 5rem);
  letter-spacing: -0.04em;
  text-wrap: balance;
}

.hero p {
  max-width: 42rem;
  margin: 0 auto var(--space-8);
  color: rgb(255 255 255 / 84%);
  font-size: clamp(1rem, 2vw, 1.15rem);
}

.hero__action {
  min-width: 9rem;
}

.section-heading {
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: var(--space-8);
  margin-bottom: var(--space-4);
}

.section-heading h2 {
  margin: var(--space-2) 0 0;
  font-size: clamp(1.75rem, 4vw, 2.5rem);
}

.section-heading p {
  max-width: 24rem;
  margin: 0;
  color: var(--color-text-secondary);
  text-align: right;
}

.article-list {
  display: grid;
  gap: var(--space-8);
}

@media (max-width: 47.99rem) {
  .hero {
    min-height: 100svh;
  }

  .section-heading {
    align-items: start;
    flex-direction: column;
    gap: var(--space-3);
  }

  .section-heading p {
    text-align: left;
  }
}
</style>

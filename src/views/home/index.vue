<template>
  <main id="main-content" tabindex="-1">
    <section class="hero" aria-labelledby="hero-title">
      <div class="hero__backdrop" aria-hidden="true"></div>
      <div class="container hero__content">
        <span class="hero__eyebrow">SELECTED NOTES · 2026</span>
        <h1 id="hero-title">记录值得保留的想法，<em>也记录想再次读起的故事。</em></h1>
        <p>分享开发实践、生活片段与沿途好奇。这里是一处留给认真阅读的安静角落。</p>
        <t-button class="hero__action" theme="primary" size="large" href="#latest-articles">
          开始阅读 <span aria-hidden="true">&darr;</span>
        </t-button>
      </div>
    </section>
    <section id="latest-articles" class="page-shell" aria-labelledby="latest-title">
      <div class="container stack">
        <header class="section-heading">
          <div>
            <span class="section-heading__eyebrow">THE READING ROOM</span>
            <h2 id="latest-title">最新文章</h2>
          </div>
          <p>持续整理值得记录的技术实践与生活片段。</p>
        </header>
        <AppState v-if="loading" kind="loading" title="正在加载文章" message="请稍候，内容马上就来。" /><AppState
          v-else-if="error"
          kind="error"
          title="文章加载失败"
          :message="error"
          action-label="重新加载"
          @action="load"
        /><AppState
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
import { Button as TButton } from 'tdesign-vue-next'

const { articles, loading, error, load } = useArticleList()
</script>
<style scoped>
.hero {
  position: relative;
  display: grid;
  min-height: min(48rem, calc(100svh - var(--header-height)));
  place-items: center;
  overflow: hidden;
  color: var(--ink);
  background: linear-gradient(
      120deg,
      color-mix(in srgb, var(--acid) 16%, var(--paper)),
      color-mix(in srgb, var(--paper) 72%, transparent)
    ),
    url('../../../static/image/10.jpg') center/cover no-repeat;
}
.hero__backdrop {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 76% 18%, color-mix(in srgb, var(--acid) 36%, transparent), transparent 18%),
    linear-gradient(90deg, transparent 45%, color-mix(in srgb, var(--ink) 7%, transparent) 45%);
}
.hero__content {
  position: relative;
  max-width: 68rem;
  padding-block: var(--space-12);
  text-align: left;
}
.hero__eyebrow,
.section-heading__eyebrow {
  color: var(--ink);
  font-size: var(--font-size-xs);
  font-weight: 900;
  letter-spacing: 0.16em;
}
.hero h1 {
  max-width: 12ch;
  margin: var(--space-5) 0 var(--space-6);
  font-family: var(--font-family-display);
  font-size: clamp(3.2rem, 8vw, 6.6rem);
  letter-spacing: -0.06em;
  text-wrap: balance;
}
.hero h1 em {
  color: var(--coral);
  font-style: normal;
}
.hero p {
  max-width: 34rem;
  margin: 0 0 var(--space-8);
  color: var(--ink-soft);
  font-size: clamp(1rem, 2vw, 1.15rem);
}
.hero__action {
  min-width: 10rem;
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
  font-family: var(--font-family-display);
  font-size: clamp(2.25rem, 4vw, 3.6rem);
  letter-spacing: -0.045em;
}
.section-heading p {
  max-width: 24rem;
  margin: 0;
  color: var(--ink-soft);
  text-align: right;
}
.article-list {
  display: grid;
  gap: var(--space-8);
}
@media (max-width: 48rem) {
  .hero {
    min-height: calc(100svh - var(--header-height));
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

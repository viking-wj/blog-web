import { ref, watch, type Ref } from 'vue'
import { getArticle } from '../api/articles'
import type { ArticleDetail } from '../model/types'

export function useArticleDetail(articleId: Ref<string>) {
  const article = ref<ArticleDetail | null>(null)
  const loading = ref(false)
  const error = ref('')

  async function load(): Promise<void> {
    if (!articleId.value) {
      article.value = null
      error.value = '文章地址无效。'
      return
    }

    loading.value = true
    error.value = ''

    try {
      article.value = await getArticle(articleId.value)
    } catch (reason) {
      article.value = null
      error.value = reason instanceof Error ? reason.message : '文章加载失败，请稍后重试。'
    } finally {
      loading.value = false
    }
  }

  watch(articleId, load, { immediate: true })

  return { article, loading, error, load }
}

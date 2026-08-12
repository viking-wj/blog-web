import { onMounted, ref } from 'vue'
import { getArticles } from '../api/articles'
import type { ArticleSummary } from '../model/types'

export function useArticleList() {
  const articles = ref<ArticleSummary[]>([])
  const loading = ref(false)
  const error = ref('')

  async function load(): Promise<void> {
    loading.value = true
    error.value = ''

    try {
      articles.value = await getArticles()
    } catch (reason) {
      error.value = reason instanceof Error ? reason.message : '文章加载失败，请稍后重试。'
    } finally {
      loading.value = false
    }
  }

  onMounted(load)

  return { articles, loading, error, load }
}

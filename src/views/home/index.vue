<template>
  <div>
    <NavigationBar></NavigationBar>
    <div class="article_list">
      <ArticleCard></ArticleCard>
    </div>
    <CommentComponent></CommentComponent>
  </div>
</template>

<script lang="ts" setup>
import NavigationBar from '@/components/base/NavigationBar.vue'
import ArticleCard from '@/components/base/ArticleCard.vue';
import CommentComponent from '@/components/base/CommentComponent.vue';
</script>

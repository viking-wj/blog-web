<template>
  <div class="comments-list">
    <!-- 动态评论列表 -->
    <div v-if="commentsList.length > 0">
      <comments v-for="(comment, index) in commentsList" :key="index" :comment="comment"></comments>
    </div>
    <!-- 无评论提示 -->
    <div v-else class="no-comments">
      <p>暂无评论，快来抢沙发吧！</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import comments from '../comments.vue'

interface CommentUser {
  avatar: string
  name: string
}

interface Comment {
  user: CommentUser
  createTime: string
  context: string
  images?: string[]
}

const props = defineProps<{
  commentsList: Comment[]
}>()
</script>

<style scoped lang="scss">
.comments-list {
  .comment-bar {
    margin-top: 60px;
  }
}

.no-comments {
  text-align: center;
  padding: 40px 0;
  color: #999;
  font-size: 14px;
  background-color: #f9f9f9;
  border-radius: 8px;
}
</style>

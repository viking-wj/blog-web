<template>
  <div class="comment_body">
    <a-comment>
      <template #actions>
        <span key="comment-nested-reply-to">Reply to</span>
      </template>
      <template #author>
        <a>Han Solo</a>
      </template>
      <template #avatar>
        <a-avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />
      </template>
      <template #content>
        <p>
          We supply a series of design principles, practical patterns and high quality design resources (Sketch and
          Axure).
        </p>
      </template>
      <a-comment>
        <template #actions>
          <span>Reply to</span>
        </template>
        <template #author>
          <a>Han Solo</a>
        </template>
        <template #avatar>
          <a-avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />
        </template>
        <template #content>
          <p>
            We supply a series of design principles, practical patterns and high quality design resources (Sketch and
            Axure).
          </p>
        </template>
        <a-comment>
          <template #actions>
            <span>Reply to</span>
          </template>
          <template #author>
            <a>Han Solo</a>
          </template>
          <template #avatar>
            <a-avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />
          </template>
          <template #content>
            <p>
              We supply a series of design principles, practical patterns and high quality design resources (Sketch and
              Axure).
            </p>
          </template>
        </a-comment>
        <a-comment>
          <template #actions>
            <span>Reply to</span>
          </template>
          <template #author>
            <a>Han Solo</a>
          </template>
          <template #avatar>
            <a-avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />
          </template>
          <template #content>
            <p>
              We supply a series of design principles, practical patterns and high quality design resources (Sketch and
              Axure).
            </p>
          </template>
        </a-comment>
      </a-comment>
    </a-comment>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Comment } from 'ant-design-vue'
export default defineComponent({
  components: {
    'a-comment': Comment
  }
})
</script>
<style scoped>
.comment_body {
  width:"";
  background: hsla(0, 0%, 100%, 0.9);
  border-radius: 10px;
  -webkit-box-shadow: 0 0 12px rgba(0, 0, 0, 0.4);
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.4);
}
</style>

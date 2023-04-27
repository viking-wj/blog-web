<template>
  <div class="comment_box">
    <a-comment>
      <template #avatar>
        <a-avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />
      </template>
      <template #content>
        <a-form-item>
          <a-textarea v-model:value="value" :rows="4" />
        </a-form-item>
        <a-form-item>
          <a-button html-type="submit" :loading="submitting" type="primary" @click="handleSubmit">
            Add Comment
          </a-button>
        </a-form-item>
      </template>
    </a-comment>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)

type Comment = Record<string, string>

export default defineComponent({
  components: {
    'a-comment': Comment
  },
  setup() {
    const comments = ref<Comment[]>([])
    const submitting = ref<boolean>(false)
    const value = ref<string>('')
    const handleSubmit = () => {
      if (!value.value) {
        return
      }

      submitting.value = true

      setTimeout(() => {
        submitting.value = false
        comments.value = [
          {
            author: 'Han Solo',
            avatar: 'https://joeschmoe.io/api/v1/random',
            content: value.value,
            datetime: dayjs().fromNow()
          },
          ...comments.value
        ]
        value.value = ''
      }, 1000)
    }

    return {
      comments,
      submitting,
      value,
      handleSubmit
    }
  }
})
</script>

<style scoped>
.comment_box {
  width: 46.8%;
  margin: 0 auto;
}
</style>
<template>
  <form class="comment-form" novalidate @submit.prevent="submit">
    <div class="field">
      <label class="field__label" for="comment-content">评论内容 <span aria-hidden="true">*</span></label>
      <textarea
        id="comment-content"
        v-model="form.content"
        class="textarea"
        rows="6"
        required
        maxlength="1000"
        placeholder="友善交流，分享你的想法…"
        :aria-invalid="Boolean(errors.content)"
        :aria-describedby="errors.content ? 'comment-content-error' : 'comment-content-hint'"
        @blur="validateField('content')"
      ></textarea>
      <span v-if="errors.content" id="comment-content-error" class="field__error" role="alert">{{
        errors.content
      }}</span>
      <span v-else id="comment-content-hint" class="field__hint">最多 1000 个字符。</span>
    </div>

    <div class="comment-form__grid">
      <div class="field">
        <label class="field__label" for="comment-name">昵称 <span aria-hidden="true">*</span></label>
        <input
          id="comment-name"
          v-model="form.name"
          class="input"
          required
          maxlength="30"
          autocomplete="name"
          @blur="validateField('name')"
        />
        <span v-if="errors.name" class="field__error" role="alert">{{ errors.name }}</span>
      </div>
      <div class="field">
        <label class="field__label" for="comment-email">邮箱 <span aria-hidden="true">*</span></label>
        <input
          id="comment-email"
          v-model="form.email"
          class="input"
          required
          type="email"
          autocomplete="email"
          @blur="validateField('email')"
        />
        <span v-if="errors.email" class="field__error" role="alert">{{ errors.email }}</span>
      </div>
      <div class="field">
        <label class="field__label" for="comment-website">个人网站</label>
        <input
          id="comment-website"
          v-model="form.website"
          class="input"
          type="url"
          autocomplete="url"
          placeholder="https://"
        />
      </div>
    </div>

    <div class="comment-form__actions">
      <label class="button comment-form__upload" for="comment-images">
        添加图片
        <input id="comment-images" class="sr-only" type="file" accept="image/*" multiple @change="selectImages" />
      </label>
      <span class="field__hint">已选择 {{ form.images.length }} 张，最多 4 张。</span>
      <button class="button button--primary" type="submit">发表评论</button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import type { CommentDraft } from '../model/types'

const emit = defineEmits<{
  submit: [draft: CommentDraft]
}>()

const form = reactive<CommentDraft>({
  content: '',
  name: '',
  email: '',
  website: '',
  images: []
})

const errors = reactive<Partial<Record<'content' | 'name' | 'email', string>>>({})

function validateField(field: 'content' | 'name' | 'email'): boolean {
  if (field === 'content') errors.content = form.content.trim() ? '' : '请填写评论内容。'
  if (field === 'name') errors.name = form.name.trim() ? '' : '请填写昵称。'
  if (field === 'email') {
    errors.email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()) ? '' : '请输入有效的邮箱地址。'
  }
  return !errors[field]
}

function selectImages(event: Event): void {
  const input = event.target as HTMLInputElement
  form.images = Array.from(input.files || []).slice(0, 4)
}

function submit(): void {
  const valid = (['content', 'name', 'email'] as const).every(validateField)
  if (!valid) {
    document.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus()
    return
  }

  emit('submit', { ...form, images: [...form.images] })
  form.content = ''
  form.images = []
}
</script>

<style scoped>
.comment-form {
  display: grid;
  gap: var(--space-6);
}

.comment-form__grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: var(--space-4);
}

.comment-form__actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-3);
}

.comment-form__actions .button--primary {
  margin-left: auto;
}

@media (max-width: 47.99rem) {
  .comment-form__grid {
    grid-template-columns: 1fr;
  }

  .comment-form__actions .button--primary {
    width: 100%;
    margin-left: 0;
  }
}
</style>

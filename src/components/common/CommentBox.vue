<template>
  <div class="comment-box">
    <!--评论发布-->
    <div class="comment-textarea blog-bar">
      <div class="textarea-blog">
        <textarea class="area-content" v-model="commentText" placeholder="写下你的评论..." @input="commentChange()">
        </textarea>
        <div :class="[commentText != '' ? 'textarea-title-hasv' : 'textarea-title']">
          <span>{{ title }}</span>
        </div>
      </div>
      <div class="comment-imgs" v-if="commentImg.length > 0">
        <transition-group name="fade-x">
          <div class="c-img-item" v-for="data in commentImg" :key="data.id">
            <img @click="toImg" :src="data.url" />
            <button class="delete-img" @click.stop="deleteImg(data.id)">×</button>
          </div>
        </transition-group>
      </div>
    </div>

    <div class="blog-bar comment-user">
      <div class="comment-user-avatar">
        <img v-if="localfile" :src="localfile" />
        <img v-else src="https://xiamo.oss-cn-shenzhen.aliyuncs.com/xiamo/avatar/acb96e986eb0ac7e456c3c7f3665a59.jpg" />
      </div>
      <div class="comment-user-nickname">
        <div class="comment-tip">
          <div class="tip"><span>输入QQ号将自动拉取头像昵称</span></div>
          <div class="san"></div>
        </div>
        <input type="text" v-model="userInfo.qq" placeholder="QQ号(*)" />
      </div>
      <div class="comment-user-email">
        <div class="comment-tip">
          <div class="tip"><span>你将收到回复通知</span></div>
          <div class="san"></div>
        </div>
        <input type="email" v-model="userInfo.email" placeholder="邮箱(*)" />
      </div>
      <div class="comment-url">
        <div class="comment-tip">
          <div class="tip"><span>你的网站</span></div>
          <div class="san"></div>
        </div>
        <input type="url" v-model="userInfo.website" placeholder="网站" />
      </div>
    </div>

    <div class="blog-bar">
      <div class="biubiubiu" @click="submitComment" :class="{ disabled: !isFormValid }">
        <span>BiuBiuBiu~</span>
      </div>
      <div class="uploadimg">
        <input type="file" id="fileExport" @change="handleFileChange" ref="inputer" accept="image/*" multiple />
        <span><i class="fas fa-image"></i></span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, computed } from 'vue'

interface UserInfo {
  qq: string
  email: string
  website: string
}

interface CommentImage {
  id: number
  url: string
}

interface SubmitCommentData {
  text: string
  images: string[]
  userInfo: UserInfo
}

const emit = defineEmits<{
  (e: 'commentChange', text: string): void
  (e: 'fileChange', files: FileList): void
  (e: 'submit', data: SubmitCommentData): void
}>()

const inputer = ref<HTMLInputElement | null>(null)
const commentText = ref('')
const title = ref('你是我一生只会遇见一次的惊喜 ...')
const localfile = ref('')
const userInfo = reactive<UserInfo>({
  qq: '',
  email: '',
  website: ''
})
const commentImg = reactive<CommentImage[]>([])
let imgIdCounter = 0

// 表单验证
const isFormValid = computed(() => {
  return commentText.value.trim() !== '' && userInfo.qq.trim() !== '' && userInfo.email.trim() !== ''
})

// 图片上传处理
async function handleFileChange(e: Event) {
  const target = e.target as HTMLInputElement
  const files = target.files
  if (files && files.length > 0) {
    // 将图片转换为base64显示预览
    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      const reader = new FileReader()
      reader.onload = (event) => {
        const result = event.target?.result as string
        commentImg.push({
          id: imgIdCounter++,
          url: result
        })
      }
      reader.readAsDataURL(file)
    }
    emit('fileChange', files)
  }
}

// 删除图片
function deleteImg(id: number) {
  const index = commentImg.findIndex((img) => img.id === id)
  if (index !== -1) {
    commentImg.splice(index, 1)
  }
}

// 评论内容变化
function commentChange() {
  emit('commentChange', commentText.value)
}

// 查看大图
function toImg(e: MouseEvent) {
  const target = e.currentTarget as HTMLImageElement
  window.open(target.src, '_blank')
}

// 提交评论
function submitComment() {
  if (isFormValid.value) {
    const images = commentImg.map((img) => img.url)
    emit('submit', {
      text: commentText.value,
      images,
      userInfo: { ...userInfo }
    })
    // 重置表单
    commentText.value = ''
    commentImg.length = 0
  }
}
</script>

<style scoped lang="scss">
.comment-textarea {
  margin-bottom: 100px;

  .comment-imgs {
    margin-top: 10px;

    .c-img-item:nth-child(n + 2) {
      margin-left: 5px;
    }

    .c-img-item {
      display: inline-flex;
      border-radius: 5px;
      border: 1px solid rgba(0, 0, 0, 0.2);
      padding: 2px;
      position: relative;

      img {
        width: 100px;
        border-radius: 2px;
      }

      .delete-img {
        position: absolute;
        top: 5px;
        right: 5px;
        background-color: rgba(0, 0, 0, 0.5);
        color: white;
        border: none;
        border-radius: 50%;
        width: 20px;
        height: 20px;
        font-size: 14px;
        line-height: 1;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        transition: opacity 0.3s ease;

        &:hover {
          background-color: rgba(0, 0, 0, 0.8);
        }
      }

      &:hover {
        .delete-img {
          opacity: 1;
        }
      }
    }
  }

  .textarea-blog {
    position: relative;
    display: flow-root;

    .area-content {
      color: rgba(6, 6, 6, 0.7);
      width: 100%;
      min-height: 240px;
      border: 1px solid rgba(225, 225, 225, 1);
      transition: border 0.2s;
      border-radius: 5px;
      padding: 20px;
      max-width: 100%;
      min-width: 100%;
      background-image: url('https://xiamo.oss-cn-shenzhen.aliyuncs.com/xiamo/%E6%8F%92%E7%94%BB/background.png');
      background-size: contain;
      background-repeat: no-repeat;
      font-size: 13px;
    }

    .textarea-title {
      position: absolute;
      pointer-events: none;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      padding: 20px;

      > span {
        position: relative;
        top: 0;
        left: 0;
        font-size: 14px;
        transition: all 0.2s;
      }
    }

    .area-content {
      float: left;
      font-size: 15px;
    }

    .textarea-title-hasv {
      position: absolute;
      pointer-events: none;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      padding: 20px;

      > span {
        position: relative;
        top: -31px;
        left: -8px;
        color: white;
        display: inline-block;
        font-size: 12px;
        padding: 2px 8px;
        border-radius: 2px;
        background: rgba(250, 154, 0, 1);
      }
    }

    .area-content:focus + .textarea-title > span {
      position: relative;
      top: -31px;
      left: -8px;
      color: white;
      display: inline-block;
      font-size: 12px;
      padding: 2px 8px;
      border-radius: 2px;
      background: rgba(250, 154, 0, 1);
      transition: all 0.2s;
    }

    .area-content:focus {
      border: 1px solid rgba(250, 154, 0, 1);
      outline: none;
      transition: border 0.2s;
    }
  }
}

.biubiubiu {
  width: 720px;
  height: 45px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 3px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  float: left;
  font-size: 14px;
  transition: 0.2s all;
}

.biubiubiu:hover {
  border: 1px solid rgba(250, 154, 0, 1);
  color: rgba(250, 154, 0, 1);
  transition: 0.2s all;
}

.uploadimg:hover {
  border: 1px solid rgba(250, 154, 0, 1);
  color: rgba(250, 154, 0, 1);
  transition: 0.2s all;
}

.uploadimg {
  width: 45px;
  height: 45px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 3px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  float: right;
  font-size: 14px;
  transition: 0.2s all;

  #fileExport {
    position: absolute;
    opacity: 0;
    width: 100%;
    height: 100%;
  }

  span {
    background: white;
    pointer-events: none;
  }
}

.comment-user {
  > div {
    position: relative;

    .comment-tip {
      position: absolute;
      font-size: 13px;
      top: -40px;
      opacity: 0;
      color: white;
      transition: all 0.5s;

      .tip {
        background: rgba(85, 85, 85, 0.7);
        padding: 10px;
        border-radius: 5px;
      }

      .san {
        position: absolute;
        right: 20px;
        width: 20px;
        height: 20px;
        border: unset;
        border-radius: unset;
        background: rgba(85, 85, 85, 0.7);
        clip-path: polygon(0 0, 100% 0, 54% 60%, 46% 60%);
      }
    }
  }

  .comment-user-nickname:hover .comment-tip,
  .comment-user-email:hover .comment-tip,
  .comment-url:hover .comment-tip {
    top: -60px;
    opacity: 1;
  }

  div:nth-child(n + 2) {
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 3px;
    display: inline-flex;

    > input {
      width: 100%;
      height: 100%;
      border: unset;
      padding: 0 20px;
      font-size: 15px;
    }

    > input:focus {
      outline: none;
    }
  }

  .comment-user-avatar {
    height: 65px;
    width: 65px;
    float: left;
    border-radius: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    > img {
      height: 95%;
      width: 95%;
      border-radius: 100%;
    }
  }

  .comment-user-nickname {
    margin-left: 10px;
    height: 65px;
    width: 222px;
  }

  .comment-user-email {
    margin-left: 10px;
    height: 65px;
    width: 222px;
  }

  .comment-url {
    margin-left: 10px;
    height: 65px;
    width: 222px;
  }
}
</style>

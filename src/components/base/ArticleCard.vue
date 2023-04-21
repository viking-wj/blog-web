<template>
  <div class="aritcle_card">
    <div class="head_image"></div>
    <div class="article_info">
      <div class="article_title">articleTitle</div>
      <div class="article_content">article_content</div>
      <div class="article_statics">
        <div>
          <heart-outlined class="statics_icon" />
          <span class="statics_number">12</span>
        </div>
        <div>
          <star-outlined class="statics_icon" />
          <span class="statics_number">12</span>
        </div>
        <div>
          <comment-outlined class="statics_icon" />
          <span class="statics_number">12</span>
        </div>
      </div>
      <div class="article_card_bottom">
        <span class="user_info">
          <HeadFrame :size="24"></HeadFrame>
        </span>
        <span class="release_time">
          <history-outlined />
          发布于xxxx年xx月xx时
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import HeadFrame from '../common/HeadFrame.vue'
import { HeartOutlined, HistoryOutlined, StarOutlined, CommentOutlined } from '@ant-design/icons-vue'
export default defineComponent({
  components: {
    HeadFrame,
    HeartOutlined,
    HistoryOutlined,
    StarOutlined,
    CommentOutlined
  }
})
</script>
<style scoped>
.aritcle_card {
  width: 40%;
  height: 35vh;
  margin: 0px auto;
  margin-top: 30px;
  background: hsla(0, 0%, 100%, 0.9);
  border-radius: 10px;
  -webkit-box-shadow: 0 0 12px rgba(0, 0, 0, 0.4);
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.4);
}
.head_image {
  float: left;
  width: 60%;
  background-color: rgb(57, 123, 182);
}
.article_info {
  width: 40%;
  float: right;
}

.article_title {
  font-size: 17px;
  font-weight: 700;
  font-family: AdobeCleanHanSC !important;
  padding-top: 20px;
  margin-left: 9%;
}
.article_content {
  margin-top: 4px;
  height: 20vh;
  margin-left: 9%;
}
.article_statics {
  display: flex;
  justify-content: space-around;
}
.article_card_bottom {
  margin-top: 10%;
}
.user_info {
  margin-left: 9%;
}
.release_time {
  font-size: 14px;
  font-weight: 700;
  line-height: 30px;
  font-family: AdobeCleanHanSC !important;
  float: right;
  margin-right: 10%;
}
.statics_icon {
  font-size: 16px;
}
.statics_number {
  padding-left: 10px;
}
</style>
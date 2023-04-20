<template>
  <div class="aritcle_card">
    <div class="head_image"></div>
    <div class="article_info">
      <div class="article_title">articleTitle</div>
      <div class="article_content">article_content</div>
      <div class="article_statics"></div>
      <div class="article_card_bottom">
        <div class="user_info">
          <HeadFrame :size="24"></HeadFrame>
        </div>
        <div class="release_time">发布于XXX年xx月xx时</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import HeadFrame from '../common/HeadFrame.vue';
export default defineComponent({
  components: {
    HeadFrame,
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
.head_image{
  float: left;
  width: 60%;
}
.article_info{
  width: 40%;
  float: right;
}

</style>
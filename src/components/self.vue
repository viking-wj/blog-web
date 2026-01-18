<template>
  <div id="self">
    <!--    <div :style="{'height':height+'px'}">-->
    <div>
      <div class="detail">
        <div
          class="avatar_box"
          :style="{ 'background-image': 'url(' + avatar2 + ')' }"
        >
          <div class="avatar_img">
            <img :src="avatar" />
            <img :src="avatar3" />
          </div>
        </div>
        <div class="message_box">
          <div class="message_text">
            <span>
              <i class="fa fa-quote-left sentence_icon"></i>
              {{ sentence }}
              <i class="fa fa-quote-right sentence_icon"></i>
            </span>
          </div>
          <div class="social">
            <img
              src="https://cdn.jsdelivr.net/gh/moezx/cdn@3.1.9/img/Sakura/images/sns/github.png"
            />
            <img
              src="https://cdn.jsdelivr.net/gh/moezx/cdn@3.1.9/img/Sakura/images/sns/qq.png"
            />
            <img
              src="https://cdn.jsdelivr.net/gh/moezx/cdn@3.1.9/img/Sakura/images/sns/bilibili.png"
            />
            <img
              src="https://cdn.jsdelivr.net/gh/moezx/cdn@3.1.9/img/Sakura/images/sns/wangyiyun.png"
            />
            <img
              src="https://cdn.jsdelivr.net/gh/moezx/cdn@3.1.9/img/Sakura/images/sns/email.svg"
            />
          </div>
        </div>
      </div>
      <!--波浪start-->
      <div class="wave1"></div>
      <div class="wave2"></div>
      <!--波浪end-->
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
let height = ref(document.documentElement.clientHeight);
let avatar = ref(
  'https://myblog-w.oss-cn-shenzhen.aliyuncs.com/assest/avatar_admin.jpg'
);
let avatar2 = ref(
  'https://xiamo.oss-cn-shenzhen.aliyuncs.com/avatar/box/avatar_box.png'
);
let avatar3 = ref(
  'https://xiamo.oss-cn-shenzhen.aliyuncs.com/gif/i585v-vgfjl.gif'
);
let sentence = ref('像繁星一样，黯淡了的');
</script>

<style scoped>
.detail {
  width: 600px;
  height: 500px;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  margin: auto;
  z-index: 10;
}

.avatar_box {
  width: 150px;
  height: 150px;
  background-repeat: no-repeat;
  background-size: 100%;
  position: relative;
  margin: 0 auto;
}

.avatar_img {
  width: 85px;
  height: 85px;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  z-index: -1;
}

.avatar_img img {
  width: 100%;
  border-radius: 100%;
}

.avatar_img img:first-child {
  position: absolute;
  transform: rotate(0deg);
  opacity: 1;
  transition: all 0.8s linear;
}

.avatar_box:hover .avatar_img img:first-child {
  transform: rotate(360deg);
  opacity: 0;
  transition: all 0.8s linear;
}

.avatar_img img:nth-child(2) {
  width: 100%;
  border-radius: 100%;
  opacity: 0;
  transition: all 0.8s linear;
}

.avatar_box:hover .avatar_img img:nth-child(2) {
  opacity: 1;
  transition: all 0.8s linear;
}

.message_box {
  width: 100%;
  height: 90px;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  margin-top: 15px;
}

.message_text {
  width: 100%;
  height: 30px;
  color: white;
  text-align: center;
  padding-top: 15px;
}

.sentence_icon {
  animation: iconHideOrShow 1s linear infinite;
}

.social {
  text-align: center;
}

.social img {
  width: 25px;
  margin: auto 6px;
}
</style>

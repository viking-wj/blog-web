<template>
  <div id="home">
    <div class="home-background-img">
      <img src="https://myblog-w.oss-cn-shenzhen.aliyuncs.com/assest/background.png" />
    </div>
    <!-- 将self组件包裹在一个容器中，方便定位 -->
    <div class="content-container">
      <self></self>
      <contents></contents>
    </div>
  </div>
</template>

<script lang="ts" setup>
import self from '@/components/self.vue'
import contents from '@/components/contents.vue'
import { ref, Ref } from 'vue'

const scrollv: Ref<number> = ref(0)

function resetScrollv() {
  let yOffset = document.documentElement.scrollTop
  scrollv.value = yOffset
}
</script>

<style scoped>
#home {
  margin: 0;
  /* 确保home容器占满整个视口 */
  width: 100%;
  min-height: 100vh;
  /* 相对定位，作为子元素的定位容器 */
  position: relative;
}

.home-background-img {
  /* 背景图片容器绝对定位，只覆盖首屏 */
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  /* 置于底层，只作为首屏背景 */
  z-index: 0;
}

.home-background-img img {
  /* 背景图片铺满容器 */
  width: 100%;
  height: 100%;
  object-fit: cover;
  /* 确保图片居中 */
  object-position: center;
}

.content-container {
  /* 内容容器相对定位 */
  position: relative;
  /* 置于中层 */
  z-index: 1;
}

self {
  /* self组件占满视口高度，确保其内容能居中 */
  display: block;
  width: 100%;
  height: 100vh;
  /* 确保self组件显示在背景图片之上 */
  position: relative;
  z-index: 2;
}

contents {
  /* contents组件从第二屏开始显示，避免与背景图片重叠 */
  display: block;
  width: 100%;
  /* 添加margin-top，确保contents组件从首屏下方开始显示 */
  margin-top: -50px;
  /* 设置较高的z-index，确保contents组件显示在所有背景之上 */
  position: relative;
  z-index: 3;
}
</style>

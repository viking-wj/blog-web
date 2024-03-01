<template>
  <div id="home">
    <div class="home-background-img">
      <img
        src="https://myblog-w.oss-cn-shenzhen.aliyuncs.com/assest/background.png"
      />
    </div>
    <self></self>
    <contents></contents>
  </div>
</template>

<script lang="ts" setup>
import self from '@/components/self.vue';
import contents from '@/components/contents.vue';
import { ref, Ref } from 'vue';

const scrollv: Ref<number> = ref(0);

function resetScrollv() {
  let yOffset = document.documentElement.scrollTop;
  scrollv.value = yOffset;
}
</script>

<style scoped>
self {
  position: relative;
  z-index: -1;
}

/*#home::before{*/
/*  content: '';*/
/*  position: absolute;*/
/*  top: 0;*/
/*  bottom: 0;*/
/*  left: 0;*/
/*  right: 0;*/
/*  z-index: -1;*/
/*  background-attachment: fixed;*/
/*  background-image: url("https://cdn.jsdelivr.net/gh/moezx/cdn@3.1.9/img/Sakura/images/dot.gif");*/
/*}*/

#home {
  margin: -8px;
  /*background: url('../../static/image/1.png') no-repeat;*/
  /*background-size:100% 100%;*/
}

.home-background-img {
  height: 100vh;
  text-align: center;
}

.home-background-img img {
  height: 100%;
  width: 100%;
  margin: 0 -100%;
}
</style>

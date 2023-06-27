<template>
  <div class="headBar" :class="[isTools ? 'dark' : '']">
    <div :class="['top', jsHover ? 'topJsHover' : '']">
      <div class="img_div">
        <img src="https://xiamo.oss-cn-shenzhen.aliyuncs.com/gitee-mashiro/star.png" />
      </div>
      <div class="title" @click="toLink('/')"><span>W</span></div>
      <div :class="['menu', jsHover ? 'menuHover' : '']">
        <div class="item" v-for="(data, index) in menu" :key="index">
          <div :class="['item_font', data.name]" @mouseenter="itemHover(data.name)" @mouseleave="itemLeave(data.name)">
            <div @click="toLink(data.link)">
              <i :class="[data.class]"></i>
              <span>{{ data.text }}</span>
            </div>
            <div class="item_font_strip"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import router from '@/router';
import { ref, reactive, defineEmits } from 'vue'
const emit = defineEmits(["showSakura"]);
let isTools = ref(false);
let jsHover = ref(false);
let menu = reactive([
  {
    name: "main",
    text: "首页",
    class: "fas fa-tree",
    index: 1,
    link: "/",
  },
  {
    name: "shuoshuo",
    text: "说说",
    class: "fas fa-star",
    index: 2,
    link: "/shuoshuo",
  },
  {
    name: "suibi",
    text: "随笔",
    class: "fas fa-broom",
    index: 2,
    link: "/tools",
  },
]);

function toLink(link: string) {
  if (link == "/tools") {
    emit("showSakura", false);
    isTools.value = true;
  } else {
    emit("showSakura", true);
    isTools.value = false;
  }
  router.push(link);
}

function itemHover(name: string) {
  $("." + name + ">.item_font_strip").css("width", "100%");
  $("." + name).css("color", "#fe9600");
}

function itemLeave(name: string) {
  $("." + name + ">.item_font_strip").css("width", "0%");
  $("." + name).css("color", "unset");
}

defineExpose({
  isTools,
  jsHover
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.dark {
  color: white;

  .top:hover {
    background: rgba(0, 0, 0, 0.8);
    box-shadow: 0 0 30px rgba(0, 0, 0, 1);
    transition: all 0.25s linear;
  }

  .topJsHover {
    background: rgba(0, 0, 0, 0.8);
  }
}

.item {
  position: relative;
  margin-right: 20px;
  font-weight: bolder;
  font-size: 18px;
  height: 100%;
  display: flex;
}

.menu {
  display: flex;
  margin-left: auto !important;
  margin-right: 50px;
  position: relative;
  left: -50px;
  opacity: 0;
  margin: 0 auto;
  transition: left 0.3s linear, opacity 0.3s linear;
}

.menuHover {
  left: -70px;
  opacity: 1;
}

.top:hover .menu {
  left: -70px;
  opacity: 1;
}

.item_font {
  align-self: center;
  width: auto;
  transition: color 0.2s linear;
}

/*.item_font::before {*/
.item_font_strip {
  height: 5px;
  width: 0%;
  position: absolute;
  background: #fe9600;
  bottom: 0px;
  transition: width 0.2s linear;
}

.headBar {
  max-width: 100vw;
  margin: -8px;
}

.img_div {
  align-self: center;
  margin-left: 35px !important;
}

.img_div>img {
  width: 35px;
  animation: img_spin 3s linear infinite;
}

/* 
  .top:hover .img_div > img {
    animation: img_spin 3s linear infinite;
  } */

@keyframes img_spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

.top {
  height: 90px;
  position: relative;
  background: unset;
  box-shadow: unset;
  transition: background 0.25s linear, box-shadow 0.25s linear;
  display: flex;
}

.top:hover {
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 0 0 20px rgba(0, 0, 0, 1);
  transition: all 0.25s linear;
}

.topJsHover {
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 0 0 20px rgba(0, 0, 0, 1);
}

.top>div {
  margin-left: 15px;
}

.title {
  display: inline-block;
  align-self: center;
  font-size: 25px;
  font-weight: bolder;
}

/*.top::before {*/
/*  content: "";*/
/*  position: absolute;*/
/*  width: 100%;*/
/*  height: 90px;*/
/*  z-index: -1;*/
/*  transform: rotate(3deg);*/
/*  box-shadow: 0 10px 30px rgba(0, 0, 0, 1);*/
/*  bottom: 50px;*/
/*  margin: 0px;*/
/*  right: 20px;*/
/*}*/

/*.top::after {*/
/*  content: "";*/
/*  position: absolute;*/
/*  z-index: -1;*/
/*  width: 100%;*/
/*  height: 90px;*/
/*  transform: rotate(-3deg);*/
/*  box-shadow: 0 10px 30px rgba(0, 0, 0, 1);*/
/*  bottom: 50px;*/
/*  margin: 0px;*/
/*  left: 20px;*/
/*}*/
</style>

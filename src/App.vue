<template>
  <div id="app">
    <a @click="scrollClick"><img class="scroll" src="../static/image/scroll.png"></a>
    <headBar ref="headBar" @showSakura="showSakura"></headBar>
    <transition name="fade">
      <router-view class="routerBar" @changeHeadCss="changeHeadCss" @showSakura="showSakura"></router-view>
    </transition>
  </div>
</template>

<script>
  import headBar from '@/components/headBar.vue'
  import home from '@/views/home/index.vue'

  export default {
    name: 'App',
    data() {
      return {
        scrollInterval: '',
        scrollTop: 0,
        routerLink: '',
      }
    },
    components: {
      headBar,
      home: home,
    },
    methods: {
      showSakura(is){
        this.$nextTick(function () {
          // let canvas_sakura = document.getElementById('canvas_sakura')
          // console.log(canvas_sakura)
          // if (is){
          //   canvas_sakura.style.display = "block"
          // }else{
          //   canvas_sakura.style.display = "none"
          // }
        })
      },
      changeHeadCss() {
        // console.log("%c修改头部css", "color:red")
        this.$refs.headBar.isTools = true
      },
      handleScroll() {
        this.routerLink = this.$router.currentRoute.fullPath;
        if (this.routerLink === '/') {
          if (window.pageYOffset > 0) {
            this.$refs.headBar.jsHover = true;
          } else {
            this.$refs.headBar.jsHover = false;
          }
        }
        if (window.pageYOffset > 90) {
          $('.scroll').css('top', this.scrollTop + 'px')
        } else {
          $('.scroll').css('top', '-920px')
        }
      },
      scrollClick() {
        let _this = this;
        let yOffset = window.pageYOffset;
        let yLess = 1;
        yLess = yOffset / 50;
        _this.scrollInterval = setInterval(function () {
          let yOffset = window.pageYOffset;
          if (yOffset > 1) {
            window.scrollTo(0, yOffset - yLess);
          } else {
            clearInterval(_this.scrollInterval);
          }
        }, 10)

      },
    },
    //创建
    created() {
      document.addEventListener('scroll', this.handleScroll, true);
      this.scrollTop = document.documentElement.clientHeight;
      this.scrollTop = 80 - (this.scrollTop - (947 - 150))
      this.$watch("routerLink", function (newValue, oldValue) {
        if (newValue === '/') {
          window.scrollTo(0, 0);
        }
      })
    },
    //加载完毕
    mounted() {
      this.handleScroll()
    }
  }
</script>

<style>
  #app {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }

  .headBar {
    position: fixed;
    width: 100%;
    z-index: 100;
  }

  ::-webkit-scrollbar {
    /*滚动条整体样式*/
    width: 5px; /*高宽分别对应横竖滚动条的尺寸*/
    height: 10px;
  }

  ::-webkit-scrollbar-thumb {
    /*滚动条里面小方块*/
    border-radius: 10px;
    background-color: rgba(255, 255, 0, .8);
    background-image: -webkit-linear-gradient(
      45deg,
      rgba(255, 255, 0, 0.2) 25%,
      transparent 25%,
      transparent 50%,
      rgba(255, 255, 0, 0.2) 50%,
      rgba(255, 255, 0, 0.2) 75%,
      transparent 75%,
      transparent
    );
  }

  ::-webkit-scrollbar-track {
    /*滚动条里面轨道*/
    box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    background: #ededed;
    border-radius: 10px;
  }

  .scroll {
    position: fixed;
    right: 55px;
    top: -920px;
    z-index: 99;
    transition: top .3s linear;
    animation: scrollMove 2.5s linear infinite;
  }

  .routerBar {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
</style>

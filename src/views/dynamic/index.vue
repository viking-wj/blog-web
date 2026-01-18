<template>
  <div class="shuoshuo">
    <div class="background">
      <img src="../../static/image/3.png" />
    </div>
    <div class="shuoshuo-bar" v-for="index of 5" :key="index">
      <img
        class="avatar"
        src="https://myblog-w.oss-cn-shenzhen.aliyuncs.com/assest/avatar_admin.jpg"
      />
      <div class="shuoshuo-content">
        <span class="angle-right"><i class="fas fa-angle-right"></i></span>
        <div
          class="text-bar"
          :style="{
            background: 'rgba(' + colors[index % colors.length] + ',1)',
            'box-shadow':
              ' 0 0 5px rgba(' + colors[index % colors.length] + ',1)'
          }"
          @mouseenter="
            textEnter(
              '0 10px 20px rgba(' + colors[index % colors.length] + ',1)',
              index
            )
          "
          @mouseleave="
            textLeave(
              '0 0 5px rgba(' + colors[index % colors.length] + ',1)',
              index
            )
          "
        >
          <div class="ql-container ql-snow ql-bar">
            <div class="ql-editor" v-html="content"></div>
          </div>
          <div style="border-top: 1px dashed #fff"></div>
          <div class="time-bar">
            <i class="far fa-clock"></i>
            2020年5月15日1:49
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'dynamic',
  data() {
    return {
      content:
        '<p>123</p><h2>123</h2><p>123</p><pre class="ql-syntax" spellcheck="false">：asdfsdfsadfkljskfld\n' +
        '</pre><blockquote>123</blockquote><p>213213123</p><p>87976970</p><p>&lt;a&gt;123&lt;/a&gt;</p>' +
        '</pre><blockquote>123</blockquote><p>213213123</p><p>87976970</p><p>&lt;a&gt;123&lt;/a&gt;</p>' +
        '</pre><blockquote>123</blockquote><p>213213123</p><p>87976970</p><p>&lt;a&gt;123&lt;/a&gt;</p>' +
        '</pre><blockquote>123</blockquote><p>213213123</p><p>87976970</p><p>&lt;a&gt;123&lt;/a&gt;</p>',
      editorOption: {
        placeholder: '编辑文章内容'
      },
      next_blog_img:
        'https://xiamo.oss-cn-shenzhen.aliyuncs.com/gitee-mashiro/10.jpg',
      next_blog_title: 'emmmmmm',
      colors: ['208,182,213', '139,108,163', '159,198,232', '120,185,176']
    };
  },
  methods: {
    textEnter(boxShadow, index) {
      // debugger
      console.log(boxShadow);
      $('.shuoshuo-bar[index=' + index + ']')
        .find('div.text-bar')
        .css('box-shadow', boxShadow);
    },
    textLeave(boxShadow, index) {
      $('.shuoshuo-bar[index=' + index + ']')
        .find('div.text-bar')
        .css('box-shadow', boxShadow);
    }
  },
  mounted() {
    window.scrollTo(0, 0);
    this.$parent.$refs.headbar.jsHover = true;
  },
  destroyed() {
    this.$parent.routerLink = this.$router.currentRoute.fullPath;
  }
};
</script>

<style scoped>
.background {
  height: 400px;
  margin: 90px -8px -8px;
  overflow: hidden;
}

.background img {
  width: 100%;
}

.ql-bar {
  border: unset !important;
}

.shuoshuo {
  height: 1500px;
  margin-bottom: 300px;
}

.shuoshuo-bar {
  width: 780px;
  min-width: 780px;
  margin: 70px auto 0 auto;
  min-height: 300px;
  display: flex;
  color: white;
}

.avatar {
  border: 1px solid #ddd;
  height: 70px;
  border-radius: 100%;
  float: left;
  transform: rotate(0deg);
  transition: transform 1s ease;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.3);
}

.shuoshuo-content {
  height: 100%;
  width: 700px;
  float: right;
}

.angle-right {
  font-size: 31px;
  position: relative;
  top: 20px;
  left: 5px;
  float: left;
  animation: iconHideOrShow 1s linear infinite;
}

.text-bar {
  height: 90%;
  width: 665px;
  float: right;
  border-radius: 10px;
  min-height: 300px;
  position: relative;
  top: 0;
  transition: top 0.3s linear, box-shadow 0.3s linear;
}

.text-bar:hover {
  top: -5px;
}

.time-bar {
  position: relative;
  left: 15px;
  margin: 10px auto;
  font-size: 12px;
}

.shuoshuo-bar:hover .avatar {
  transform: rotate(720deg);
}

.shuoshuo-bar:last-child {
  padding-bottom: 200px;
}
</style>

<template>
  <div class="blog">
    <div class="background">
      <img
        src="https://xiamo.oss-cn-shenzhen.aliyuncs.com/gitee-mashiro/3.png"
      />
    </div>

    <div class="ql-container ql-snow ql-bar blog-bar">
      <div class="ql-editor" v-html="marked(article.context)"></div>
    </div>

    <div
      class="next_blog blog-bar"
      :style="{ background: 'url(' + comment.nextBlogImg + ') no-repeat 100%' }"
    >
      <span>Previous Post</span>
      <span>{{ comment.nextBlogTitle }}</span>
      <div class="mask"></div>
    </div>

    <!-- 文章发布人信息 -->
    <div
      class="split-line blog-bar"
      style="text-align: center"
      id="blog-creator"
    >
      <div class="user_avatar">
        <img
          src="https://xiamo.oss-cn-shenzhen.aliyuncs.com/gitee-mashiro/avatar.jpg"
        />
      </div>
      <div class="blogger" style="color: #ababab">
        <span>{{ article.author.name }}</span>
      </div>
      <span class="signature" style="color: #7d8588"
        ><i
          class="fas fa-pencil-alt"
          style="margin-right: 8px; color: #fe9600"
        ></i
        >がんばって！</span
      >
    </div>
    <!-- 评论模块暂缓 -->
    <transition name="fade-x">
      <div
        class="show-comments blog-bar"
        v-if="comment.showCbtn"
        @click="showCom"
      >
        <div class="line-grey">
          <span class="text-black">
            <i class="far fa-comment-dots" style="margin-right: 5px"></i
            >查看评论 -
          </span>
          <span class="text-gray">5条评论</span>
        </div>
      </div>
    </transition>

    <transition name="comment">
      <div class="blog-bar comments" v-if="comment.showComment">
        <div class="comments-title text-black">
          <span>Comments | </span>
          <span>5条评论</span>
          <span class="text-orange" @click="hideCom">收起评论</span>
        </div>
        <div
          class="comment-bar border-bottom-x"
          v-for="index of 5"
          :key="index"
        >
          <div class="comment-user-info">
            <div class="comment-user-avatar">
              <img
                src="https://xiamo.oss-cn-shenzhen.aliyuncs.com/gitee-mashiro/avatar.jpg"
              />
            </div>
            <div class="comment-info">
              <div class="comment-user-nickname">
                <span class="cu-tag line-pink user-type">博主</span>
                <span class="text-orange text-bold user-nickname">xiamo</span>
              </div>
              <div class="comment-text text-gray">
                <span>发布于 5 天前 来自: 湖南省株洲市 联通</span>
              </div>
            </div>
          </div>
          <div class="comment-content">
            <div class="comment-imgs">
              <div class="c-img-item">
                <img
                  @click="toImg"
                  src="https://xiamo1024.cn/images/2021/02/07/11468713c6b0.jpg"
                />
              </div>
              <div class="c-img-item">
                <img
                  @click="toImg"
                  src="https://xiamo.oss-accelerate.aliyuncs.com/xiamo/WordPress/2021/02/2a4e06368d34db198416c67074b79bac.png"
                />
              </div>
              <div class="c-img-item">
                <img
                  @click="toImg"
                  src="https://xiamo.oss-accelerate.aliyuncs.com/xiamo/WordPress/2021/02/c3d27bf167d0be1b895970e80630bb92-1.jpg"
                />
              </div>
            </div>
            <div class="content-text text-black">
              <p>
                emmm<span class="emoji-s emoji-inline"
                  ><img
                    src="https://cdn.jsdelivr.net/gh/moezx/cdn@2.9.4/img/bili/guilian.png" /></span
                >mmmmmmmmmmmmmmmm emmmmmmmmmmmmmmmm<span
                  class="emoji-s emoji-inline"
                  ><img
                    src="https://cdn.jsdelivr.net/gh/moezx/cdn@2.9.4/img/bili/guilian.png" /></span
                >mmmmmmmmmmmmmmmm
              </p>
            </div>
          </div>
        </div>

        <div class="comment-textarea blog-bar">
          <div class="textarea-blog">
            <textarea
              class="area-content"
              v-model="comment.this"
              @blur="commentChange()"
            >
            </textarea>
            <div
              :class="[
                comment.this != '' ? 'textarea-title-hasv' : 'textarea-title'
              ]"
            >
              <span>
                {{ comment.title }}
              </span>
            </div>
          </div>
          <div class="comment-imgs">
            <transition-group name="fade-x">
              <div
                class="c-img-item"
                v-for="data in comment.commentImg"
                :key="data.id"
              >
                <img @click="toImg" :src="data.url" />
              </div>
            </transition-group>
          </div>
        </div>

        <div class="blog-bar comment-user">
          <div class="comment-user-avatar">
            <img v-if="comment.localfile" :src="comment.localfile" />
            <img
              v-else
              src="https://xiamo.oss-cn-shenzhen.aliyuncs.com/xiamo/avatar/acb96e986eb0ac7e456c3c7f3665a59.jpg"
            />
          </div>
          <div class="comment-user-nickname">
            <div class="comment-tip">
              <div class="tip"><span>输入QQ号将自动拉取头像昵称</span></div>
              <div class="san"></div>
            </div>
            <input type="text" placeholder="QQ号(*)" />
          </div>
          <div class="comment-user-email">
            <div class="comment-tip">
              <div class="tip"><span>你将收到回复通知</span></div>
              <div class="san"></div>
            </div>
            <input type="text" placeholder="邮箱(*)" />
          </div>
          <div class="comment-url">
            <div class="comment-tip">
              <div class="tip"><span>你的网站</span></div>
              <div class="san"></div>
            </div>
            <input type="text" placeholder="网站" />
          </div>
        </div>

        <div class="blog-bar">
          <div class="biubiubiu">
            <span>BiuBiuBiu~</span>
          </div>
          <div class="uploadimg">
            <input
              type="file"
              id="fileExport"
              @change="handleFileChange"
              ref="inputer"
            />
            <span><i class="fas fa-image"></i></span>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router';
import { ref, reactive, onMounted, onUnmounted } from 'vue';
import { searchArticleDetail } from '@/api/article';
import { marked } from 'marked';

let comment = reactive({
  title: '你是我一生只会遇见一次的惊喜 ...',
  this: '',
  showCbtn: true,
  showComment: false,
  startani: false,
  startani2: false,
  content:
    '<p>123</p><h2>123</h2><p>123</p><pre class="ql-syntax" spellcheck="false">：asdfsdfsadfkljskfld\n' +
    '</pre><blockquote>123</blockquote><p>213213123</p><p>87976970</p><p>&lt;a&gt;123&lt;/a&gt;</p>',
  editorOption: {
    placeholder: '编辑文章内容'
  },
  nextBlogImg:
    'https://xiamo.oss-cn-shenzhen.aliyuncs.com/gitee-mashiro/10.jpg',
  nextBlogTitle: 'emmmmmm',
  file: null,
  localfile: '',
  commentImg: [] as any
});

let article = reactive({
  id: '',
  author: {
    id: '',
    name: '',
    avatar: ''
  },
  category: {},
  title: '',
  context: '',
  thumbnail: '',
  sourceLink: '',
  releaseTime: ''
});

onMounted(() => {
  const { params } = useRoute();
  window.scrollTo(0, 0);
  // this.$parent.$refs.headbar.jsHover = true;
  loadArticle(params.id[0]);
});

onUnmounted(() => {
  // this.$parent.routerLink = this.$router.currentRoute.fullPath;
});

function loadArticle(articleId: string) {
  searchArticleDetail(articleId).then(({ data: data }) => {
    article = data;
    console.log(data);
    // article.context = marked(article.context);
  });
}
// 图片上传
async function handleFileChange(e: any) {
  console.log('upload pic');
}

function commentChange() {
  console.log('commentChange');
}

function showCom() {
  comment.showComment = true;
  comment.showCbtn = false;
  // let yOffset = document.documentElement.scrollTop;
  let creator: any = document.getElementById('blog-creator');
  let scrollto = creator.offsetTop - 100;
  let scrollInterval = setInterval(function () {
    let yOffset2 = document.documentElement.scrollTop;
    if (yOffset2 < scrollto) {
      window.scrollTo(0, yOffset2 + 10);
    } else {
      clearInterval(scrollInterval);
    }
  }, 10);
}

function hideCom() {
  comment.showCbtn = true;
  comment.showComment = false;
  let creator: any = document.getElementById('blog-creator');
  let scrollto = creator.offsetTop - 500;
  let yOffset = document.documentElement.scrollTop;
  let yLess = 1;
  yLess = (yOffset - scrollto) / 40;
  let scrollInterval = setInterval(function () {
    let yOffset2 = document.documentElement.scrollTop;
    if (yOffset2 - scrollto > 1) {
      window.scrollTo(0, yOffset2 - yLess);
    } else {
      clearInterval(scrollInterval);
    }
  }, 10);
}

function Toggle(e: any) {
  var anmiaton = e.currentTarget.dataset.class;
  console.log(anmiaton);
  // this.animation = anmiaton;
  // 定时清空动画
  setTimeout(() => {
    // this.animation = '';
  }, 1000);
}
function toImg(e: any) {
  window.open(e.currentTarget.src, '_blank');
}
function onEditorChange({ editor, html, text }: any) {
  comment.content = html;
  console.log(html);
}
</script>

<style scoped lang="scss">
.uploadimg {
  position: relative;
  overflow: hidden;

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
      /*box-shadow: 0 0 5px rgba(0,0,0,.4);*/
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
}

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

      img {
        width: 100px;
        border-radius: 2px;
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

.show-comments {
  padding-bottom: 110px;
  text-align: center;

  > div {
    padding: 20px 70px;
    border: 1px solid #ddd;
    display: inline-block;

    > span:nth-child(1) {
      font-size: 15px;
    }

    > span:nth-child(2) {
      font-size: 13px;
    }
  }
}

.comment-bar {
  .comment-user-info {
    display: flow-root;

    .comment-user-avatar {
      float: left;

      img {
        height: 50px;
        width: 50px;
        border-radius: 100%;
      }
    }

    .comment-info {
      margin-left: 10px;
      float: left;
      height: 50px;

      .comment-user-nickname {
        height: 50%;
        display: flex;
        align-items: flex-end;

        .user-type {
          font-size: 12px;
          border: 1px solid;
          border-radius: 5px;
        }

        .user-nickname {
          margin-left: 5px;
          font-size: 15px;
        }
      }

      .comment-text {
        height: 50%;
        display: flex;
        align-items: flex-start;
        font-size: 12px;

        > span {
          margin-top: 5px;
        }
      }
    }
  }

  .comment-content {
    margin-top: 10px;

    .comment-imgs {
      .c-img-item {
        display: inline-flex;
        border-radius: 5px;
        border: 1px solid rgba(0, 0, 0, 0.2);
        padding: 2px;

        img {
          width: 100px;
          border-radius: 2px;
        }
      }
    }
  }

  .content-text {
    margin: 35px auto;
    font-size: 14px;

    .emoji-s {
      margin: 6px;
      display: inline-block;
      width: 32px;
      height: 32px;
      overflow: hidden;
      border-radius: 4px;
      margin-bottom: -8px;

      img {
        width: 100%;
        height: 100%;
      }
    }

    .emoji-inline {
      padding-left: 0 !important;
      padding-right: 0 !important;
    }
  }
}

.comments {
  padding-bottom: 150px;

  .comment-bar {
    margin-top: 60px;
  }

  .comments-title {
    > span:nth-child(1) {
      font-size: 18px;
    }

    > span:nth-child(2) {
      font-size: 14px;
    }

    > span:nth-child(3) {
      float: right;
      font-size: 15px;
    }
  }
}

.background {
  height: 400px;
  margin: 90px -8px -8px;
  overflow: hidden;
}

.background img {
  width: 100%;
}

.blog-bar {
  width: 40%;
  min-width: 780px;
  margin: 70px auto 0 auto;
  border: unset !important;
  transition: all 0.5s;
}

.ql-bar {
  min-height: 500px;
  height: auto;
}

.next_blog {
  min-height: 140px;
  z-index: 1;
}

.next_blog span {
  position: absolute;
  margin-left: 60px;
  margin-top: 45px;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.7);
  z-index: 3;
}

.next_blog span:nth-child(2) {
  margin-top: 70px;
  text-transform: unset;
  color: #fff;
}

.next_blog:hover .mask {
  background: rgba(0, 0, 0, 0.2);
}

.mask {
  background: rgba(0, 0, 0, 0.4);
  height: 140px;
  width: 780px;
  position: absolute;
  z-index: 2;
  transition: background 0.15s linear;
}

.split-line {
  /*border-top: 1px dashed #ddd;*/
  /*border-bottom: 1px dashed #ddd;*/
  height: 230px;
  margin-bottom: 0px;
}

.user_avatar {
  margin-top: 20px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  display: inline-flex;
  border-radius: 100%;
  padding: 2px;

  img {
    height: 70px;
    height: 70px;
    border-radius: 100%;
  }
}

.signature {
  border-top: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
  top: 40px;
  position: relative;
  padding: 10px;
}

.blogger {
  position: relative;
  top: 10px;
}
</style>

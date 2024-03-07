<template>
  <div>
    <div class="comment-bar border-bottom-x">
      <!--评论人信息-->
      <div class="comment-user-info">
        <div class="comment-user-avatar">
          <img :src="props.comment.user.avatar" />
        </div>
        <div class="comment-info">
          <div class="comment-user-nickname">
            <span class="cu-tag line-pink user-type">博主</span>
            <span class="text-orange text-bold user-nickname">{{
              props.comment.user.name
            }}</span>
            <span>发布于 {{ props.comment.createTime }} </span>
          </div>
        </div>
      </div>
      <!--评论内容-->
      <div class="comment-content">
        <div class="comment-imgs">
          <div class="c-img-item">
            <img
              @click="toImg"
              src="https://xiamo.oss-accelerate.aliyuncs.com/xiamo/WordPress/2021/02/2a4e06368d34db198416c67074b79bac.png"
            />
          </div>
        </div>
        <div class="content-text text-black">
          <p>
            {{ props.comment.context }}
            <span class="emoji-s emoji-inline"
              ><img
                src="https://cdn.jsdelivr.net/gh/moezx/cdn@2.9.4/img/bili/guilian.png"
            /></span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, onMounted } from 'vue';
const props = defineProps({
  comment: Object
});
onMounted(() => {
  console.log(props.comment);
});
</script>

<style lang="scss" scoped>
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
</style>

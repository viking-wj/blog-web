<template>
  <div class="bar_body">
    <div class="web_logo"></div>
    <div class="navigation">
      <el-menu v-model="current" mode="horizontal">
        <el-menu-item index="mail">
          <template #icon>
            <el-icon><message /></el-icon>
          </template>
          Navigation One
        </el-menu-item>
        <el-menu-item index="app">
          <template #icon>
            <el-icon><app /></el-icon>
          </template>
          Navigation Two
        </el-menu-item>
        <el-sub-menu index="sub1">
          <template #title>
            <el-icon><setting /></el-icon>
            <span>Navigation Three - Submenu</span>
          </template>
          <el-menu-item index="setting:1">Option 1</el-menu-item>
          <el-menu-item index="setting:2">Option 2</el-menu-item>
          <el-menu-item index="setting:3">Option 3</el-menu-item>
          <el-menu-item index="setting:4">Option 4</el-menu-item>
        </el-sub-menu>
        <el-menu-item index="alipay">
          <a href="#" rel="noopener noreferrer"> Navigation Four - Link </a>
        </el-menu-item>
      </el-menu>
    </div>
    <div class="use_info">
      <el-avatar :size="52"></el-avatar>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import { Message, Menu as App, Setting } from '@element-plus/icons-vue'

export default defineComponent({
  components: {
    Message,
    App,
    Setting
  },
  setup() {
    const current = ref('mail')
    return {
      current
    }
  }
})
</script>
<style scoped>
.bar_body {
  width: 100%;
  background: hsla(0, 0%, 100%, 0.9);
  -webkit-box-shadow: 0 0 20px #000;
  box-shadow: 0 0 20px #000;
}
.navigation {
  width: 50%;
  margin: 0 auto;
}
.navigation :deep() .el-menu {
  border-bottom: none;
}
.use_info {
  display: none;
  float: right;
}
</style>

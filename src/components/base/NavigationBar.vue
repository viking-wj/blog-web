<template>
  <div class="bar_body">
    <div class="web_logo"></div>
    <div class="navigation">
      <a-menu v-model:selectedKeys="current" mode="horizontal">
        <a-menu-item key="mail">
          <template #icon>
            <mail-outlined />
          </template>
          Navigation One
        </a-menu-item>
        <a-menu-item key="app">
          <template #icon>
            <appstore-outlined />
          </template>
          Navigation Two
        </a-menu-item>
        <a-sub-menu key="sub1">
          <template #icon>
            <setting-outlined />
          </template>
          <template #title>Navigation Three - Submenu</template>
          <a-menu-item-group title="Item 1">
            <a-menu-item key="setting:1">Option 1</a-menu-item>
            <a-menu-item key="setting:2">Option 2</a-menu-item>
          </a-menu-item-group>
          <a-menu-item-group title="Item 2">
            <a-menu-item key="setting:3">Option 3</a-menu-item>
            <a-menu-item key="setting:4">Option 4</a-menu-item>
          </a-menu-item-group>
        </a-sub-menu>
        <a-menu-item key="alipay">
          <a href="#" rel="noopener noreferrer"> Navigation Four - Link </a>
        </a-menu-item>
      </a-menu>
    </div>
    <div class="use_info">
      <HeadFrame></HeadFrame>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons-vue'
import { Menu } from 'ant-design-vue'
import HeadFrame from '@/components/common/HeadFrame.vue'
export default defineComponent({
  components: {
    MailOutlined,
    AppstoreOutlined,
    SettingOutlined,
    HeadFrame,
    'a-menu': Menu,
    'a-menu-item': Menu.Item,
    'a-sub-menu': Menu.SubMenu
  },
  setup() {
    const current = ref<string[]>(['mail'])
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
.navigation :deep() .ant-menu-horizontal {
  border-bottom: none;
}
.use_info{
  display: none;
  float: right;
}
</style>
<template>
  <a-avatar :size="size">
    <template #icon>
      <UserOutlined />
    </template>
  </a-avatar>
</template>
<script lang="ts">
import { UserOutlined } from '@ant-design/icons-vue'
import { defineComponent, PropType } from 'vue'
import { Avatar } from 'ant-design-vue'
export default defineComponent({
  components: {
    UserOutlined,
    'a-avatar': Avatar
  },
  props: {
    size: {
      type: Number as PropType<number>,
      required: true
    }
  }
})
</script>
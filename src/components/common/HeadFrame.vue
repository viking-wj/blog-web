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
export default defineComponent({
  components: {
    UserOutlined,
  },
  props: {
    size: {
      type: Number as PropType<number>,
      required: true
    }
  }
})
</script>
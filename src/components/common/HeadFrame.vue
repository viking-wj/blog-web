<template>
  <a-avatar :size="52">
    <template #icon>
      <UserOutlined />
    </template>
  </a-avatar>
</template>
<script lang="ts">
import { UserOutlined  } from '@ant-design/icons-vue';
import { defineComponent } from 'vue';
import { Avatar } from 'ant-design-vue';
export default defineComponent({
  components: {
    UserOutlined,
    "a-avatar":Avatar
  },
});
</script>
<template>
  <a-button type="primary">Primary Button</a-button>
  <a-button type="primary" loading>Loading</a-button>
</template>

<script lang="ts">
import { Button } from 'ant-design-vue'

export default {
  components: {
    'a-button': Button
  }
}
</script>

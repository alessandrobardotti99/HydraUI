<script setup lang="ts">
const model = defineModel<string>({ default: 'all' })

const platforms = [
  { label: 'Tutti', value: 'all' },
  { label: 'HTML', value: 'html' },
  { label: 'Vue', value: 'vue' },
  { label: 'React', value: 'react' },
]
</script>

<template>
  <UiTabs v-model="model" :tabs="platforms" />
</template>

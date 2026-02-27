<script setup lang="ts">
const tabsValue = ref('tab1')
</script>

<template>
  <div>
    <UiTabs
      v-model="tabsValue"
      :tabs="[
        { label: 'Generale', value: 'tab1' },
        { label: 'Sicurezza', value: 'tab2' },
        { label: 'Notifiche', value: 'tab3' },
      ]"
    />
  </div>
</template>

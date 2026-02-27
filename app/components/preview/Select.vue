<script setup lang="ts">
const selectValue = ref('')
</script>

<template>
  <div class="w-full max-w-xs">
    <UiSelect
      v-model="selectValue"
      label="Ruolo"
      :options="[
        { label: 'Designer', value: 'designer' },
        { label: 'Developer', value: 'developer' },
        { label: 'Manager', value: 'manager' },
      ]"
    />
  </div>
</template>

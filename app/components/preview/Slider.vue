<script setup lang="ts">
const sliderVal = ref(50)
</script>

<template>
  <div class="w-full max-w-xs flex flex-col gap-2">
    <div class="flex justify-between items-center">
      <span class="text-xs font-medium text-ink-muted uppercase tracking-wide">Volume</span>
      <span class="text-sm font-semibold text-ink">{{ sliderVal }}</span>
    </div>
    <input type="range" min="0" max="100" v-model.number="sliderVal" class="w-full accent-ink" />
  </div>
</template>

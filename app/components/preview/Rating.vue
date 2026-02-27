<script setup lang="ts">
const ratingVal = ref(3)
const ratingHover = ref(0)
</script>

<template>
  <div class="flex flex-col items-center gap-2">
    <div class="flex gap-1">
      <button
        v-for="i in 5"
        :key="i"
        class="cursor-pointer transition-all duration-150 hover:scale-110"
        :class="i <= ratingVal ? 'text-ink' : i <= ratingHover ? 'text-ink/40' : 'text-border'"
        @mouseenter="ratingHover = i"
        @mouseleave="ratingHover = 0"
        @click="ratingVal = i"
      >
        <svg class="size-6" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
      </button>
    </div>
    <span class="text-xs text-ink-muted">{{ ratingVal }} / 5</span>
  </div>
</template>

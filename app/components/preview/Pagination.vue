<script setup lang="ts">
const paginationPage = ref(2)
</script>

<template>
  <div class="flex items-center gap-1">
    <button class="size-9 flex items-center justify-center border border-border-subtle rounded-lg text-ink-muted" :disabled="paginationPage <= 1" @click="paginationPage--">
      <svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg>
    </button>
    <button v-for="p in 5" :key="p" class="size-9 flex items-center justify-center text-sm font-medium border rounded-lg transition-all" :class="p === paginationPage ? 'bg-ink text-white border-ink' : 'border-border-subtle text-ink hover:bg-surface'" @click="paginationPage = p">
      {{ p }}
    </button>
    <button class="size-9 flex items-center justify-center border border-border-subtle rounded-lg text-ink-muted" :disabled="paginationPage >= 5" @click="paginationPage++">
      <svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
    </button>
  </div>
</template>

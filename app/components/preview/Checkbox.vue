<script setup lang="ts">
const checkA = ref(true)
const checkB = ref(false)
</script>

<template>
  <div class="flex flex-col gap-3">
    <label class="flex items-center gap-3 cursor-pointer group">
      <div
        class="size-5 rounded border-2 flex items-center justify-center transition-all"
        :class="checkA ? 'bg-ink border-ink' : 'border-border bg-white'"
        @click="checkA = !checkA"
      >
        <svg v-if="checkA" class="size-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
          <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
        </svg>
      </div>
      <span class="text-sm text-ink">Accetto i termini</span>
    </label>
    <label class="flex items-center gap-3 cursor-pointer group">
      <div
        class="size-5 rounded border-2 flex items-center justify-center transition-all"
        :class="checkB ? 'bg-ink border-ink' : 'border-border bg-white'"
        @click="checkB = !checkB"
      >
        <svg v-if="checkB" class="size-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
          <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
        </svg>
      </div>
      <span class="text-sm text-ink">Ricordami</span>
    </label>
  </div>
</template>

<script setup lang="ts">
const toggleOn = ref(true)
</script>

<template>
  <div class="flex items-center gap-4">
    <button
      type="button"
      class="relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full transition-colors duration-200"
      :class="toggleOn ? 'bg-ink' : 'bg-border'"
      @click="toggleOn = !toggleOn"
    >
      <span
        class="pointer-events-none inline-block size-5 rounded-full bg-white shadow-sm transition-transform duration-200 translate-y-0.5"
        :class="toggleOn ? 'translate-x-5.5' : 'translate-x-0.5'"
      />
    </button>
    <span class="text-sm text-ink">{{ toggleOn ? 'Attivo' : 'Disattivo' }}</span>
  </div>
</template>

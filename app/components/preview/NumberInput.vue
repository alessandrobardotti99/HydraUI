<script setup lang="ts">
const numVal = ref(1)
</script>

<template>
  <div class="flex items-center gap-3">
    <div class="inline-flex items-center border border-border-subtle rounded-xl overflow-hidden">
      <button
        class="w-10 h-10 flex items-center justify-center bg-surface text-ink text-base cursor-pointer transition-colors hover:bg-border-subtle/60 disabled:opacity-30 disabled:cursor-default"
        :disabled="numVal <= 0"
        @click="numVal--"
      >&#8722;</button>
      <input type="text" :value="numVal" readonly class="w-14 h-10 text-center text-sm font-semibold text-ink bg-white border-x border-border-subtle outline-none" />
      <button
        class="w-10 h-10 flex items-center justify-center bg-surface text-ink text-base cursor-pointer transition-colors hover:bg-border-subtle/60 disabled:opacity-30 disabled:cursor-default"
        :disabled="numVal >= 99"
        @click="numVal++"
      >+</button>
    </div>
  </div>
</template>

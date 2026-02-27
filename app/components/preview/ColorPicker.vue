<script setup lang="ts">
const cpColor = ref('#2B3038')
const cpPresets = ['#2B3038', '#dc2626', '#2563eb', '#16a34a', '#9333ea', '#ea580c', '#0d9488', '#db2777']
const cpHex = computed(() => cpColor.value.replace('#', ''))
</script>

<template>
  <div class="w-full max-w-55">
    <div class="bg-white border border-border-subtle rounded-2xl p-4 shadow-sm">
      <div class="w-full h-10 rounded-xl mb-3 transition-colors" :style="{ background: cpColor }" />
      <div class="grid grid-cols-4 gap-2 mb-3">
        <button
          v-for="c in cpPresets"
          :key="c"
          class="aspect-square rounded-xl border-2 cursor-pointer transition-all hover:scale-110"
          :class="c === cpColor ? 'border-ink shadow-[0_0_0_2px_white,0_0_0_4px_#2B3038]' : 'border-transparent'"
          :style="{ background: c }"
          @click="cpColor = c"
        />
      </div>
      <div class="flex items-center border border-border-subtle rounded-lg overflow-hidden">
        <span class="px-2 py-1.5 text-xs text-ink-faint bg-surface">#</span>
        <input
          type="text"
          :value="cpHex"
          maxlength="6"
          class="flex-1 px-2 py-1.5 text-xs font-mono text-ink border-none outline-none bg-white"
          @input="(e: Event) => { const hex = '#' + (e.target as HTMLInputElement).value; if (/^#[0-9a-fA-F]{6}$/.test(hex)) cpColor = hex }"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const comboSearch = ref('')
const comboOpen = ref(false)
const comboValue = ref('')
const comboOptions = ['React', 'Vue', 'Angular', 'Svelte', 'Solid', 'Next.js', 'Nuxt']
const comboFiltered = computed(() => comboOptions.filter(o => o.toLowerCase().includes(comboSearch.value.toLowerCase())))
function comboSelect(opt: string) { comboValue.value = opt; comboSearch.value = opt; comboOpen.value = false }
</script>

<template>
  <div class="w-full max-w-60 relative">
    <span class="text-xs font-medium text-ink-muted uppercase tracking-wide mb-1.5 block">Framework</span>
    <div class="relative">
      <input
        v-model="comboSearch"
        type="text"
        placeholder="Cerca..."
        class="w-full px-3.5 pr-9 py-2.5 text-sm text-ink bg-white border rounded-lg placeholder:text-ink-faint outline-none transition-all"
        :class="comboOpen ? 'border-ink ring-1 ring-ink/10' : 'border-border-subtle'"
        @focus="comboOpen = true"
      />
      <svg class="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-ink-faint pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path d="M19 9l-7 7-7-7"/></svg>
    </div>
    <div v-if="comboOpen" class="absolute z-10 top-full left-0 right-0 mt-1 bg-white border border-border-subtle rounded-lg py-1 shadow-sm max-h-44 overflow-y-auto">
      <button
        v-for="opt in comboFiltered"
        :key="opt"
        class="w-full px-3 py-2 text-sm text-left transition-colors cursor-pointer rounded-md"
        :class="opt === comboValue ? 'text-ink font-semibold bg-surface' : 'text-ink hover:bg-surface'"
        @click="comboSelect(opt)"
      >{{ opt }}</button>
      <div v-if="!comboFiltered.length" class="px-3 py-3 text-xs text-ink-muted text-center">Nessun risultato</div>
    </div>
  </div>
</template>

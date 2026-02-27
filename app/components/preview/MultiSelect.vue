<script setup lang="ts">
const multiVal = ref<string[]>(['vue', 'react'])
const multiOpen = ref(false)
const multiOptions = [
  { label: 'Vue', value: 'vue' },
  { label: 'React', value: 'react' },
  { label: 'Angular', value: 'angular' },
  { label: 'Svelte', value: 'svelte' },
  { label: 'Solid', value: 'solid' },
]
const multiAvailable = computed(() => multiOptions.filter(o => !multiVal.value.includes(o.value)))
function multiAdd(val: string) {
  multiVal.value.push(val)
  multiOpen.value = false
}
function multiRemove(val: string) {
  multiVal.value = multiVal.value.filter(x => x !== val)
}
</script>

<template>
  <div class="w-full max-w-xs relative">
    <span class="text-xs font-medium text-ink-muted uppercase tracking-wide mb-1.5 block">Framework</span>
    <div
      class="flex flex-wrap gap-1.5 p-2 bg-white border rounded-lg min-h-10.5 cursor-pointer transition-all"
      :class="multiOpen ? 'border-ink ring-1 ring-ink/10' : 'border-border-subtle'"
      @click="multiOpen = !multiOpen"
    >
      <span v-for="v in multiVal" :key="v" class="inline-flex items-center gap-1 px-2 py-0.5 text-xs bg-surface border border-border-subtle rounded text-ink">
        {{ multiOptions.find(o => o.value === v)?.label || v }}
        <button class="text-ink-faint hover:text-ink text-sm leading-none cursor-pointer" @click.stop="multiRemove(v)">&times;</button>
      </span>
      <span v-if="!multiVal.length" class="text-sm text-ink-faint py-0.5">Seleziona...</span>
    </div>
    <div v-if="multiOpen && multiAvailable.length" class="absolute z-10 top-full left-0 right-0 mt-1 bg-white border border-border-subtle rounded-lg py-1 shadow-sm">
      <button
        v-for="opt in multiAvailable"
        :key="opt.value"
        class="w-full px-3 py-2 text-sm text-left text-ink hover:bg-surface transition-colors cursor-pointer"
        @click.stop="multiAdd(opt.value)"
      >
        {{ opt.label }}
      </button>
    </div>
    <div v-if="multiOpen && !multiAvailable.length" class="absolute z-10 top-full left-0 right-0 mt-1 bg-white border border-border-subtle rounded-lg py-3 shadow-sm text-center text-xs text-ink-muted">
      Tutte le opzioni selezionate
    </div>
  </div>
</template>

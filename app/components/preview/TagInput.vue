<script setup lang="ts">
const tagValues = ref(['Design', 'UI', 'Componenti'])
const tagText = ref('')
const tagFocused = ref(false)
const tagInput = ref<HTMLInputElement>()

function tagKeydown(e: KeyboardEvent) {
  if (e.key === 'Enter' && tagText.value.trim()) {
    e.preventDefault()
    tagValues.value.push(tagText.value.trim())
    tagText.value = ''
  }
  if (e.key === 'Backspace' && !tagText.value && tagValues.value.length) {
    tagValues.value.pop()
  }
}
</script>

<template>
  <div class="w-full max-w-xs">
    <div
      class="flex flex-wrap gap-1.5 px-3 py-2 min-h-10.5 border rounded-xl bg-white items-center cursor-text transition-all"
      :class="tagFocused ? 'border-ink ring-1 ring-ink/10' : 'border-border-subtle'"
      @click="tagInput?.focus()"
    >
      <span
        v-for="(tag, i) in tagValues"
        :key="i"
        class="inline-flex items-center gap-1 px-2 py-0.5 text-xs bg-surface border border-border-subtle rounded text-ink"
      >
        {{ tag }}
        <button class="text-ink-faint hover:text-ink text-sm leading-none cursor-pointer" @click.stop="tagValues.splice(i, 1)">&times;</button>
      </span>
      <input
        ref="tagInput"
        v-model="tagText"
        type="text"
        placeholder="Aggiungi..."
        class="flex-1 min-w-16 border-none outline-none text-sm bg-transparent text-ink placeholder:text-ink-faint"
        @keydown="tagKeydown"
        @focus="tagFocused = true"
        @blur="tagFocused = false"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const otpValues = ref(['', '', '', '', '', ''])
function otpInput(idx: number, e: Event) {
  const input = e.target as HTMLInputElement
  const val = input.value.replace(/\D/g, '')
  otpValues.value[idx] = val.slice(-1)
  input.value = otpValues.value[idx]
  if (val && idx < 5) {
    const next = input.parentElement?.querySelectorAll('input')[idx + 1]
    next?.focus()
  }
}
function otpKeydown(idx: number, e: KeyboardEvent) {
  const input = e.target as HTMLInputElement
  if (e.key === 'Backspace' && !input.value && idx > 0) {
    const prev = input.parentElement?.querySelectorAll('input')[idx - 1]
    prev?.focus()
  }
}
function otpPaste(e: ClipboardEvent) {
  e.preventDefault()
  const text = e.clipboardData?.getData('text')?.replace(/\D/g, '').slice(0, 6)
  if (!text) return
  for (let i = 0; i < 6; i++) {
    otpValues.value[i] = text[i] || ''
  }
  const inputs = (e.target as HTMLElement).parentElement?.querySelectorAll('input')
  const focusIdx = Math.min(text.length, 5)
  inputs?.[focusIdx]?.focus()
}
</script>

<template>
  <div class="flex gap-2">
    <input
      v-for="(_, i) in 6"
      :key="i"
      maxlength="1"
      inputmode="numeric"
      :value="otpValues[i]"
      class="w-11 h-13 text-center text-xl font-semibold text-ink bg-white border border-border-subtle rounded-lg outline-none focus:border-ink focus:ring-1 focus:ring-ink/10 transition-all"
      @input="otpInput(i, $event)"
      @keydown="otpKeydown(i, $event)"
      @paste="otpPaste($event)"
    />
  </div>
</template>

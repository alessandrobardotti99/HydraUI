<script setup lang="ts">
interface Props {
  modelValue?: string
  placeholder?: string
  type?: string
  disabled?: boolean
  label?: string
}

withDefaults(defineProps<Props>(), {
  modelValue: '',
  placeholder: '',
  type: 'text',
  disabled: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

function onInput(e: Event) {
  emit('update:modelValue', (e.target as HTMLInputElement).value)
}
</script>

<template>
  <div class="flex flex-col gap-1.5">
    <label v-if="label" class="text-xs font-medium text-ink-muted tracking-wide uppercase">
      {{ label }}
    </label>
    <input
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      class="w-full px-3.5 py-2.5 text-sm text-ink bg-surface-raised border border-border-subtle rounded-lg placeholder:text-ink-faint transition-all duration-200 outline-none focus:border-ink focus:ring-1 focus:ring-ink/10 disabled:opacity-50 disabled:cursor-not-allowed"
      @input="onInput"
    />
  </div>
</template>

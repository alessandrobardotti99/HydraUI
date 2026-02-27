<script setup lang="ts">
interface Option {
  label: string
  value: string
}

interface Props {
  modelValue?: string
  options: Option[]
  placeholder?: string
  label?: string
  disabled?: boolean
}

withDefaults(defineProps<Props>(), {
  modelValue: '',
  placeholder: 'Seleziona...',
  disabled: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const open = ref(false)
const selectRef = ref<HTMLElement>()

const selectedLabel = computed(() => {
  const props = getCurrentInstance()?.props as Props
  const found = props.options.find(o => o.value === props.modelValue)
  return found?.label
})

function select(value: string) {
  emit('update:modelValue', value)
  open.value = false
}

function onClickOutside(e: Event) {
  if (selectRef.value && !selectRef.value.contains(e.target as Node)) {
    open.value = false
  }
}

onMounted(() => document.addEventListener('click', onClickOutside))
onUnmounted(() => document.removeEventListener('click', onClickOutside))
</script>

<template>
  <div ref="selectRef" class="relative flex flex-col gap-1.5">
    <label v-if="label" class="text-xs font-medium text-ink-muted tracking-wide uppercase">
      {{ label }}
    </label>
    <button
      type="button"
      :disabled="disabled"
      class="w-full flex items-center justify-between px-3.5 py-2.5 text-sm bg-surface-raised border border-border-subtle rounded-lg transition-all duration-200 outline-none focus:border-ink focus:ring-1 focus:ring-ink/10 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
      @click="open = !open"
    >
      <span :class="selectedLabel ? 'text-ink' : 'text-ink-faint'">
        {{ selectedLabel || placeholder }}
      </span>
      <svg
        class="size-4 text-ink-muted transition-transform duration-200"
        :class="{ 'rotate-180': open }"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
      >
        <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
    </button>

    <Transition
      enter-active-class="transition duration-150 ease-out"
      enter-from-class="opacity-0 -translate-y-1 scale-[0.98]"
      enter-to-class="opacity-100 translate-y-0 scale-100"
      leave-active-class="transition duration-100 ease-in"
      leave-from-class="opacity-100 translate-y-0 scale-100"
      leave-to-class="opacity-0 -translate-y-1 scale-[0.98]"
    >
      <div
        v-if="open"
        class="absolute top-full left-0 right-0 mt-1 bg-surface-raised border border-border-subtle rounded-lg z-50 py-1 overflow-hidden"
      >
        <button
          v-for="option in options"
          :key="option.value"
          type="button"
          class="w-full px-3.5 py-2 text-sm text-left transition-colors duration-100 cursor-pointer"
          :class="option.value === modelValue ? 'text-ink bg-surface-muted font-medium' : 'text-ink-muted hover:text-ink hover:bg-surface'"
          @click="select(option.value)"
        >
          {{ option.label }}
        </button>
      </div>
    </Transition>
  </div>
</template>

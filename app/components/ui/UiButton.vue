<script setup lang="ts">
interface Props {
  variant?: 'primary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  disabled: false,
  loading: false,
})

const classes = computed(() => {
  const base = 'inline-flex items-center justify-center font-medium transition-all duration-200 cursor-pointer select-none whitespace-nowrap'

  const sizes: Record<string, string> = {
    sm: 'text-xs px-3 py-1.5 rounded-md gap-1.5',
    md: 'text-sm px-4 py-2 rounded-lg gap-2',
    lg: 'text-base px-6 py-2.5 rounded-lg gap-2',
  }

  const variants: Record<string, string> = {
    primary: 'bg-ink text-white hover:bg-accent-hover active:scale-[0.98]',
    outline: 'border border-border text-ink hover:bg-surface-muted active:scale-[0.98]',
    ghost: 'text-ink hover:bg-surface-muted active:scale-[0.98]',
  }

  const disabled = props.disabled || props.loading
    ? 'opacity-50 pointer-events-none'
    : ''

  return [base, sizes[props.size], variants[props.variant], disabled].join(' ')
})
</script>

<template>
  <button :class="classes" :disabled="disabled || loading">
    <svg
      v-if="loading"
      class="animate-spin -ml-0.5 size-4"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
    <slot />
  </button>
</template>

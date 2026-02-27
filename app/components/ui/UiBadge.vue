<script setup lang="ts">
interface Props {
  variant?: 'default' | 'outline' | 'muted'
  size?: 'sm' | 'md'
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  size: 'md',
})

const classes = computed(() => {
  const base = 'inline-flex items-center font-medium select-none'

  const sizes: Record<string, string> = {
    sm: 'text-[10px] px-2 py-0.5 rounded',
    md: 'text-xs px-2.5 py-1 rounded-md',
  }

  const variants: Record<string, string> = {
    default: 'bg-ink text-surface',
    outline: 'border border-border text-ink',
    muted: 'bg-surface-muted text-ink-muted',
  }

  return [base, sizes[props.size], variants[props.variant]].join(' ')
})
</script>

<template>
  <span :class="classes">
    <slot />
  </span>
</template>

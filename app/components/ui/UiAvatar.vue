<script setup lang="ts">
interface Props {
  src?: string
  initials?: string
  size?: 'sm' | 'md' | 'lg'
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
})

const sizes: Record<string, string> = {
  sm: 'size-7 text-[10px]',
  md: 'size-9 text-xs',
  lg: 'size-11 text-sm',
}

const imgError = ref(false)
const showImage = computed(() => props.src && !imgError.value)
</script>

<template>
  <div
    class="relative inline-flex items-center justify-center rounded-full bg-surface-muted text-ink-muted font-medium overflow-hidden shrink-0"
    :class="sizes[size]"
  >
    <img
      v-if="showImage"
      :src="src"
      class="absolute inset-0 w-full h-full object-cover"
      @error="imgError = true"
    />
    <span v-else>{{ initials || '?' }}</span>
  </div>
</template>

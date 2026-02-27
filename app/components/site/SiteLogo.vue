<script setup lang="ts">
interface Props {
  size?: 'sm' | 'md'
}

withDefaults(defineProps<Props>(), {
  size: 'md',
})
</script>

<template>
  <NuxtLink to="/" class="flex items-center gap-2 group">
   
    <span
      class="font-bold tracking-tight text-ink flex items-center gap-1 group-hover:text-ink-muted transition-colors justify-center"
      :class="size === 'sm' ? 'text-base' : 'text-lg'"
    >
      Hydra <span class="bg-ink p-1 w-6 text-white rounded-md text-xs flex items-center justify-center">UI</span>
    </span>
  </NuxtLink>
</template>

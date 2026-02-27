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
    <svg
      :class="size === 'sm' ? 'size-5' : 'size-6'"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16 2L4 8v16l12 6 12-6V8L16 2z"
        fill="currentColor"
        class="text-ink"
      />
      <path
        d="M16 6l-8 4v12l8 4 8-4V10l-8-4z"
        fill="currentColor"
        class="text-surface"
      />
      <path
        d="M16 10l-4 2v8l4 2 4-2v-8l-4-2z"
        fill="currentColor"
        class="text-ink"
      />
    </svg>
    <span
      class="font-bold tracking-tight text-ink"
      :class="size === 'sm' ? 'text-base' : 'text-lg'"
    >
      Hydra
    </span>
  </NuxtLink>
</template>

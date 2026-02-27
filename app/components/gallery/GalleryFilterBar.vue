<script setup lang="ts">
interface Props {
  categories: string[]
  activeCategory: string
  platform: string
  searchQuery: string
}

defineProps<Props>()

const emit = defineEmits<{
  'update:activeCategory': [value: string]
  'update:platform': [value: string]
  'update:searchQuery': [value: string]
}>()
</script>

<template>
  <div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
    <div class="flex items-center gap-3 overflow-x-auto pb-1 scrollbar-none">
      <button
        v-for="cat in categories"
        :key="cat"
        type="button"
        class="shrink-0 px-3 py-1.5 text-sm font-medium rounded-lg transition-colors duration-150 cursor-pointer"
        :class="cat === activeCategory
          ? 'bg-ink text-surface'
          : 'text-ink-muted hover:text-ink hover:bg-surface-muted'"
        @click="emit('update:activeCategory', cat)"
      >
        {{ cat }}
      </button>
    </div>

    <div class="flex items-center gap-3">
      <div class="relative">
        <svg class="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-ink-faint" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
        </svg>
        <input
          type="text"
          :value="searchQuery"
          placeholder="Cerca..."
          class="w-44 pl-9 pr-3 py-2 text-sm text-ink bg-surface-raised border border-border-subtle rounded-lg placeholder:text-ink-faint outline-none focus:border-ink focus:ring-1 focus:ring-ink/10 transition-all duration-200"
          @input="emit('update:searchQuery', ($event.target as HTMLInputElement).value)"
        />
      </div>
      <GalleryPlatformSwitch :model-value="platform" @update:model-value="emit('update:platform', $event)" />
    </div>
  </div>
</template>

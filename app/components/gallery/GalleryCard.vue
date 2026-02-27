<script setup lang="ts">
interface Props {
  name: string
  slug?: string
  category: string
  platforms: string[]
  description?: string
}

defineProps<Props>()
</script>

<template>
  <div class="group relative flex flex-col rounded-2xl border border-border-subtle/60 hover:border-border hover:bg-surface/30 transition-all duration-300 overflow-hidden cursor-pointer">
    <!-- Preview -->
    <div class="h-40 flex items-center justify-center bg-surface border-b border-border-subtle/40 overflow-hidden pointer-events-none">
      <div v-if="slug" class="scale-75">
        <GalleryComponentDetailPreview :slug="slug" />
      </div>
      <span v-else class="text-ink-faint text-xs font-mono">&lt;{{ name }} /&gt;</span>
    </div>

    <!-- Info -->
    <div class="p-5">
      <div class="flex items-start justify-between gap-2">
        <div>
          <h3 class="text-sm font-semibold text-ink group-hover:text-ink transition-colors">
            {{ name }}
          </h3>
          <p class="text-xs text-ink-muted mt-0.5">{{ category }}</p>
        </div>
        <svg
          class="size-4 text-ink-faint group-hover:text-ink-muted transition-all duration-200 group-hover:translate-x-0.5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
        </svg>
      </div>

      <p v-if="description" class="text-xs text-ink-muted mt-2 line-clamp-2">
        {{ description }}
      </p>

      <div class="mt-3 flex items-center gap-1">
        <UiBadge
          v-for="p in platforms"
          :key="p"
          variant="muted"
          size="sm"
        >
          {{ p }}
        </UiBadge>
      </div>
    </div>
  </div>
</template>

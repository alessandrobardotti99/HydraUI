<script setup lang="ts">
definePageMeta({
  layout: 'reserved',
  middleware: 'auth',
})

useHead({ title: 'I tuoi componenti — HydraUI' })

const activeTab = ref('saved')

const tabs = [
  { label: 'Salvati', value: 'saved', icon: 'bookmark' },
  { label: 'Recenti', value: 'recent', icon: 'clock' },
  { label: 'Collezioni', value: 'collections', icon: 'folder' },
]

const savedItems = [
  { name: 'Button', category: 'Primitivi', platforms: ['HTML', 'Vue', 'React'] },
  { name: 'Modal', category: 'Overlay', platforms: ['Vue', 'React'] },
  { name: 'Hero Centrato', category: 'Hero', platforms: ['HTML', 'Vue', 'React'] },
]
</script>

<template>
  <div class="max-w-6xl mx-auto px-6 py-10">
    <!-- Header sezione -->
    <div class="flex items-center justify-between mb-8">
      <div>
        <h1 class="text-2xl font-bold tracking-tight text-ink">I tuoi componenti</h1>
        <p class="mt-1 text-sm text-ink-muted">Gestisci i componenti salvati e le tue collezioni.</p>
      </div>
      <UiButton variant="primary" size="sm">
        Nuova collezione
      </UiButton>
    </div>

    <!-- Tabs -->
    <div class="flex items-center gap-1 mb-8 border-b border-border-subtle/60">
      <button
        v-for="tab in tabs"
        :key="tab.value"
        type="button"
        class="px-4 py-2.5 text-sm font-medium transition-colors duration-150 cursor-pointer relative"
        :class="tab.value === activeTab
          ? 'text-ink'
          : 'text-ink-muted hover:text-ink'"
        @click="activeTab = tab.value"
      >
        {{ tab.label }}
        <div
          v-if="tab.value === activeTab"
          class="absolute bottom-0 left-2 right-2 h-0.5 bg-ink rounded-full"
        />
      </button>
    </div>

    <!-- Saved -->
    <div v-if="activeTab === 'saved'">
      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <GalleryCard
          v-for="item in savedItems"
          :key="item.name"
          :name="item.name"
          :category="item.category"
          :platforms="item.platforms"
        />
      </div>
    </div>

    <!-- Recent -->
    <div v-else-if="activeTab === 'recent'" class="flex flex-col items-center justify-center py-24">
      <div class="size-14 flex items-center justify-center rounded-full bg-surface mb-4">
        <svg class="size-6 text-ink-faint" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <p class="text-sm font-medium text-ink mb-1">Nessuna attività recente</p>
      <p class="text-xs text-ink-muted">I componenti che visualizzi appariranno qui.</p>
    </div>

    <!-- Collections -->
    <div v-else class="flex flex-col items-center justify-center py-24">
      <div class="size-14 flex items-center justify-center rounded-full bg-surface mb-4">
        <svg class="size-6 text-ink-faint" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
        </svg>
      </div>
      <p class="text-sm font-medium text-ink mb-1">Nessuna collezione</p>
      <p class="text-xs text-ink-muted mb-5">Organizza i tuoi componenti preferiti in collezioni.</p>
      <UiButton variant="outline" size="sm">
        Crea la prima collezione
      </UiButton>
    </div>
  </div>
</template>

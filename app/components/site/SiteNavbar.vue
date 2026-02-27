<script setup lang="ts">
const route = useRoute()
const mobileOpen = ref(false)

const links = [
  { label: 'Componenti', to: '/components' },
  { label: 'Blocchi', to: '/blocks' },
  { label: 'Template', to: '/templates' },
]
</script>

<template>
  <header class="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-border-subtle/60">
    <div class="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
      <SiteLogo />

      <nav class="hidden md:flex items-center gap-1">
        <NuxtLink
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          class="px-3 py-1.5 text-sm font-medium rounded-md transition-colors duration-150"
          :class="route.path === link.to
            ? 'text-ink bg-surface-muted'
            : 'text-ink-muted hover:text-ink'"
        >
          {{ link.label }}
        </NuxtLink>
      </nav>

      <div class="flex items-center gap-3">
        <NuxtLink
          to="/login"
          class="hidden md:inline-flex items-center gap-2 px-4 py-1.5 text-sm font-medium text-white bg-ink rounded-lg hover:bg-accent-hover transition-all duration-200"
        >
          Accedi
        </NuxtLink>

        <button
          type="button"
          class="md:hidden p-1.5 text-ink-muted hover:text-ink transition-colors cursor-pointer"
          @click="mobileOpen = true"
        >
          <svg class="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5" />
          </svg>
        </button>
      </div>
    </div>

    <SiteMobileMenu :open="mobileOpen" @close="mobileOpen = false" />
  </header>
</template>

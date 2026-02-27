<script setup lang="ts">
const route = useRoute()
const { user, logout } = useAuth()

const links = [
  { label: 'Salvati', to: '/reserved' },
  { label: 'Collezioni', to: '/reserved/collections' },
  { label: 'Impostazioni', to: '/reserved/settings' },
]

const initials = computed(() => {
  if (!user.value) return 'U'
  return user.value.name.charAt(0).toUpperCase()
})
</script>

<template>
  <header class="sticky top-0 z-40 bg-white border-b border-border-subtle/60">
    <div class="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
      <div class="flex items-center gap-8">
        <NuxtLink to="/" class="flex items-center gap-2 text-ink-muted hover:text-ink transition-colors">
          <svg class="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          <span class="text-sm font-medium">Torna al sito</span>
        </NuxtLink>

        <div class="hidden md:block h-5 w-px bg-border-subtle" />

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
      </div>

      <div class="flex items-center gap-3">
        <button
          type="button"
          class="text-xs font-medium text-ink-muted hover:text-ink transition-colors cursor-pointer"
          @click="logout"
        >
          Esci
        </button>
        <UiAvatar :initials="initials" size="sm" />
      </div>
    </div>
  </header>
</template>

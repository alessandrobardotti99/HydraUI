<script setup lang="ts">
useHead({ title: 'Componenti — HydraUI' })

const { all: components, categories } = useComponents()

const searchQuery = ref('')
const activeCategory = ref('Tutti')
const activePlatforms = ref<string[]>([])

const allPlatforms = ['HTML', 'Vue', 'React']

function togglePlatform(p: string) {
  const idx = activePlatforms.value.indexOf(p)
  if (idx >= 0) activePlatforms.value.splice(idx, 1)
  else activePlatforms.value.push(p)
}

const filtered = computed(() => {
  return components.filter((c) => {
    const matchCategory = activeCategory.value === 'Tutti' || c.category === activeCategory.value
    const matchSearch = !searchQuery.value || c.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchPlatform = activePlatforms.value.length === 0 || activePlatforms.value.every(p => c.platforms.includes(p as any))
    return matchCategory && matchSearch && matchPlatform
  })
})
</script>

<template>
  <div class="max-w-7xl mx-auto px-6 py-12">
    <!-- Header -->
    <div class="mb-10">
      <h1 class="text-3xl font-bold tracking-tight text-ink">Componenti</h1>
      <p class="mt-2 text-sm text-ink-muted max-w-lg">
        Tutti i componenti della libreria. Copia il codice in HTML, Vue o React.
      </p>
    </div>

    <div class="flex gap-8">
      <!-- Sidebar filtri -->
      <aside class="w-56 shrink-0">
        <div class="sticky top-24 flex flex-col gap-6">
          <!-- Ricerca -->
          <div>
            <div class="relative">
              <svg class="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-ink-faint" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Cerca..."
                class="w-full pl-9 pr-4 py-2 text-sm rounded-lg border border-border-subtle bg-white text-ink placeholder:text-ink-faint focus:outline-none focus:ring-2 focus:ring-ink/10 focus:border-border transition-all"
              />
            </div>
          </div>

          <!-- Filtro piattaforma -->
          <div>
            <h3 class="text-[11px] font-semibold text-ink-muted uppercase tracking-wider mb-3">Piattaforma</h3>
            <div class="flex flex-col gap-1.5">
              <button
                v-for="p in allPlatforms"
                :key="p"
                class="flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-sm transition-all cursor-pointer"
                :class="activePlatforms.includes(p)
                  ? 'bg-ink text-white font-medium'
                  : 'text-ink-muted hover:bg-surface hover:text-ink'"
                @click="togglePlatform(p)"
              >
                <div
                  class="size-4 rounded border flex items-center justify-center transition-all shrink-0"
                  :class="activePlatforms.includes(p)
                    ? 'bg-white/20 border-white/30'
                    : 'border-border-subtle'"
                >
                  <svg
                    v-if="activePlatforms.includes(p)"
                    class="size-2.5 text-white"
                    fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </div>
                {{ p }}
              </button>
            </div>
          </div>

          <!-- Filtro categoria -->
          <div>
            <h3 class="text-[11px] font-semibold text-ink-muted uppercase tracking-wider mb-3">Categoria</h3>
            <div class="flex flex-col gap-0.5">
              <button
                class="flex items-center justify-between px-2.5 py-1.5 rounded-lg text-sm transition-all cursor-pointer"
                :class="activeCategory === 'Tutti'
                  ? 'bg-surface text-ink font-medium'
                  : 'text-ink-muted hover:bg-surface/50 hover:text-ink'"
                @click="activeCategory = 'Tutti'"
              >
                <span>Tutti</span>
                <span class="text-xs text-ink-faint">{{ components.length }}</span>
              </button>
              <button
                v-for="cat in categories"
                :key="cat"
                class="flex items-center justify-between px-2.5 py-1.5 rounded-lg text-sm transition-all cursor-pointer"
                :class="activeCategory === cat
                  ? 'bg-surface text-ink font-medium'
                  : 'text-ink-muted hover:bg-surface/50 hover:text-ink'"
                @click="activeCategory = cat"
              >
                <span>{{ cat }}</span>
                <span class="text-xs text-ink-faint">{{ components.filter(c => c.category === cat).length }}</span>
              </button>
            </div>
          </div>
        </div>
      </aside>

      <!-- Contenuto -->
      <div class="flex-1 min-w-0">
        <!-- Risultati count -->
        <div class="flex items-center justify-between mb-5">
          <p class="text-xs text-ink-muted">
            {{ filtered.length }} component{{ filtered.length !== 1 ? 'i' : 'e' }}
          </p>
          <div v-if="searchQuery || activePlatforms.length || activeCategory !== 'Tutti'" class="flex items-center gap-2">
            <button
              class="text-xs text-ink-muted hover:text-ink transition-colors cursor-pointer"
              @click="searchQuery = ''; activePlatforms = []; activeCategory = 'Tutti'"
            >
              Rimuovi filtri
            </button>
          </div>
        </div>

        <!-- Grid -->
        <div v-if="filtered.length" class="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
          <NuxtLink
            v-for="comp in filtered"
            :key="comp.slug"
            :to="`/components/${comp.slug}`"
            class="block"
          >
            <GalleryCard
              :name="comp.name"
              :slug="comp.slug"
              :category="comp.category"
              :platforms="comp.platforms"
              :description="comp.description"
            />
          </NuxtLink>
        </div>

        <!-- Empty -->
        <div v-else class="flex flex-col items-center justify-center py-24">
          <div class="size-14 flex items-center justify-center rounded-full bg-surface mb-4">
            <svg class="size-6 text-ink-faint" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
          </div>
          <p class="text-sm font-medium text-ink mb-1">Nessun risultato</p>
          <p class="text-xs text-ink-muted">Prova a cercare con un altro termine.</p>
        </div>
      </div>
    </div>
  </div>
</template>

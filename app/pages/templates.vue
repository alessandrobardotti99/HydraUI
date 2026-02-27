<script setup lang="ts">
useHead({ title: 'Template — HydraUI' })

const searchQuery = ref('')
const activeCategory = ref('Tutti')
const activePlatforms = ref<string[]>([])

const allPlatforms = ['HTML', 'Vue', 'React']

const categories = ['Landing', 'Dashboard', 'E-commerce', 'Blog', 'Portfolio', 'SaaS']

const templates = [
  { name: 'Startup Landing', category: 'Landing', platforms: ['HTML', 'Vue', 'React'], description: 'Landing page per startup con hero, sezione feature e pricing.', pages: 5 },
  { name: 'SaaS Dashboard', category: 'Dashboard', platforms: ['Vue', 'React'], description: 'Dashboard con sidebar, grafici interattivi e tabelle dati.', pages: 8 },
  { name: 'E-commerce Store', category: 'E-commerce', platforms: ['Vue', 'React'], description: 'Storefront completo con catalogo, carrello e checkout.', pages: 12 },
  { name: 'Blog Minimal', category: 'Blog', platforms: ['HTML', 'Vue', 'React'], description: 'Blog editoriale con layout pulito e tipografia curata.', pages: 4 },
  { name: 'Portfolio Creativo', category: 'Portfolio', platforms: ['HTML', 'Vue', 'React'], description: 'Portfolio con griglia progetti, case study e pagina contatti.', pages: 6 },
  { name: 'SaaS Marketing', category: 'SaaS', platforms: ['HTML', 'Vue', 'React'], description: 'Sito marketing con pricing, testimonianze e FAQ.', pages: 7 },
  { name: 'Sito Agenzia', category: 'Landing', platforms: ['HTML', 'Vue', 'React'], description: 'Sito agenzia con servizi, team, portfolio e contatti.', pages: 6 },
  { name: 'Pannello Admin', category: 'Dashboard', platforms: ['Vue', 'React'], description: 'Pannello admin con gestione utenti, ruoli e analytics.', pages: 10 },
  { name: 'Catalogo Prodotti', category: 'E-commerce', platforms: ['Vue', 'React'], description: 'Catalogo prodotti con filtri avanzati e vista dettaglio.', pages: 5 },
]

function togglePlatform(p: string) {
  const idx = activePlatforms.value.indexOf(p)
  if (idx >= 0) activePlatforms.value.splice(idx, 1)
  else activePlatforms.value.push(p)
}

const filtered = computed(() => {
  return templates.filter((t) => {
    const matchCategory = activeCategory.value === 'Tutti' || t.category === activeCategory.value
    const matchSearch = !searchQuery.value || t.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchPlatform = activePlatforms.value.length === 0 || activePlatforms.value.every(p => t.platforms.includes(p as any))
    return matchCategory && matchSearch && matchPlatform
  })
})
</script>

<template>
  <div class="max-w-7xl mx-auto px-6 py-12">
    <!-- Header -->
    <div class="mb-10">
      <h1 class="text-3xl font-bold tracking-tight text-ink">Template</h1>
      <p class="mt-2 text-sm text-ink-muted max-w-lg">
        Pagine complete pronte per il tuo prossimo progetto. Copia il codice in HTML, Vue o React.
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
                <span class="text-xs text-ink-faint">{{ templates.length }}</span>
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
                <span class="text-xs text-ink-faint">{{ templates.filter(t => t.category === cat).length }}</span>
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
            {{ filtered.length }} template
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

        <!-- Grid template -->
        <div v-if="filtered.length" class="grid md:grid-cols-2 gap-4">
          <div
            v-for="t in filtered"
            :key="t.name"
            class="group flex flex-col rounded-2xl border border-border-subtle/60 hover:border-border hover:bg-surface/30 transition-all duration-300 overflow-hidden cursor-pointer"
          >
            <!-- Preview grande -->
            <div class="h-48 flex items-center justify-center bg-surface border-b border-border-subtle/40 relative">
              <!-- Wireframe decorativo -->
              <div class="w-4/5 h-4/5 rounded-lg border border-ink/5 flex flex-col overflow-hidden">
                <div class="h-6 bg-ink/3 border-b border-ink/5 flex items-center px-3 gap-1.5">
                  <div class="size-1.5 rounded-full bg-ink/10" />
                  <div class="size-1.5 rounded-full bg-ink/10" />
                  <div class="size-1.5 rounded-full bg-ink/10" />
                </div>
                <div class="flex-1 p-3 flex flex-col gap-2">
                  <div class="h-2 w-1/3 rounded bg-ink/5" />
                  <div class="h-1.5 w-2/3 rounded bg-ink/3" />
                  <div class="flex-1 mt-1 rounded bg-ink/2" />
                </div>
              </div>
            </div>

            <!-- Info -->
            <div class="p-5">
              <div class="flex items-center gap-2 mb-3">
                <UiBadge variant="muted" size="sm">{{ t.category }}</UiBadge>
                <span class="text-[10px] text-ink-faint font-medium">{{ t.pages }} pagine</span>
              </div>
              <h3 class="text-base font-semibold text-ink mb-1">{{ t.name }}</h3>
              <p class="text-sm text-ink-muted leading-relaxed mb-4">{{ t.description }}</p>

              <div class="flex items-center justify-between pt-3 border-t border-border-subtle/40">
                <div class="flex items-center gap-1">
                  <UiBadge
                    v-for="p in t.platforms"
                    :key="p"
                    variant="outline"
                    size="sm"
                  >
                    {{ p }}
                  </UiBadge>
                </div>
                <span class="text-sm font-medium text-ink-muted group-hover:text-ink transition-colors flex items-center gap-1.5">
                  Anteprima
                  <svg class="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </span>
              </div>
            </div>
          </div>
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

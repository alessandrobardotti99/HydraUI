<script setup lang="ts">
useHead({ title: 'Blocchi — HydraUI' })

const searchQuery = ref('')
const activeCategory = ref('Tutti')
const activePlatforms = ref<string[]>([])

const allPlatforms = ['HTML', 'Vue', 'React']

const categories = ['Hero', 'CTA', 'Feature', 'Pricing', 'Testimonial', 'FAQ', 'Footer', 'Header']

const blocks = [
  { name: 'Hero Centrato', category: 'Hero', platforms: ['HTML', 'Vue', 'React'], description: 'Sezione hero con titolo centrato, sottotitolo e chiamata all\'azione prominente.' },
  { name: 'Hero Diviso', category: 'Hero', platforms: ['HTML', 'Vue', 'React'], description: 'Hero con testo a sinistra e immagine o illustrazione a destra.' },
  { name: 'Banner CTA', category: 'CTA', platforms: ['HTML', 'Vue', 'React'], description: 'Banner call-to-action a larghezza piena con sfondo scuro e bottone evidenziato.' },
  { name: 'CTA Inline', category: 'CTA', platforms: ['HTML', 'Vue', 'React'], description: 'Sezione CTA compatta inline con campo email e bottone di iscrizione.' },
  { name: 'Griglia Feature', category: 'Feature', platforms: ['HTML', 'Vue', 'React'], description: 'Griglia a 3 colonne con icone, titoli e descrizioni per le funzionalità.' },
  { name: 'Feature Alternata', category: 'Feature', platforms: ['HTML', 'Vue', 'React'], description: 'Sezioni feature con layout alternato sinistra/destra e immagini.' },
  { name: 'Card Pricing', category: 'Pricing', platforms: ['HTML', 'Vue', 'React'], description: 'Card pricing affiancate con piano evidenziato e toggle mensile/annuale.' },
  { name: 'Tabella Pricing', category: 'Pricing', platforms: ['Vue', 'React'], description: 'Tabella comparativa dettagliata dei piani con tutte le funzionalità.' },
  { name: 'Carousel Testimonianze', category: 'Testimonial', platforms: ['Vue', 'React'], description: 'Carousel con avatar, citazione e nome del cliente, navigazione con frecce.' },
  { name: 'Griglia Testimonianze', category: 'Testimonial', platforms: ['HTML', 'Vue', 'React'], description: 'Griglia masonry di testimonianze con avatar e stelle di rating.' },
  { name: 'FAQ Accordion', category: 'FAQ', platforms: ['HTML', 'Vue', 'React'], description: 'Sezione domande frequenti con accordion espandibile e animazione fluida.' },
  { name: 'Footer Multi-colonna', category: 'Footer', platforms: ['HTML', 'Vue', 'React'], description: 'Footer organizzato in colonne con link, social e copyright.' },
  { name: 'Header Navbar', category: 'Header', platforms: ['HTML', 'Vue', 'React'], description: 'Navbar responsive con logo, link di navigazione e menu mobile.' },
  { name: 'Header Mega Menu', category: 'Header', platforms: ['Vue', 'React'], description: 'Header con mega menu espandibile e categorie organizzate.' },
]

function togglePlatform(p: string) {
  const idx = activePlatforms.value.indexOf(p)
  if (idx >= 0) activePlatforms.value.splice(idx, 1)
  else activePlatforms.value.push(p)
}

const filtered = computed(() => {
  return blocks.filter((b) => {
    const matchCategory = activeCategory.value === 'Tutti' || b.category === activeCategory.value
    const matchSearch = !searchQuery.value || b.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchPlatform = activePlatforms.value.length === 0 || activePlatforms.value.every(p => b.platforms.includes(p as any))
    return matchCategory && matchSearch && matchPlatform
  })
})
</script>

<template>
  <div class="max-w-7xl mx-auto px-6 py-12">
    <!-- Header -->
    <div class="mb-10">
      <h1 class="text-3xl font-bold tracking-tight text-ink">Blocchi</h1>
      <p class="mt-2 text-sm text-ink-muted max-w-lg">
        Sezioni di pagina pronte da comporre tra loro. Copia il codice in HTML, Vue o React.
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
                <span class="text-xs text-ink-faint">{{ blocks.length }}</span>
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
                <span class="text-xs text-ink-faint">{{ blocks.filter(b => b.category === cat).length }}</span>
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
            {{ filtered.length }} blocc{{ filtered.length !== 1 ? 'hi' : 'o' }}
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

        <!-- Lista blocchi -->
        <div v-if="filtered.length" class="flex flex-col gap-4">
          <div
            v-for="b in filtered"
            :key="b.name"
            class="group flex flex-col md:flex-row rounded-2xl border border-border-subtle/60 hover:border-border hover:bg-surface/30 transition-all duration-300 overflow-hidden cursor-pointer"
          >
            <!-- Preview wide -->
            <div class="md:w-72 lg:w-80 shrink-0 h-40 md:h-auto flex items-center justify-center bg-surface border-b md:border-b-0 md:border-r border-border-subtle/40">
              <div class="flex flex-col items-center gap-2">
                <svg class="size-8 text-ink-faint/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
                </svg>
                <span class="text-ink-faint text-xs font-mono">&lt;{{ b.name }} /&gt;</span>
              </div>
            </div>

            <!-- Info -->
            <div class="flex-1 p-6 flex flex-col justify-center">
              <div class="flex items-center gap-2 mb-2">
                <UiBadge variant="muted" size="sm">{{ b.category }}</UiBadge>
              </div>
              <h3 class="text-lg font-semibold text-ink mb-1">{{ b.name }}</h3>
              <p class="text-sm text-ink-muted leading-relaxed mb-4">{{ b.description }}</p>
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-1">
                  <UiBadge
                    v-for="p in b.platforms"
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

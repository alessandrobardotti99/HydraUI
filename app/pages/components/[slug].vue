<script setup lang="ts">
import { colorPresets, surfacePresets, type ShadowLevel } from '~/composables/useThemeCustomizer'

definePageMeta({ layout: 'blank' })

const route = useRoute()
const { getBySlug } = useComponents()

const slug = route.params.slug as string
const component = getBySlug(slug)

if (!component) {
  throw createError({ statusCode: 404, statusMessage: 'Componente non trovato' })
}

useHead({ title: `${component.name} — HydraUI` })

const platformTabs = computed(() => {
  if (!component) return []
  return component.platforms.map(p => ({
    label: p,
    value: p.toLowerCase(),
  }))
})

const activePlatform = ref(platformTabs.value[0]?.value ?? 'html')

const currentCode = computed(() => {
  if (!component) return ''
  return component.code[activePlatform.value as keyof typeof component.code] ?? ''
})

const copied = ref(false)

async function copyCode() {
  await navigator.clipboard.writeText(currentCode.value)
  copied.value = true
  setTimeout(() => { copied.value = false }, 2000)
}

const fileName = computed(() => {
  const map: Record<string, string> = {
    html: 'index.html',
    vue: `${component?.name ?? 'Component'}.vue`,
    react: `${component?.name ?? 'Component'}.tsx`,
  }
  return map[activePlatform.value] ?? 'index.html'
})

const {
  isOpen: customizerOpen,
  primaryColor,
  surfaceColor,
  borderRadius,
  fontSize,
  shadow,
  borderWidth,
  isCustomized,
  isDarkSurface,
  cssOverrides,
  savedPresets,
  reset: resetCustomizer,
  savePreset,
  loadPreset,
  deletePreset,
} = useThemeCustomizer()

const shadowLevels: { label: string; value: ShadowLevel }[] = [
  { label: 'Nessuna', value: 'none' },
  { label: 'Sottile', value: 'subtle' },
  { label: 'Default', value: 'default' },
  { label: 'Media', value: 'medium' },
  { label: 'Forte', value: 'strong' },
]

// Save preset flow
const showSaveInput = ref(false)
const presetName = ref('')

function handleSavePreset() {
  if (!presetName.value.trim()) return
  savePreset(presetName.value.trim())
  presetName.value = ''
  showSaveInput.value = false
}
</script>

<template>
  <div v-if="component" class="min-h-[calc(100vh)]">
    <div class="flex flex-col lg:flex-row min-h-[calc(100vh)]">
      <!-- Left: Info + Code -->
      <div class="flex-1 lg:overflow-y-auto lg:h-[calc(100vh)]">
        <div class="max-w-2xl px-6 lg:px-10 py-10">
          <!-- Breadcrumb -->
          <div class="flex items-center gap-2 text-sm mb-8">
            <NuxtLink to="/components" class="text-ink-muted hover:text-ink transition-colors">
              Componenti
            </NuxtLink>
            <svg class="size-3.5 text-ink-faint" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
            <span class="text-ink font-medium">{{ component.name }}</span>
          </div>

          <!-- Header -->
          <h1 class="text-2xl font-bold tracking-tight text-ink mb-2">{{ component.name }}</h1>
          <p class="text-sm text-ink-muted leading-relaxed mb-6">{{ component.description }}</p>

          <!-- Badges -->
          <div class="flex items-center gap-2 mb-10">
            <UiBadge variant="muted" size="sm">{{ component.category }}</UiBadge>
            <UiBadge v-for="p in component.platforms" :key="p" variant="outline" size="sm">
              {{ p }}
            </UiBadge>
          </div>

          <!-- Codice -->
          <h2 class="text-xs font-medium text-ink-muted uppercase tracking-wider mb-4">Codice</h2>

          <!-- Platform tabs -->
          <div class="flex items-center gap-0.5 mb-4 border-b border-border-subtle/60">
            <button
              v-for="tab in platformTabs"
              :key="tab.value"
              type="button"
              class="relative px-4 py-2.5 text-sm font-medium transition-colors cursor-pointer"
              :class="activePlatform === tab.value
                ? 'text-ink'
                : 'text-ink-muted hover:text-ink'"
              @click="activePlatform = tab.value"
            >
              {{ tab.label }}
              <div
                v-if="activePlatform === tab.value"
                class="absolute bottom-0 left-2 right-2 h-0.5 bg-ink rounded-full"
              />
            </button>
          </div>

          <!-- Code block -->
          <div class="rounded-xl border border-border-subtle bg-surface overflow-hidden mb-10">
            <div class="flex items-center justify-between px-4 py-2.5 border-b border-border-subtle/60">
              <span class="text-[11px] font-mono text-ink-muted">{{ fileName }}</span>
              <button
                type="button"
                class="inline-flex items-center gap-1.5 text-[11px] font-medium text-ink-muted hover:text-ink transition-colors cursor-pointer"
                @click="copyCode"
              >
                <svg v-if="!copied" class="size-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9.75a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
                </svg>
                {{ copied ? 'Copiato!' : 'Copia' }}
              </button>
            </div>
            <pre class="p-5 text-[13px] text-ink/80 font-mono overflow-x-auto leading-relaxed max-h-125"><code>{{ currentCode }}</code></pre>
          </div>

          <!-- Props table -->
          <div v-if="component.props.length" class="mb-10">
            <h2 class="text-xs font-medium text-ink-muted uppercase tracking-wider mb-4">Props</h2>
            <div class="rounded-xl border border-border-subtle/60 overflow-hidden">
              <table class="w-full text-sm">
                <thead>
                  <tr class="bg-surface text-left">
                    <th class="px-4 py-3 font-medium text-ink-muted text-xs">Nome</th>
                    <th class="px-4 py-3 font-medium text-ink-muted text-xs">Tipo</th>
                    <th class="px-4 py-3 font-medium text-ink-muted text-xs">Default</th>
                    <th class="px-4 py-3 font-medium text-ink-muted text-xs hidden md:table-cell">Descrizione</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="prop in component.props"
                    :key="prop.name"
                    class="border-t border-border-subtle/40"
                  >
                    <td class="px-4 py-3 font-mono text-xs text-ink">{{ prop.name }}</td>
                    <td class="px-4 py-3 font-mono text-xs text-ink-muted">{{ prop.type }}</td>
                    <td class="px-4 py-3 font-mono text-xs text-ink-muted">{{ prop.default }}</td>
                    <td class="px-4 py-3 text-xs text-ink-muted hidden md:table-cell">{{ prop.description }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <!-- Right: Live Preview + Customizer -->
      <div class="w-full lg:w-[60%] shrink-0 bg-surface lg:sticky lg:top-0 lg:h-screen border-t lg:border-t-0 lg:border-l border-border-subtle/60">
        <div class="flex flex-col h-full">
          <!-- Header -->
          <div class="flex items-center justify-between px-5 py-3 border-b border-border-subtle/60">
            <span class="text-[11px] font-mono text-ink-muted uppercase tracking-wider">Anteprima</span>
            <button
              type="button"
              class="inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-medium rounded-md transition-all cursor-pointer"
              :class="customizerOpen
                ? 'bg-ink text-white'
                : 'text-ink-muted hover:text-ink hover:bg-surface-muted'"
              @click="customizerOpen = !customizerOpen"
            >
              <svg class="size-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
              </svg>
              Personalizza
            </button>
          </div>

          <!-- Preview area with CSS var overrides -->
          <div class="preview-wrapper flex-1 flex items-center justify-center p-10 overflow-auto" :style="cssOverrides">
            <GalleryComponentDetailPreview :slug="component.slug" />
          </div>

          <!-- Customizer Panel -->
          <Transition name="slide-up-panel">
            <div v-if="customizerOpen" class="border-t border-border-subtle/60 bg-white px-5 py-5 overflow-y-auto max-h-[45vh]">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">

                <!-- Colore primario -->
                <div>
                  <div class="flex items-center justify-between mb-2.5">
                    <span class="text-[11px] font-medium text-ink-muted uppercase tracking-wider">Colore primario</span>
                    <span class="text-[11px] font-mono text-ink-faint">{{ primaryColor }}</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <div class="grid grid-cols-8 gap-1.5 flex-1">
                      <button
                        v-for="preset in colorPresets"
                        :key="preset.value"
                        type="button"
                        class="aspect-square rounded-lg border-2 cursor-pointer transition-all hover:scale-110"
                        :class="preset.value === primaryColor
                          ? 'border-border shadow-[0_0_0_2px_white,0_0_0_3.5px_currentColor]'
                          : 'border-transparent'"
                        :style="{ backgroundColor: preset.value, color: preset.value }"
                        :title="preset.label"
                        @click="primaryColor = preset.value"
                      />
                    </div>
                    <label class="relative size-8 shrink-0 cursor-pointer">
                      <div class="size-8 rounded-lg border-2 border-dashed border-border-subtle flex items-center justify-center">
                        <svg class="size-3.5 text-ink-faint" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M15 11l-3 3m0 0l-3-3m3 3V8m0 13a9 9 0 110-18 9 9 0 010 18z" />
                        </svg>
                      </div>
                      <input
                        type="color"
                        :value="primaryColor"
                        class="absolute inset-0 opacity-0 cursor-pointer"
                        @input="(e: Event) => primaryColor = (e.target as HTMLInputElement).value"
                      />
                    </label>
                  </div>
                </div>

                <!-- Colore superficie -->
                <div>
                  <div class="flex items-center justify-between mb-2.5">
                    <span class="text-[11px] font-medium text-ink-muted uppercase tracking-wider">Superficie</span>
                    <span class="text-[11px] font-mono text-ink-faint">{{ surfaceColor }}</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <div class="grid grid-cols-6 gap-1.5 flex-1">
                      <button
                        v-for="preset in surfacePresets"
                        :key="preset.value"
                        type="button"
                        class="aspect-square rounded-lg border-2 cursor-pointer transition-all hover:scale-110"
                        :class="preset.value === surfaceColor
                          ? 'border-border shadow-[0_0_0_2px_white,0_0_0_3.5px_currentColor]'
                          : 'border-border-subtle/60'"
                        :style="{ backgroundColor: preset.value, color: preset.value }"
                        :title="preset.label"
                        @click="surfaceColor = preset.value"
                      />
                    </div>
                    <label class="relative size-8 shrink-0 cursor-pointer">
                      <div class="size-8 rounded-lg border-2 border-dashed border-border-subtle flex items-center justify-center">
                        <svg class="size-3.5 text-ink-faint" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M15 11l-3 3m0 0l-3-3m3 3V8m0 13a9 9 0 110-18 9 9 0 010 18z" />
                        </svg>
                      </div>
                      <input
                        type="color"
                        :value="surfaceColor"
                        class="absolute inset-0 opacity-0 cursor-pointer"
                        @input="(e: Event) => surfaceColor = (e.target as HTMLInputElement).value"
                      />
                    </label>
                  </div>
                </div>

                <!-- Raggio bordi -->
                <div>
                  <div class="flex items-center justify-between mb-2.5">
                    <span class="text-[11px] font-medium text-ink-muted uppercase tracking-wider">Raggio bordi</span>
                    <span class="text-[11px] font-mono text-ink-faint">{{ borderRadius }}px</span>
                  </div>
                  <div class="flex items-center gap-3">
                    <div class="size-5 border-2 border-border-subtle shrink-0" style="border-radius: 0px" />
                    <input
                      v-model.number="borderRadius"
                      type="range"
                      min="0"
                      max="24"
                      step="1"
                      class="flex-1 accent-ink"
                    />
                    <div class="size-5 border-2 border-border-subtle shrink-0" style="border-radius: 12px" />
                  </div>
                </div>

                <!-- Dimensione font -->
                <div>
                  <div class="flex items-center justify-between mb-2.5">
                    <span class="text-[11px] font-medium text-ink-muted uppercase tracking-wider">Dimensione testo</span>
                    <span class="text-[11px] font-mono text-ink-faint">{{ Math.round(fontSize * 100) }}%</span>
                  </div>
                  <div class="flex items-center gap-3">
                    <span class="text-[9px] text-ink-faint font-medium shrink-0">A</span>
                    <input
                      v-model.number="fontSize"
                      type="range"
                      min="0.75"
                      max="1.25"
                      step="0.05"
                      class="flex-1 accent-ink"
                    />
                    <span class="text-sm text-ink-faint font-medium shrink-0">A</span>
                  </div>
                </div>

                <!-- Ombre -->
                <div>
                  <div class="flex items-center justify-between mb-2.5">
                    <span class="text-[11px] font-medium text-ink-muted uppercase tracking-wider">Ombre</span>
                  </div>
                  <div class="flex items-center gap-1">
                    <button
                      v-for="level in shadowLevels"
                      :key="level.value"
                      type="button"
                      class="flex-1 text-[10px] font-medium py-1.5 rounded-md cursor-pointer transition-all"
                      :class="shadow === level.value
                        ? 'bg-ink text-white'
                        : 'text-ink-muted hover:text-ink hover:bg-surface'"
                      @click="shadow = level.value"
                    >
                      {{ level.label }}
                    </button>
                  </div>
                </div>

                <!-- Spessore bordi -->
                <div>
                  <div class="flex items-center justify-between mb-2.5">
                    <span class="text-[11px] font-medium text-ink-muted uppercase tracking-wider">Spessore bordi</span>
                    <span class="text-[11px] font-mono text-ink-faint">{{ borderWidth }}px</span>
                  </div>
                  <div class="flex items-center gap-3">
                    <div class="w-5 h-3 border-border-subtle shrink-0" style="border-top: 1px solid currentColor" />
                    <input
                      v-model.number="borderWidth"
                      type="range"
                      min="0"
                      max="3"
                      step="0.5"
                      class="flex-1 accent-ink"
                    />
                    <div class="w-5 h-3 border-border-subtle shrink-0" style="border-top: 3px solid currentColor" />
                  </div>
                </div>

              </div>

              <!-- Preset salvati + Reset -->
              <div class="mt-5 pt-4 border-t border-border-subtle/40">
                <!-- Saved presets -->
                <div v-if="savedPresets.length" class="mb-4">
                  <span class="text-[11px] font-medium text-ink-muted uppercase tracking-wider block mb-2">I tuoi preset</span>
                  <div class="flex flex-wrap gap-1.5">
                    <div
                      v-for="preset in savedPresets"
                      :key="preset.id"
                      class="group inline-flex items-center gap-1.5 pl-1 pr-1 py-0.5 rounded-md border border-border-subtle/60 hover:border-border transition-colors"
                    >
                      <button
                        type="button"
                        class="inline-flex items-center gap-1.5 text-[11px] font-medium text-ink-muted hover:text-ink cursor-pointer"
                        @click="loadPreset(preset)"
                      >
                        <div
                          class="size-3.5 rounded-sm shrink-0"
                          :style="{ backgroundColor: preset.primaryColor }"
                        />
                        {{ preset.name }}
                      </button>
                      <button
                        type="button"
                        class="text-ink-faint hover:text-red-500 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
                        @click="deletePreset(preset.id)"
                      >
                        <svg class="size-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>

                <div class="flex items-center gap-3">
                  <!-- Save preset -->
                  <div v-if="isCustomized" class="flex items-center gap-2">
                    <template v-if="showSaveInput">
                      <input
                        v-model="presetName"
                        type="text"
                        placeholder="Nome preset..."
                        class="text-[11px] px-2.5 py-1.5 rounded-md border border-border-subtle bg-white focus:outline-none focus:border-ink/30 w-36"
                        @keyup.enter="handleSavePreset"
                      />
                      <button
                        type="button"
                        class="text-[11px] font-medium text-white bg-ink px-2.5 py-1.5 rounded-md cursor-pointer hover:bg-accent-hover transition-colors"
                        @click="handleSavePreset"
                      >
                        Salva
                      </button>
                      <button
                        type="button"
                        class="text-[11px] text-ink-faint hover:text-ink cursor-pointer"
                        @click="showSaveInput = false; presetName = ''"
                      >
                        Annulla
                      </button>
                    </template>
                    <button
                      v-else
                      type="button"
                      class="inline-flex items-center gap-1.5 text-[11px] font-medium text-ink-muted hover:text-ink transition-colors cursor-pointer"
                      @click="showSaveInput = true"
                    >
                      <svg class="size-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
                      </svg>
                      Salva preset
                    </button>
                  </div>

                  <!-- Reset -->
                  <button
                    v-if="isCustomized"
                    type="button"
                    class="inline-flex items-center gap-1.5 text-[11px] font-medium text-ink-muted hover:text-ink transition-colors cursor-pointer"
                    @click="resetCustomizer"
                  >
                    <svg class="size-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
                    </svg>
                    Reset
                  </button>
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.slide-up-panel-enter-active,
.slide-up-panel-leave-active {
  transition: all 0.25s ease;
}
.slide-up-panel-enter-from,
.slide-up-panel-leave-to {
  opacity: 0;
  transform: translateY(12px);
}

.preview-wrapper :deep([class*="border-border"]) {
  border-width: var(--border-width, 1px);
}
</style>

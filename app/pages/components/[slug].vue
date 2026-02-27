<script setup lang="ts">
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

      <!-- Right: Live Preview -->
      <div class="w-full lg:w-[60%] shrink-0 bg-surface lg:sticky lg:top-0 lg:h-screen border-t lg:border-t-0 lg:border-l border-border-subtle/60">
        <div class="flex flex-col h-full">
          <div class="flex items-center justify-between px-5 py-3 border-b border-border-subtle/60">
            <span class="text-[11px] font-mono text-ink-muted uppercase tracking-wider">Anteprima</span>
          </div>
          <div class="flex-1 flex items-center justify-center p-10">
            <GalleryComponentDetailPreview :slug="component.slug" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

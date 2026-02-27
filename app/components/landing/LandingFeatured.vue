<template>
  <section class="border-t border-border-subtle/60">
    <div class="max-w-7xl mx-auto px-6 py-24 md:py-32">
      <div class="flex items-end justify-between mb-12">
        <div>
          <p class="font-mono text-[11px] tracking-[0.25em] uppercase text-ink-muted mb-4">
            In evidenza
          </p>
          <h2 class="text-3xl md:text-4xl font-bold tracking-tight text-ink">
            I più richiesti
          </h2>
        </div>
        <NuxtLink
          to="/components"
          class="hidden md:inline-flex items-center gap-1.5 text-sm font-medium text-ink-muted hover:text-ink transition-colors"
        >
          Vedi tutti
          <svg class="size-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </NuxtLink>
      </div>

      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <!-- Button -->
        <NuxtLink to="/components" class="group rounded-2xl border border-border-subtle/60 hover:border-border overflow-hidden transition-all">
          <div class="h-40 bg-surface flex items-center justify-center">
            <div class="flex items-center gap-2">
              <span class="px-3.5 py-1.5 bg-ink text-white text-xs font-medium rounded-lg">Primary</span>
              <span class="px-3.5 py-1.5 border border-border text-ink text-xs font-medium rounded-lg">Outline</span>
              <span class="px-3.5 py-1.5 text-ink-muted text-xs font-medium">Ghost</span>
            </div>
          </div>
          <div class="p-5">
            <h3 class="text-sm font-semibold text-ink">Button</h3>
            <p class="text-xs text-ink-muted mt-1">3 varianti · 3 dimensioni</p>
            <div class="flex gap-2 mt-3">
              <span class="text-[10px] font-mono text-ink-faint">HTML</span>
              <span class="text-[10px] font-mono text-ink-faint">VUE</span>
              <span class="text-[10px] font-mono text-ink-faint">REACT</span>
            </div>
          </div>
        </NuxtLink>

        <!-- Input -->
        <NuxtLink to="/components" class="group rounded-2xl border border-border-subtle/60 hover:border-border overflow-hidden transition-all">
          <div class="h-40 bg-surface flex items-center justify-center">
            <div class="w-48">
              <div class="text-[10px] font-medium text-ink-muted mb-1.5">Email</div>
              <div class="h-9 rounded-lg border border-border-subtle bg-white flex items-center px-3">
                <span class="text-xs text-ink-faint">nome@email.com</span>
              </div>
            </div>
          </div>
          <div class="p-5">
            <h3 class="text-sm font-semibold text-ink">Input</h3>
            <p class="text-xs text-ink-muted mt-1">Label · Validazione · Icone</p>
            <div class="flex gap-2 mt-3">
              <span class="text-[10px] font-mono text-ink-faint">HTML</span>
              <span class="text-[10px] font-mono text-ink-faint">VUE</span>
              <span class="text-[10px] font-mono text-ink-faint">REACT</span>
            </div>
          </div>
        </NuxtLink>

        <!-- Select -->
        <NuxtLink to="/components" class="group rounded-2xl border border-border-subtle/60 hover:border-border overflow-hidden transition-all">
          <div class="h-40 bg-surface flex items-center justify-center">
            <div class="w-48">
              <div class="text-[10px] font-medium text-ink-muted mb-1.5">Paese</div>
              <div class="h-9 rounded-lg border border-border-subtle bg-white flex items-center justify-between px-3">
                <span class="text-xs text-ink">Italia</span>
                <svg class="size-3.5 text-ink-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
              </div>
            </div>
          </div>
          <div class="p-5">
            <h3 class="text-sm font-semibold text-ink">Select</h3>
            <p class="text-xs text-ink-muted mt-1">Dropdown · Ricerca · Multi</p>
            <div class="flex gap-2 mt-3">
              <span class="text-[10px] font-mono text-ink-faint">HTML</span>
              <span class="text-[10px] font-mono text-ink-faint">VUE</span>
              <span class="text-[10px] font-mono text-ink-faint">REACT</span>
            </div>
          </div>
        </NuxtLink>

        <!-- Tabs -->
        <NuxtLink to="/components" class="group rounded-2xl border border-border-subtle/60 hover:border-border overflow-hidden transition-all">
          <div class="h-40 bg-surface flex items-center justify-center">
            <div class="flex items-center gap-0.5 p-1 bg-surface-muted rounded-lg">
              <div class="px-3 py-1.5 bg-white rounded-md text-xs font-medium text-ink">Account</div>
              <div class="px-3 py-1.5 text-xs font-medium text-ink-muted">Sicurezza</div>
              <div class="px-3 py-1.5 text-xs font-medium text-ink-muted">Notifiche</div>
            </div>
          </div>
          <div class="p-5">
            <h3 class="text-sm font-semibold text-ink">Tabs</h3>
            <p class="text-xs text-ink-muted mt-1">Indicatore animato · Accessibile</p>
            <div class="flex gap-2 mt-3">
              <span class="text-[10px] font-mono text-ink-faint">HTML</span>
              <span class="text-[10px] font-mono text-ink-faint">VUE</span>
              <span class="text-[10px] font-mono text-ink-faint">REACT</span>
            </div>
          </div>
        </NuxtLink>

        <!-- Modal -->
        <NuxtLink to="/components" class="group rounded-2xl border border-border-subtle/60 hover:border-border overflow-hidden transition-all">
          <div class="h-40 bg-surface flex items-center justify-center">
            <div class="w-52 bg-white rounded-xl border border-border-subtle overflow-hidden">
              <div class="px-4 py-2.5 border-b border-border-subtle/60">
                <div class="text-[10px] font-semibold text-ink">Conferma azione</div>
              </div>
              <div class="px-4 py-3">
                <div class="h-1.5 w-full rounded bg-ink/5 mb-1.5" />
                <div class="h-1.5 w-2/3 rounded bg-ink/5" />
              </div>
              <div class="px-4 py-2 border-t border-border-subtle/60 flex justify-end gap-1.5">
                <span class="px-2 py-0.5 text-[9px] font-medium text-ink-muted border border-border-subtle rounded">Annulla</span>
                <span class="px-2 py-0.5 text-[9px] font-medium bg-ink text-white rounded">Conferma</span>
              </div>
            </div>
          </div>
          <div class="p-5">
            <h3 class="text-sm font-semibold text-ink">Modal</h3>
            <p class="text-xs text-ink-muted mt-1">Focus trap · Animazioni · Accessibile</p>
            <div class="flex gap-2 mt-3">
              <span class="text-[10px] font-mono text-ink-faint">HTML</span>
              <span class="text-[10px] font-mono text-ink-faint">VUE</span>
              <span class="text-[10px] font-mono text-ink-faint">REACT</span>
            </div>
          </div>
        </NuxtLink>

        <!-- Data Table -->
        <NuxtLink to="/components" class="group rounded-2xl border border-border-subtle/60 hover:border-border overflow-hidden transition-all">
          <div class="h-40 bg-surface flex items-center justify-center">
            <div class="w-56 bg-white rounded-lg border border-border-subtle overflow-hidden text-[9px]">
              <!-- Header -->
              <div class="grid grid-cols-3 border-b border-border-subtle/60 bg-surface-muted/50">
                <div class="px-2.5 py-1.5 font-semibold text-ink-muted">Nome</div>
                <div class="px-2.5 py-1.5 font-semibold text-ink-muted">Ruolo</div>
                <div class="px-2.5 py-1.5 font-semibold text-ink-muted">Stato</div>
              </div>
              <!-- Rows -->
              <div class="grid grid-cols-3 border-b border-border-subtle/30">
                <div class="px-2.5 py-1.5 text-ink">Marco R.</div>
                <div class="px-2.5 py-1.5 text-ink-muted">Admin</div>
                <div class="px-2.5 py-1.5">
                  <span class="px-1.5 py-0.5 text-[8px] bg-emerald-50 text-emerald-600 rounded-full font-medium">Attivo</span>
                </div>
              </div>
              <div class="grid grid-cols-3 border-b border-border-subtle/30">
                <div class="px-2.5 py-1.5 text-ink">Sara L.</div>
                <div class="px-2.5 py-1.5 text-ink-muted">Editor</div>
                <div class="px-2.5 py-1.5">
                  <span class="px-1.5 py-0.5 text-[8px] bg-emerald-50 text-emerald-600 rounded-full font-medium">Attivo</span>
                </div>
              </div>
              <div class="grid grid-cols-3">
                <div class="px-2.5 py-1.5 text-ink">Luca B.</div>
                <div class="px-2.5 py-1.5 text-ink-muted">Viewer</div>
                <div class="px-2.5 py-1.5">
                  <span class="px-1.5 py-0.5 text-[8px] bg-amber-50 text-amber-600 rounded-full font-medium">Invitato</span>
                </div>
              </div>
            </div>
          </div>
          <div class="p-5">
            <h3 class="text-sm font-semibold text-ink">Data Table</h3>
            <p class="text-xs text-ink-muted mt-1">Sorting · Paginazione · Selezione</p>
            <div class="flex gap-2 mt-3">
              <span class="text-[10px] font-mono text-ink-faint">VUE</span>
              <span class="text-[10px] font-mono text-ink-faint">REACT</span>
            </div>
          </div>
        </NuxtLink>
      </div>

      <div class="mt-8 text-center md:hidden">
        <NuxtLink
          to="/components"
          class="inline-flex items-center gap-1.5 text-sm font-medium text-ink-muted hover:text-ink transition-colors"
        >
          Vedi tutti i componenti
          <svg class="size-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

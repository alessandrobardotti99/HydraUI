<template>
  <section class="bg-surface">
    <div class="max-w-7xl mx-auto px-6 py-24 md:py-32">
      <div class="max-w-2xl mx-auto text-center">
        <h2 class="text-3xl md:text-4xl font-bold tracking-tight text-ink">
          Pronto per iniziare?
        </h2>
        <p class="mt-4 text-base text-ink-muted max-w-md mx-auto leading-relaxed">
          Esplora la libreria completa e trova i componenti
          perfetti per il tuo prossimo progetto.
        </p>
        <div class="mt-8 flex flex-wrap items-center justify-center gap-3">
          <NuxtLink
            to="/components"
            class="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium bg-ink text-white rounded-lg hover:bg-accent-hover transition-colors"
          >
            Sfoglia la libreria
            <svg class="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </NuxtLink>
          <NuxtLink
            to="/templates"
            class="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-ink border border-border rounded-lg hover:bg-white transition-colors"
          >
            Vedi i template
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>

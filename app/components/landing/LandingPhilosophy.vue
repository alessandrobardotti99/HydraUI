<template>
  <section class="border-t border-border-subtle/60">
    <div class="max-w-7xl mx-auto px-6 py-24 md:py-32">
      <div class="mb-12">
        <p class="font-mono text-[11px] tracking-[0.25em] uppercase text-ink-muted mb-4">
          Come funziona
        </p>
        <h2 class="text-3xl md:text-4xl font-bold tracking-tight text-ink">
          Tre passi. Zero friction.
        </h2>
      </div>

      <!-- 3 steps -->
      <div class="grid md:grid-cols-3 gap-px bg-border-subtle/60 rounded-2xl overflow-hidden border border-border-subtle/60">
        <div class="bg-surface p-8 md:p-10">
          <div class="flex items-center gap-3 mb-6">
            <span class="flex items-center justify-center size-8 rounded-full bg-ink text-white text-xs font-bold">1</span>
            <span class="text-xs font-medium uppercase tracking-widest text-ink-muted">Scegli</span>
          </div>
          <h3 class="text-lg font-semibold text-ink mb-2">Trova il componente</h3>
          <p class="text-sm text-ink-muted leading-relaxed">
            Sfoglia la libreria per categoria, piattaforma o cerca per nome. Ogni componente ha un'anteprima live.
          </p>
        </div>

        <div class="bg-surface p-8 md:p-10">
          <div class="flex items-center gap-3 mb-6">
            <span class="flex items-center justify-center size-8 rounded-full bg-ink text-white text-xs font-bold">2</span>
            <span class="text-xs font-medium uppercase tracking-widest text-ink-muted">Copia</span>
          </div>
          <h3 class="text-lg font-semibold text-ink mb-2">Prendi il codice</h3>
          <p class="text-sm text-ink-muted leading-relaxed">
            Un click per copiare. Scegli la versione HTML, Vue o React. Il codice è pronto, tipizzato e testato.
          </p>
        </div>

        <div class="bg-surface p-8 md:p-10">
          <div class="flex items-center gap-3 mb-6">
            <span class="flex items-center justify-center size-8 rounded-full bg-ink text-white text-xs font-bold">3</span>
            <span class="text-xs font-medium uppercase tracking-widest text-ink-muted">Spedisci</span>
          </div>
          <h3 class="text-lg font-semibold text-ink mb-2">Vai in produzione</h3>
          <p class="text-sm text-ink-muted leading-relaxed">
            Personalizza i colori con le tue variabili Tailwind. Nessuna dipendenza esterna, nessun lock-in.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

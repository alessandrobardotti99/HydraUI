<template>
  <div class="w-full max-w-xs flex flex-col items-center text-center py-6">
    <div class="size-16 rounded-2xl bg-surface flex items-center justify-center mb-4">
      <svg class="size-8 text-ink-faint" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
      </svg>
    </div>
    <h3 class="text-sm font-semibold text-ink mb-1">Nessun elemento</h3>
    <p class="text-xs text-ink-muted leading-relaxed mb-4">Non hai ancora creato nessun progetto. Inizia creandone uno nuovo.</p>
    <button class="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium bg-ink text-white rounded-lg cursor-pointer hover:bg-accent-hover transition-colors">
      <svg class="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15"/></svg>
      Crea progetto
    </button>
  </div>
</template>

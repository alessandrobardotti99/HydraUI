<template>
  <div class="w-full max-w-sm">
    <div class="bg-white rounded-2xl border border-border-subtle overflow-hidden shadow-sm">
      <div class="px-6 py-5">
        <h3 class="text-base font-semibold text-ink mb-1">Conferma eliminazione</h3>
        <p class="text-sm text-ink-muted">Sei sicuro di voler eliminare questo elemento? L'azione è irreversibile.</p>
      </div>
      <div class="flex items-center justify-end gap-2 px-6 py-4 bg-surface/50 border-t border-border-subtle/60">
        <UiButton variant="outline" size="sm">Annulla</UiButton>
        <UiButton variant="primary" size="sm">Elimina</UiButton>
      </div>
    </div>
  </div>
</template>

<template>
  <div class="flex flex-col gap-3 w-full max-w-xs">
    <div class="flex items-start gap-3 px-4 py-3 bg-white border border-border-subtle rounded-xl shadow-sm">
      <div class="size-5 shrink-0 rounded-full bg-green-100 flex items-center justify-center mt-0.5">
        <svg class="size-3 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
          <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
        </svg>
      </div>
      <div>
        <p class="text-sm font-medium text-ink">Salvato con successo</p>
        <p class="text-xs text-ink-muted mt-0.5">Le modifiche sono state applicate.</p>
      </div>
    </div>
    <div class="flex items-start gap-3 px-4 py-3 bg-white border border-red-200 rounded-xl shadow-sm">
      <div class="size-5 shrink-0 rounded-full bg-red-100 flex items-center justify-center mt-0.5">
        <svg class="size-3 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </div>
      <div>
        <p class="text-sm font-medium text-ink">Errore</p>
        <p class="text-xs text-ink-muted mt-0.5">Qualcosa è andato storto.</p>
      </div>
    </div>
  </div>
</template>

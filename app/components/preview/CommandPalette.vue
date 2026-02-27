<template>
  <div class="w-full max-w-sm">
    <div class="bg-white border border-border-subtle rounded-2xl overflow-hidden shadow-sm">
      <div class="flex items-center gap-2.5 px-4 py-3 border-b border-border-subtle">
        <svg class="size-4.5 text-ink-faint shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"/></svg>
        <span class="text-sm text-ink-faint">Cerca un comando...</span>
      </div>
      <div class="p-2 max-h-52 overflow-y-auto">
        <div class="px-2 pt-2 pb-1 text-[11px] font-semibold text-ink-faint uppercase tracking-wider">Azioni</div>
        <button class="w-full flex items-center justify-between px-3 py-2.5 text-sm text-ink hover:bg-surface rounded-lg transition-colors cursor-pointer">
          <span>Nuovo progetto</span>
          <kbd class="text-[11px] text-ink-faint bg-surface border border-border-subtle px-1.5 py-0.5 rounded font-mono">&#8984;N</kbd>
        </button>
        <button class="w-full flex items-center justify-between px-3 py-2.5 text-sm text-ink bg-surface rounded-lg cursor-pointer">
          <span>Apri file</span>
          <kbd class="text-[11px] text-ink-faint bg-white border border-border-subtle px-1.5 py-0.5 rounded font-mono">&#8984;O</kbd>
        </button>
        <button class="w-full flex items-center justify-between px-3 py-2.5 text-sm text-ink hover:bg-surface rounded-lg transition-colors cursor-pointer">
          <span>Salva</span>
          <kbd class="text-[11px] text-ink-faint bg-surface border border-border-subtle px-1.5 py-0.5 rounded font-mono">&#8984;S</kbd>
        </button>
        <div class="px-2 pt-3 pb-1 text-[11px] font-semibold text-ink-faint uppercase tracking-wider">Navigazione</div>
        <button class="w-full flex items-center justify-between px-3 py-2.5 text-sm text-ink hover:bg-surface rounded-lg transition-colors cursor-pointer">
          <span>Vai ai componenti</span>
          <kbd class="text-[11px] text-ink-faint bg-surface border border-border-subtle px-1.5 py-0.5 rounded font-mono">G C</kbd>
        </button>
      </div>
    </div>
  </div>
</template>

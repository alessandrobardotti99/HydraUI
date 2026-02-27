<template>
  <div class="relative">
    <UiButton variant="outline" size="sm">
      Azioni
      <svg class="size-4 text-ink-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
    </UiButton>
    <div class="absolute top-full left-0 mt-1.5 w-44 bg-white border border-border-subtle rounded-lg py-1 shadow-sm">
      <button class="w-full px-3.5 py-2 text-sm text-left text-ink hover:bg-surface transition-colors cursor-pointer">Modifica</button>
      <button class="w-full px-3.5 py-2 text-sm text-left text-ink hover:bg-surface transition-colors cursor-pointer">Duplica</button>
      <div class="h-px bg-border-subtle/60 my-1" />
      <button class="w-full px-3.5 py-2 text-sm text-left text-red-600 hover:bg-red-50 transition-colors cursor-pointer">Elimina</button>
    </div>
  </div>
</template>

<template>
  <footer class="border-t border-border-subtle/60 bg-white">
    <div class="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
      <span class="text-xs text-ink-faint">Hydra &mdash; Area Riservata</span>
      <div class="flex items-center gap-4">
        <NuxtLink to="/" class="text-xs text-ink-faint hover:text-ink-muted transition-colors">
          Sito pubblico
        </NuxtLink>
        <span class="text-xs text-ink-faint">
          &copy; {{ new Date().getFullYear() }}
        </span>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const accordionOpen = ref(0)
</script>

<template>
  <div class="w-full max-w-sm">
    <div class="border border-border-subtle rounded-xl overflow-hidden divide-y divide-border-subtle/60">
      <div v-for="(item, i) in [
        { q: 'Come funziona?', a: 'È semplicissimo: copia il codice e incollalo nel tuo progetto.' },
        { q: 'È gratuito?', a: 'Sì, tutti i componenti base sono gratuiti.' },
        { q: 'Supporta TypeScript?', a: 'Certo, tutti i componenti Vue e React sono tipizzati.' },
      ]" :key="i">
        <button
          type="button"
          class="w-full flex items-center justify-between px-4 py-3.5 text-sm font-medium text-ink text-left cursor-pointer hover:bg-surface/50 transition-colors"
          @click="accordionOpen = accordionOpen === i ? -1 : i"
        >
          {{ item.q }}
          <svg
            class="size-4 text-ink-muted transition-transform duration-200"
            :class="{ 'rotate-180': accordionOpen === i }"
            fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        <div v-if="accordionOpen === i" class="px-4 pb-4 text-sm text-ink-muted">
          {{ item.a }}
        </div>
      </div>
    </div>
  </div>
</template>

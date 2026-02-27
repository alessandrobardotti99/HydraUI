<script setup lang="ts">
const popoverOpen = ref(false)
</script>

<template>
  <div class="flex flex-col items-center gap-2 relative">
    <Transition name="fade">
      <div v-if="popoverOpen" class="relative mb-2">
        <div class="px-4 py-3 bg-white border border-border-subtle rounded-xl shadow-sm w-56">
          <p class="text-sm font-semibold text-ink mb-1">Informazioni</p>
          <p class="text-xs text-ink-muted leading-relaxed">Questo è un popover con contenuto personalizzabile.</p>
        </div>
        <div class="absolute -bottom-1.5 left-1/2 -translate-x-1/2 size-3 bg-white border-r border-b border-border-subtle rotate-45" />
      </div>
    </Transition>
    <UiButton variant="outline" size="sm" @click="popoverOpen = !popoverOpen">
      {{ popoverOpen ? 'Chiudi' : 'Mostra info' }}
    </UiButton>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(4px);
}
</style>

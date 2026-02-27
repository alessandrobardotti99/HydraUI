<script setup lang="ts">
const drawerOpen = ref(true)
</script>

<template>
  <div class="w-full max-w-sm">
    <UiButton v-if="!drawerOpen" variant="outline" size="sm" @click="drawerOpen = true">Apri drawer</UiButton>
    <div class="relative bg-surface/50 rounded-xl overflow-hidden h-48 border border-border-subtle mt-2">
      <div class="flex items-center justify-center h-full text-xs text-ink-faint">
        Contenuto pagina
      </div>
      <Transition name="drawer">
        <div v-if="drawerOpen" class="absolute right-0 top-0 bottom-0 w-48 bg-white border-l border-border-subtle shadow-sm flex flex-col">
          <div class="flex items-center justify-between px-4 py-3 border-b border-border-subtle">
            <span class="text-sm font-semibold text-ink">Dettagli</span>
            <button class="text-ink-muted hover:text-ink text-xs cursor-pointer" @click="drawerOpen = false">&#10005;</button>
          </div>
          <div class="px-4 py-3 text-xs text-ink-muted leading-relaxed">Contenuto del drawer laterale.</div>
        </div>
      </Transition>
    </div>
  </div>
</template>

<style scoped>
.drawer-enter-active,
.drawer-leave-active {
  transition: transform 0.25s ease;
}
.drawer-enter-from,
.drawer-leave-to {
  transform: translateX(100%);
}
</style>

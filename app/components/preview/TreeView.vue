<script setup lang="ts">
const treeOpen = ref<Record<string, boolean>>({ src: true, components: true })
</script>

<template>
  <div class="w-full max-w-xs text-sm">
    <div class="flex flex-col">
      <div>
        <button class="flex items-center gap-1 py-1 cursor-pointer text-ink hover:text-ink" @click="treeOpen.src = !treeOpen.src">
          <svg class="size-3.5 text-ink-faint transition-transform" :class="treeOpen.src ? 'rotate-90' : ''" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
          <span>📁 src</span>
        </button>
        <div v-if="treeOpen.src" class="pl-5">
          <button class="flex items-center gap-1 py-1 cursor-pointer text-ink hover:text-ink" @click="treeOpen.components = !treeOpen.components">
            <svg class="size-3.5 text-ink-faint transition-transform" :class="treeOpen.components ? 'rotate-90' : ''" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
            <span>📁 components</span>
          </button>
          <div v-if="treeOpen.components" class="pl-5">
            <div class="py-1 pl-5 text-ink-muted">📄 Button.vue</div>
            <div class="py-1 pl-5 text-ink-muted">📄 Input.vue</div>
            <div class="py-1 pl-5 text-ink-muted">📄 Select.vue</div>
          </div>
          <div class="py-1 pl-5 text-ink-muted">📄 App.vue</div>
          <div class="py-1 pl-5 text-ink-muted">📄 main.ts</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  open: boolean
}

defineProps<Props>()

const emit = defineEmits<{
  close: []
}>()

const links = [
  { label: 'Componenti', to: '/components' },
  { label: 'Blocchi', to: '/blocks' },
  { label: 'Template', to: '/templates' },
  { label: 'Area Riservata', to: '/reserved' },
]

const route = useRoute()

watch(() => route.path, () => {
  emit('close')
})
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="open"
        class="fixed inset-0 z-50 bg-ink/20 backdrop-blur-sm"
        @click="emit('close')"
      />
    </Transition>

    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="translate-x-full"
      enter-to-class="translate-x-0"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="translate-x-0"
      leave-to-class="translate-x-full"
    >
      <div
        v-if="open"
        class="fixed top-0 right-0 bottom-0 z-50 w-72 bg-surface border-l border-border-subtle flex flex-col"
      >
        <div class="flex items-center justify-between px-6 h-16">
          <SiteLogo size="sm" />
          <button
            type="button"
            class="p-1.5 text-ink-muted hover:text-ink transition-colors cursor-pointer"
            @click="emit('close')"
          >
            <svg class="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <nav class="flex flex-col px-4 py-2 gap-0.5">
          <NuxtLink
            v-for="link in links"
            :key="link.to"
            :to="link.to"
            class="px-3 py-2.5 text-sm font-medium rounded-lg transition-colors duration-150"
            :class="route.path === link.to
              ? 'text-ink bg-surface-muted'
              : 'text-ink-muted hover:text-ink hover:bg-surface-muted/50'"
          >
            {{ link.label }}
          </NuxtLink>
        </nav>
      </div>
    </Transition>
  </Teleport>
</template>

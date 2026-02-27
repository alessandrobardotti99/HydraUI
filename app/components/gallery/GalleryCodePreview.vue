<script setup lang="ts">
interface Props {
  code: string
  language?: string
}

const props = withDefaults(defineProps<Props>(), {
  language: 'html',
})

const copied = ref(false)

async function copy() {
  await navigator.clipboard.writeText(props.code)
  copied.value = true
  setTimeout(() => { copied.value = false }, 2000)
}
</script>

<template>
  <div class="relative rounded-xl border border-border-subtle bg-ink overflow-hidden">
    <div class="flex items-center justify-between px-4 py-2.5 border-b border-white/5">
      <span class="text-[11px] font-mono text-white/40 uppercase tracking-wider">{{ language }}</span>
      <button
        type="button"
        class="text-[11px] font-medium text-white/40 hover:text-white/70 transition-colors cursor-pointer"
        @click="copy"
      >
        {{ copied ? 'Copiato!' : 'Copia' }}
      </button>
    </div>
    <pre class="p-4 text-sm text-white/80 font-mono overflow-x-auto leading-relaxed"><code>{{ code }}</code></pre>
  </div>
</template>

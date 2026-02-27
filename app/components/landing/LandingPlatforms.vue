<script setup lang="ts">
const active = ref('vue')

const platforms: Record<string, { label: string; code: string; file: string }> = {
  html: {
    label: 'HTML',
    file: 'Button.html',
    code: `<button class="px-4 py-2 bg-ink
  text-white rounded-lg
  hover:bg-ink/90 transition">
  Conferma
</button>`,
  },
  vue: {
    label: 'Vue',
    file: 'Button.vue',
    code: `<script setup lang="ts">
defineProps<{
  variant?: 'primary' | 'outline'
}>()
<\/script>

<template>
  <button :class="classes">
    <slot />
  </button>
</template>`,
  },
  react: {
    label: 'React',
    file: 'Button.tsx',
    code: `interface ButtonProps {
  variant?: 'primary' | 'outline'
  children: React.ReactNode
}

export function Button({
  variant = 'primary',
  children
}: ButtonProps) {
  return (
    <button className={classes}>
      {children}
    </button>
  )
}`,
  },
}
</script>

<template>
  <section class="border-t border-border-subtle/60">
    <div class="max-w-7xl mx-auto px-6 py-24 md:py-32">
      <div class="grid lg:grid-cols-2 gap-16 items-center">
        <!-- Left -->
        <div>
          <p class="font-mono text-[11px] tracking-[0.25em] uppercase text-ink-muted mb-4">
            Tre piattaforme
          </p>
          <h2 class="text-3xl md:text-4xl font-bold tracking-tight text-ink leading-tight">
            Un componente,<br />
            <span class="text-ink-faint">tre linguaggi.</span>
          </h2>
          <p class="mt-4 text-base text-ink-muted leading-relaxed max-w-md">
            Ogni componente esiste in versione HTML, Vue e React.
            Stesso design, stessa qualità. Scegli la piattaforma del tuo progetto.
          </p>

          <!-- Platform selector -->
          <div class="mt-8 flex items-center gap-2">
            <button
              v-for="(platform, key) in platforms"
              :key="key"
              type="button"
              class="px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 cursor-pointer"
              :class="active === key
                ? 'bg-ink text-white'
                : 'text-ink-muted hover:text-ink border border-transparent hover:border-border-subtle'"
              @click="active = key as string"
            >
              {{ platform.label }}
            </button>
          </div>
        </div>

        <!-- Right: code (light theme) -->
        <div class="rounded-2xl bg-surface overflow-hidden border border-border-subtle/60">
          <div class="flex items-center justify-between px-4 py-3 border-b border-border-subtle/60">
            <div class="flex items-center gap-1.5">
              <div class="size-2.5 rounded-full bg-ink/10" />
              <div class="size-2.5 rounded-full bg-ink/10" />
              <div class="size-2.5 rounded-full bg-ink/10" />
            </div>
            <span class="text-[10px] font-mono text-ink-faint">
              {{ platforms[active].file }}
            </span>
          </div>
          <pre class="p-5 text-[13px] text-ink/70 font-mono leading-relaxed overflow-x-auto"><code>{{ platforms[active].code }}</code></pre>
        </div>
      </div>
    </div>
  </section>
</template>

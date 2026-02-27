<script setup lang="ts">
import gsap from 'gsap'
import {
  PreviewButton,
  PreviewToggle,
  PreviewBadge,
  PreviewRating,
  PreviewCheckbox,
  PreviewTabs,
  PreviewSwitch,
  PreviewPagination,
  PreviewNumberInput,
  PreviewDatePicker,
  PreviewAccordion,
  PreviewSlider,
  PreviewColorPicker,
} from '#components'

const sliderRef = ref<HTMLElement>()

const sliderComponents = [
  { comp: PreviewButton, label: 'Button' },
  { comp: PreviewToggle, label: 'Toggle' },
  { comp: PreviewBadge, label: 'Badge' },
  { comp: PreviewRating, label: 'Rating' },
  { comp: PreviewCheckbox, label: 'Checkbox' },
  { comp: PreviewTabs, label: 'Tabs' },
  { comp: PreviewSwitch, label: 'Switch' },
  { comp: PreviewPagination, label: 'Pagination' },
  { comp: PreviewNumberInput, label: 'Number Input' },
  { comp: PreviewDatePicker, label: 'Date Picker' },
  { comp: PreviewAccordion, label: 'Accordion' },
  { comp: PreviewSlider, label: 'Slider' },
  { comp: PreviewColorPicker, label: 'Color Picker' },
]

onMounted(() => {
  if (!sliderRef.value) return

  const track = sliderRef.value
  const cards = track.querySelectorAll('.slider-card')
  if (!cards.length) return

  const gap = 20
  let totalHeight = 0
  cards.forEach((card, i) => {
    if (i < sliderComponents.length) {
      totalHeight += (card as HTMLElement).offsetHeight + gap
    }
  })

  gsap.to(track, {
    y: -totalHeight,
    duration: 40,
    ease: 'none',
    repeat: -1,
  })
})
</script>

<template>
  <section class="pt-32 md:pt-20">
    <div class="max-w-7xl mx-auto px-6">
      <p class="font-mono text-[11px] tracking-[0.25em] uppercase text-ink-muted">
        Libreria componenti UI
      </p>

      <div class="mt-8 md:mt-10 flex items-start gap-12 lg:gap-20">
        <!-- Left: title -->
        <div class="flex-1 min-w-0">
          <h1 class="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-bold tracking-[-0.03em] leading-[0.92] text-ink">
            Copia, incolla<br />
            <span class="text-ink-faint">e vai in produzione!</span>
          </h1>
        </div>

        <!-- Right: component slider -->
        <div class="hidden lg:block w-80 xl:w-96 h-105 overflow-hidden relative shrink-0">
          <!-- Gradient masks -->
          <div class="absolute top-0 left-0 right-0 h-24 bg-linear-to-b from-white to-transparent z-10 pointer-events-none" />
          <div class="absolute bottom-0 left-0 right-0 h-24 bg-linear-to-t from-white to-transparent z-10 pointer-events-none" />

          <div ref="sliderRef" class="flex flex-col gap-5">
            <!-- First set -->
            <div
              v-for="item in sliderComponents"
              :key="'a-' + item.label"
              class="slider-card bg-white border border-border-subtle/60 rounded-2xl overflow-hidden"
            >
              <div class="px-4 py-2.5 border-b border-border-subtle/40 flex items-center gap-2">
                <div class="size-1.5 rounded-full bg-ink/15" />
                <span class="text-[11px] font-medium text-ink-muted">{{ item.label }}</span>
              </div>
              <div class="p-5 flex items-center justify-center">
                <component :is="item.comp" />
              </div>
            </div>
            <!-- Duplicate set for seamless loop -->
            <div
              v-for="item in sliderComponents"
              :key="'b-' + item.label"
              class="slider-card bg-white border border-border-subtle/60 rounded-2xl overflow-hidden"
            >
              <div class="px-4 py-2.5 border-b border-border-subtle/40 flex items-center gap-2">
                <div class="size-1.5 rounded-full bg-ink/15" />
                <span class="text-[11px] font-medium text-ink-muted">{{ item.label }}</span>
              </div>
              <div class="p-5 flex items-center justify-center">
                <component :is="item.comp" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-10 md:mt-14 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
        <p class="text-lg text-ink-muted leading-relaxed max-w-md">
          Componenti UI per HTML, Vue e React. Progettati per essere
          belli di default. Zero dipendenze, zero lock-in.
        </p>
        <div class="flex items-center gap-4 shrink-0">
          <NuxtLink
            to="/components"
            class="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium bg-ink text-white rounded-lg hover:bg-accent-hover transition-colors"
          >
            Esplora la libreria
            <svg class="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </NuxtLink>
          <NuxtLink
            to="/templates"
            class="text-sm font-medium text-ink-muted hover:text-ink transition-colors"
          >
            Template
          </NuxtLink>
        </div>
      </div>

      <div class="mt-16 md:mt-20 pt-10 border-t border-border-subtle grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 pb-4">
        <div>
          <span class="text-3xl md:text-4xl font-bold tracking-tight text-ink">120+</span>
          <span class="block text-xs text-ink-muted mt-1.5">Componenti</span>
        </div>
        <div>
          <span class="text-3xl md:text-4xl font-bold tracking-tight text-ink">3</span>
          <span class="block text-xs text-ink-muted mt-1.5">Piattaforme</span>
        </div>
        <div>
          <span class="text-3xl md:text-4xl font-bold tracking-tight text-ink">0</span>
          <span class="block text-xs text-ink-muted mt-1.5">Dipendenze</span>
        </div>
        <div>
          <span class="text-3xl md:text-4xl font-bold tracking-tight text-ink">TS</span>
          <span class="block text-xs text-ink-muted mt-1.5">TypeScript ready</span>
        </div>
      </div>
    </div>
  </section>
</template>

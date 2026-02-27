<script setup lang="ts">
const carouselCurrent = ref(0)
const carouselSlides = [
  { label: 'Slide 1', bg: 'bg-ink' },
  { label: 'Slide 2', bg: 'bg-ink/70' },
  { label: 'Slide 3', bg: 'bg-ink/50' },
]
</script>

<template>
  <div class="w-full max-w-sm">
    <div class="relative rounded-2xl overflow-hidden">
      <div class="flex transition-transform duration-300 ease-out" :style="{ transform: `translateX(-${carouselCurrent * 100}%)` }">
        <div
          v-for="(slide, i) in carouselSlides"
          :key="i"
          class="min-w-full h-44 flex items-center justify-center text-white font-semibold text-lg"
          :class="slide.bg"
        >{{ slide.label }}</div>
      </div>
      <button class="absolute left-3 top-1/2 -translate-y-1/2 size-8 rounded-full bg-white border border-border-subtle flex items-center justify-center shadow-sm cursor-pointer hover:bg-surface" @click="carouselCurrent = (carouselCurrent - 1 + 3) % 3">
        <svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg>
      </button>
      <button class="absolute right-3 top-1/2 -translate-y-1/2 size-8 rounded-full bg-white border border-border-subtle flex items-center justify-center shadow-sm cursor-pointer hover:bg-surface" @click="carouselCurrent = (carouselCurrent + 1) % 3">
        <svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
      </button>
      <div class="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
        <button v-for="i in 3" :key="i" class="size-2 rounded-full transition-all cursor-pointer" :class="i - 1 === carouselCurrent ? 'bg-white' : 'bg-white/40'" @click="carouselCurrent = i - 1" />
      </div>
    </div>
  </div>
</template>

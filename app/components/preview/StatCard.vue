<template>
  <div class="w-full max-w-md grid grid-cols-3 gap-3">
    <div v-for="stat in [
      { label: 'Utenti', value: '12.4k', change: '+12.3%', up: true },
      { label: 'Revenue', value: '\u20AC8.2k', change: '+4.1%', up: true },
      { label: 'Bounce', value: '34%', change: '-2.7%', up: false },
    ]" :key="stat.label" class="bg-white border border-border-subtle rounded-xl p-3.5">
      <span class="text-[10px] font-medium text-ink-muted uppercase tracking-wider">{{ stat.label }}</span>
      <div class="flex items-end justify-between mt-1.5">
        <span class="text-xl font-bold text-ink tracking-tight">{{ stat.value }}</span>
        <span
          class="inline-flex items-center gap-0.5 text-[10px] font-semibold px-1.5 py-0.5 rounded-md"
          :class="stat.up ? 'text-green-700 bg-green-50' : 'text-red-600 bg-red-50'"
        >
          <svg class="size-2.5" :class="stat.up ? '' : 'rotate-180'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5"/></svg>
          {{ stat.change }}
        </span>
      </div>
      <!-- Mini sparkline -->
      <svg class="w-full h-6 mt-2.5" viewBox="0 0 100 24" fill="none" preserveAspectRatio="none">
        <path
          :d="stat.up ? 'M0 20 L15 16 L30 18 L45 12 L60 14 L75 8 L90 6 L100 4' : 'M0 6 L15 8 L30 5 L45 12 L60 10 L75 16 L90 14 L100 18'"
          stroke="currentColor"
          :class="stat.up ? 'text-green-500' : 'text-red-400'"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </div>
  </div>
</template>

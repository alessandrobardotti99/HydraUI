<template>
  <div class="flex items-center gap-4">
    <div class="flex">
      <div v-for="(a, i) in [
        { initials: 'AB', bg: 'bg-ink' },
        { initials: 'CD', bg: 'bg-ink/70' },
        { initials: 'EF', bg: 'bg-ink/50' },
        { initials: 'GH', bg: 'bg-ink/35' },
      ]" :key="i" class="size-9 rounded-full flex items-center justify-center text-xs font-semibold text-white border-2 border-white" :class="[a.bg, i > 0 ? '-ml-2.5' : '']">
        {{ a.initials }}
      </div>
      <div class="size-9 rounded-full flex items-center justify-center text-[11px] font-semibold text-ink bg-surface border-2 border-white -ml-2.5">+3</div>
    </div>
  </div>
</template>

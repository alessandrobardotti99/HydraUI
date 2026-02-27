<template>
  <div class="w-full max-w-sm">
    <div class="flex flex-col pl-4">
      <div v-for="(item, i) in [
        { date: 'Oggi', title: 'Progetto pubblicato', desc: 'Il sito è ora live.' },
        { date: '2 giorni fa', title: 'Review completata', desc: 'Tutti i feedback integrati.' },
        { date: '1 settimana fa', title: 'Design approvato', desc: 'Il cliente ha confermato.' },
      ]" :key="i" class="flex gap-4 relative" :class="i < 2 ? 'pb-6' : ''">
        <div v-if="i < 2" class="absolute left-1.5 top-3 bottom-0 w-px bg-border-subtle" />
        <div class="size-3 rounded-full mt-1 shrink-0 relative z-10" :class="i === 0 ? 'bg-ink' : 'bg-border-subtle'" />
        <div>
          <span class="text-[11px] text-ink-faint font-medium">{{ item.date }}</span>
          <h4 class="text-sm font-semibold text-ink mt-0.5">{{ item.title }}</h4>
          <p class="text-xs text-ink-muted mt-0.5">{{ item.desc }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

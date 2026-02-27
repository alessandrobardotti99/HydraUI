<template>
  <div class="w-full max-w-lg">
    <div class="grid grid-cols-3 gap-2.5">
      <div v-for="col in [
        { title: 'Da fare', color: 'bg-ink-faint', cards: [
          { text: 'Redesign homepage', tag: 'Design', tagColor: 'bg-blue-100 text-blue-700' },
          { text: 'Fix login bug', tag: 'Bug', tagColor: 'bg-red-100 text-red-700' },
        ]},
        { title: 'In corso', color: 'bg-ink-muted', cards: [
          { text: 'API endpoints', tag: 'Dev', tagColor: 'bg-purple-100 text-purple-700' },
        ]},
        { title: 'Completato', color: 'bg-ink', cards: [
          { text: 'Setup CI/CD', tag: 'DevOps', tagColor: 'bg-green-100 text-green-700' },
          { text: 'User research', tag: 'UX', tagColor: 'bg-amber-100 text-amber-700' },
        ]},
      ]" :key="col.title" class="flex flex-col">
        <div class="flex items-center gap-2 mb-2.5">
          <div class="size-2 rounded-full" :class="col.color" />
          <span class="text-[11px] font-semibold text-ink">{{ col.title }}</span>
          <span class="text-[10px] text-ink-faint ml-auto">{{ col.cards.length }}</span>
        </div>
        <div class="flex flex-col gap-2">
          <div
            v-for="(card, i) in col.cards"
            :key="i"
            class="bg-white border border-border-subtle rounded-lg p-2.5 cursor-grab hover:shadow-sm transition-shadow"
          >
            <p class="text-xs text-ink mb-1.5">{{ card.text }}</p>
            <span class="text-[9px] font-medium px-1.5 py-0.5 rounded" :class="card.tagColor">{{ card.tag }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

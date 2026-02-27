<script setup lang="ts">
const faqs = [
  {
    question: 'Quali piattaforme sono supportate?',
    answer: 'Ogni componente è disponibile in tre versioni: HTML/CSS/JS puro, Vue.js con Composition API e TypeScript, e React con hooks e TypeScript. Il codice è pronto per la produzione.',
  },
  {
    question: 'I componenti sono personalizzabili?',
    answer: 'Assolutamente. Ogni componente usa Tailwind CSS ed è progettato per essere facilmente personalizzabile. Puoi modificare colori, dimensioni, spaziature e comportamenti senza toccare la logica interna.',
  },
  {
    question: 'Posso usarli in progetti commerciali?',
    answer: 'Sì. Tutti i componenti sono rilasciati con licenza che permette l\'uso commerciale. Puoi usarli in progetti client, prodotti SaaS, applicazioni interne e qualsiasi altro contesto.',
  },
  {
    question: 'Qual è la differenza tra componenti, blocchi e template?',
    answer: 'I componenti sono elementi singoli (bottoni, input, modali). I blocchi sono sezioni di pagina composte da più componenti (hero, pricing, FAQ). I template sono pagine complete pronte all\'uso.',
  },
  {
    question: 'Come funziona l\'area riservata?',
    answer: 'L\'area riservata ti permette di salvare i tuoi componenti preferiti, organizzarli in collezioni e accedervi rapidamente. È il tuo spazio personale per gestire la tua libreria.',
  },
]

const openIndex = ref<number | null>(null)

function toggle(index: number) {
  openIndex.value = openIndex.value === index ? null : index
}
</script>

<template>
  <section class="border-t border-border-subtle/60">
    <div class="max-w-7xl mx-auto px-6 py-24 md:py-32">
      <div class="grid md:grid-cols-12 gap-12 md:gap-16 items-start mb-16">
        <div class="md:col-span-4">
          <p class="text-xs font-medium tracking-[0.2em] uppercase text-ink-muted">
            FAQ
          </p>
        </div>
        <div class="md:col-span-8">
          <h2 class="text-2xl md:text-3xl font-semibold tracking-tight text-ink">
            Domande frequenti
          </h2>
        </div>
      </div>

      <div class="max-w-3xl ml-auto">
        <div class="divide-y divide-border-subtle/60">
          <div
            v-for="(faq, index) in faqs"
            :key="index"
            class="py-5"
          >
            <button
              type="button"
              class="w-full flex items-start justify-between gap-4 text-left cursor-pointer group"
              @click="toggle(index)"
            >
              <span class="text-base font-medium text-ink group-hover:text-ink/80 transition-colors">
                {{ faq.question }}
              </span>
              <svg
                class="size-5 text-ink-muted shrink-0 mt-0.5 transition-transform duration-300"
                :class="{ 'rotate-45': openIndex === index }"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="1.5"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
            </button>

            <Transition
              enter-active-class="transition-all duration-300 ease-out overflow-hidden"
              enter-from-class="max-h-0 opacity-0"
              enter-to-class="max-h-48 opacity-100"
              leave-active-class="transition-all duration-200 ease-in overflow-hidden"
              leave-from-class="max-h-48 opacity-100"
              leave-to-class="max-h-0 opacity-0"
            >
              <div v-if="openIndex === index" class="pt-3">
                <p class="text-sm text-ink-muted leading-relaxed">
                  {{ faq.answer }}
                </p>
              </div>
            </Transition>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

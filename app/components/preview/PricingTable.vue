<script setup lang="ts">
const annual = ref(false)
const plans = [
  { name: 'Starter', monthly: 0, yearly: 0, cta: 'Inizia gratis', features: ['5 progetti', '1 GB storage', 'Community support'], highlight: false },
  { name: 'Pro', monthly: 19, yearly: 190, cta: 'Scegli Pro', features: ['Progetti illimitati', '50 GB storage', 'Supporto prioritario', 'API access'], highlight: true },
  { name: 'Team', monthly: 49, yearly: 490, cta: 'Contattaci', features: ['Tutto di Pro', '500 GB storage', 'SSO & SAML', 'SLA 99.9%'], highlight: false },
]
</script>

<template>
  <div class="w-full max-w-lg">
    <!-- Toggle -->
    <div class="flex items-center justify-center gap-3 mb-5">
      <span class="text-xs font-medium" :class="!annual ? 'text-ink' : 'text-ink-faint'">Mensile</span>
      <button
        type="button"
        class="relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full transition-colors duration-200"
        :class="annual ? 'bg-ink' : 'bg-border'"
        @click="annual = !annual"
      >
        <span class="pointer-events-none inline-block size-4 rounded-full bg-white shadow-sm transition-transform duration-200 translate-y-0.5" :class="annual ? 'translate-x-4.5' : 'translate-x-0.5'" />
      </button>
      <span class="text-xs font-medium" :class="annual ? 'text-ink' : 'text-ink-faint'">Annuale <span class="text-green-600">-17%</span></span>
    </div>

    <!-- Plans grid -->
    <div class="grid grid-cols-3 gap-2.5">
      <div
        v-for="plan in plans"
        :key="plan.name"
        class="rounded-xl p-3.5 border transition-all"
        :class="plan.highlight ? 'border-ink bg-white shadow-sm' : 'border-border-subtle bg-white'"
      >
        <h3 class="text-xs font-semibold text-ink mb-1">{{ plan.name }}</h3>
        <div class="flex items-baseline gap-0.5 mb-3">
          <span class="text-xl font-bold text-ink">&euro;{{ annual ? plan.yearly : plan.monthly }}</span>
          <span class="text-[10px] text-ink-faint">{{ annual ? '/anno' : '/mese' }}</span>
        </div>
        <button
          class="w-full py-1.5 text-[11px] font-medium rounded-md transition-all cursor-pointer mb-3"
          :class="plan.highlight ? 'bg-ink text-white' : 'bg-surface text-ink hover:bg-surface-muted'"
        >{{ plan.cta }}</button>
        <ul class="flex flex-col gap-1.5">
          <li v-for="f in plan.features" :key="f" class="flex items-start gap-1.5 text-[10px] text-ink-muted">
            <svg class="size-3 text-ink shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5"/></svg>
            {{ f }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

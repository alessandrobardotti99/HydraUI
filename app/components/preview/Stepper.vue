<script setup lang="ts">
const stepperCurrent = ref(1)
</script>

<template>
  <div class="w-full max-w-sm">
    <div class="flex items-start">
      <div
        v-for="(step, i) in ['Account', 'Profilo', 'Revisione', 'Conferma']"
        :key="i"
        class="flex flex-col items-center flex-1 relative"
      >
        <div
          class="size-8 rounded-full flex items-center justify-center text-xs font-semibold border-2 relative z-10 transition-all"
          :class="i < stepperCurrent ? 'bg-ink text-white border-ink' : i === stepperCurrent ? 'bg-ink text-white border-ink' : 'bg-surface text-ink-faint border-border-subtle'"
        >
          <svg v-if="i < stepperCurrent" class="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5"/></svg>
          <template v-else>{{ i + 1 }}</template>
        </div>
        <div v-if="i < 3" class="absolute top-4 left-[calc(50%+16px)] right-[calc(-50%+16px)] h-0.5" :class="i < stepperCurrent ? 'bg-ink' : 'bg-border-subtle'" />
        <span class="text-[11px] mt-2 font-medium" :class="i <= stepperCurrent ? 'text-ink' : 'text-ink-faint'">{{ step }}</span>
      </div>
    </div>
    <div class="flex justify-center gap-2 mt-5">
      <UiButton variant="outline" size="sm" :disabled="stepperCurrent <= 0" @click="stepperCurrent--">Indietro</UiButton>
      <UiButton variant="primary" size="sm" :disabled="stepperCurrent >= 3" @click="stepperCurrent++">Avanti</UiButton>
    </div>
  </div>
</template>

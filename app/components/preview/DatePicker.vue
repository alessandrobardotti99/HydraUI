<script setup lang="ts">
const monthNames = ['Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno', 'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre']
const today = new Date()
const dpMonth = ref(today.getMonth())
const dpYear = ref(today.getFullYear())
const dpSelected = ref<{ day: number; month: number; year: number }>({ day: today.getDate(), month: today.getMonth(), year: today.getFullYear() })
const dpCalendar = computed(() => {
  const first = new Date(dpYear.value, dpMonth.value, 1).getDay()
  const offset = first === 0 ? 6 : first - 1
  const daysInMonth = new Date(dpYear.value, dpMonth.value + 1, 0).getDate()
  return { offset, days: daysInMonth }
})
function dpPrev() {
  if (dpMonth.value === 0) { dpMonth.value = 11; dpYear.value-- }
  else dpMonth.value--
}
function dpNext() {
  if (dpMonth.value === 11) { dpMonth.value = 0; dpYear.value++ }
  else dpMonth.value++
}
function dpIsSelected(d: number) {
  return dpSelected.value.day === d && dpSelected.value.month === dpMonth.value && dpSelected.value.year === dpYear.value
}
function dpIsToday(d: number) {
  return d === today.getDate() && dpMonth.value === today.getMonth() && dpYear.value === today.getFullYear()
}
</script>

<template>
  <div class="w-full max-w-70">
    <div class="bg-white border border-border-subtle rounded-xl p-4 shadow-sm">
      <div class="flex items-center justify-between mb-3">
        <button class="text-ink-muted hover:text-ink text-lg px-2 cursor-pointer" @click="dpPrev">&lsaquo;</button>
        <span class="text-sm font-semibold text-ink">{{ monthNames[dpMonth] }} {{ dpYear }}</span>
        <button class="text-ink-muted hover:text-ink text-lg px-2 cursor-pointer" @click="dpNext">&rsaquo;</button>
      </div>
      <div class="grid grid-cols-7 gap-1 text-center">
        <span v-for="d in ['Lu','Ma','Me','Gi','Ve','Sa','Do']" :key="d" class="text-[10px] font-medium text-ink-faint py-1">{{ d }}</span>
        <span v-for="i in dpCalendar.offset" :key="'e'+i" />
        <button
          v-for="d in dpCalendar.days"
          :key="d"
          class="size-8 rounded-lg text-xs transition-all cursor-pointer"
          :class="dpIsSelected(d) ? 'bg-ink text-white font-semibold' : dpIsToday(d) ? 'bg-surface font-semibold text-ink' : 'text-ink hover:bg-surface'"
          @click="dpSelected = { day: d, month: dpMonth, year: dpYear }"
        >
          {{ d }}
        </button>
      </div>
    </div>
  </div>
</template>

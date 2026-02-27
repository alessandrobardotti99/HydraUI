<script setup lang="ts">
const tpHour = ref(14)
const tpMinute = ref(30)
const allHours = Array.from({ length: 24 }, (_, i) => i)
const allMinutes = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55]
</script>

<template>
  <div class="w-full max-w-50">
    <div class="bg-white border border-border-subtle rounded-xl p-3 shadow-sm">
      <div class="flex items-center justify-center gap-1 mb-3 text-lg font-semibold text-ink">
        {{ String(tpHour).padStart(2, '0') }}<span class="text-ink-faint">:</span>{{ String(tpMinute).padStart(2, '0') }}
      </div>
      <div class="flex gap-2">
        <div class="flex-1">
          <div class="text-[10px] font-medium text-ink-faint text-center mb-2 uppercase">Ore</div>
          <div class="flex flex-col gap-0.5 max-h-35 overflow-y-auto">
            <button
              v-for="h in allHours"
              :key="h"
              class="w-full py-1.5 text-center text-sm rounded-md transition-all cursor-pointer"
              :class="h === tpHour ? 'bg-ink text-white font-medium' : 'text-ink hover:bg-surface'"
              @click="tpHour = h"
            >
              {{ String(h).padStart(2, '0') }}
            </button>
          </div>
        </div>
        <div class="flex-1">
          <div class="text-[10px] font-medium text-ink-faint text-center mb-2 uppercase">Min</div>
          <div class="flex flex-col gap-0.5 max-h-35 overflow-y-auto">
            <button
              v-for="m in allMinutes"
              :key="m"
              class="w-full py-1.5 text-center text-sm rounded-md transition-all cursor-pointer"
              :class="m === tpMinute ? 'bg-ink text-white font-medium' : 'text-ink hover:bg-surface'"
              @click="tpMinute = m"
            >
              {{ String(m).padStart(2, '0') }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

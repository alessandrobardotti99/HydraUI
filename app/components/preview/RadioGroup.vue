<script setup lang="ts">
const radioVal = ref('a')
</script>

<template>
  <div class="flex flex-col gap-3">
    <label v-for="opt in [{l:'Opzione A',v:'a'},{l:'Opzione B',v:'b'},{l:'Opzione C',v:'c'}]" :key="opt.v" class="flex items-center gap-3 cursor-pointer" @click="radioVal = opt.v">
      <div class="size-5 rounded-full border-2 flex items-center justify-center transition-all" :class="radioVal === opt.v ? 'border-ink' : 'border-border'">
        <div class="size-2.5 rounded-full bg-ink transition-transform" :class="radioVal === opt.v ? 'scale-100' : 'scale-0'" />
      </div>
      <span class="text-sm text-ink">{{ opt.l }}</span>
    </label>
  </div>
</template>

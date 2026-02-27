<script setup lang="ts">
const switchOn = ref(true)
</script>

<template>
  <div class="flex flex-col gap-4">
    <label class="flex items-center gap-3 cursor-pointer">
      <button
        type="button"
        class="relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full transition-colors duration-200"
        :class="switchOn ? 'bg-ink' : 'bg-border'"
        @click="switchOn = !switchOn"
      >
        <span class="pointer-events-none inline-block size-5 rounded-full bg-white shadow-sm transition-transform duration-200 translate-y-0.5" :class="switchOn ? 'translate-x-5.5' : 'translate-x-0.5'" />
      </button>
      <span class="text-sm text-ink">{{ switchOn ? 'Notifiche attive' : 'Notifiche disattive' }}</span>
    </label>
  </div>
</template>

<script setup lang="ts">
interface Tab {
  label: string
  value: string
}

interface Props {
  modelValue: string
  tabs: Tab[]
}

defineProps<Props>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const indicatorStyle = ref({ left: '0px', width: '0px' })
const tabsRef = ref<HTMLElement>()

function updateIndicator() {
  if (!tabsRef.value) return
  const active = tabsRef.value.querySelector('[data-active="true"]') as HTMLElement
  if (active) {
    indicatorStyle.value = {
      left: `${active.offsetLeft}px`,
      width: `${active.offsetWidth}px`,
    }
  }
}

onMounted(() => {
  nextTick(updateIndicator)
})

watch(() => getCurrentInstance()?.props.modelValue, () => {
  nextTick(updateIndicator)
})
</script>

<template>
  <div ref="tabsRef" class="relative flex items-center gap-0.5 p-1 bg-surface-muted rounded-lg">
    <div
      class="absolute top-1 bottom-1 bg-surface-raised rounded-md transition-all duration-250 ease-out"
      :style="indicatorStyle"
    />
    <button
      v-for="tab in tabs"
      :key="tab.value"
      type="button"
      :data-active="tab.value === modelValue"
      class="relative z-10 px-3.5 py-1.5 text-sm font-medium rounded-md transition-colors duration-200 cursor-pointer select-none"
      :class="tab.value === modelValue ? 'text-ink' : 'text-ink-muted hover:text-ink'"
      @click="emit('update:modelValue', tab.value)"
    >
      {{ tab.label }}
    </button>
  </div>
</template>

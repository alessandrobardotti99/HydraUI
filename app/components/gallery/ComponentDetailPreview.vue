<script setup lang="ts">
const props = defineProps<{ slug: string }>()

const componentMap: Record<string, ReturnType<typeof resolveComponent>> = {
  'button': resolveComponent('PreviewButton'),
  'avatar': resolveComponent('PreviewAvatar'),
  'badge': resolveComponent('PreviewBadge'),
  'input': resolveComponent('PreviewInput'),
  'select': resolveComponent('PreviewSelect'),
  'checkbox': resolveComponent('PreviewCheckbox'),
  'toggle': resolveComponent('PreviewToggle'),
  'textarea': resolveComponent('PreviewTextarea'),
  'tabs': resolveComponent('PreviewTabs'),
  'breadcrumb': resolveComponent('PreviewBreadcrumb'),
  'dropdown-menu': resolveComponent('PreviewDropdownMenu'),
  'modal': resolveComponent('PreviewModal'),
  'tooltip': resolveComponent('PreviewTooltip'),
  'card': resolveComponent('PreviewCard'),
  'accordion': resolveComponent('PreviewAccordion'),
  'data-table': resolveComponent('PreviewDataTable'),
  'toast': resolveComponent('PreviewToast'),
  'skeleton': resolveComponent('PreviewSkeleton'),
  'switch': resolveComponent('PreviewSwitch'),
  'radio-group': resolveComponent('PreviewRadioGroup'),
  'slider': resolveComponent('PreviewSlider'),
  'multi-select': resolveComponent('PreviewMultiSelect'),
  'input-otp': resolveComponent('PreviewInputOtp'),
  'date-picker': resolveComponent('PreviewDatePicker'),
  'time-picker': resolveComponent('PreviewTimePicker'),
  'drawer': resolveComponent('PreviewDrawer'),
  'popover': resolveComponent('PreviewPopover'),
  'spinner': resolveComponent('PreviewSpinner'),
  'progress': resolveComponent('PreviewProgress'),
  'alert': resolveComponent('PreviewAlert'),
  'pagination': resolveComponent('PreviewPagination'),
  'separator': resolveComponent('PreviewSeparator'),
  'tree-view': resolveComponent('PreviewTreeView'),
  'color-picker': resolveComponent('PreviewColorPicker'),
  'command-palette': resolveComponent('PreviewCommandPalette'),
  'carousel': resolveComponent('PreviewCarousel'),
  'context-menu': resolveComponent('PreviewContextMenu'),
  'file-upload': resolveComponent('PreviewFileUpload'),
  'timeline': resolveComponent('PreviewTimeline'),
  'kbd': resolveComponent('PreviewKbd'),
  'avatar-group': resolveComponent('PreviewAvatarGroup'),
  'combobox': resolveComponent('PreviewCombobox'),
  'tag-input': resolveComponent('PreviewTagInput'),
  'stepper': resolveComponent('PreviewStepper'),
  'number-input': resolveComponent('PreviewNumberInput'),
  'rating': resolveComponent('PreviewRating'),
  'pricing-table': resolveComponent('PreviewPricingTable'),
  'stat-card': resolveComponent('PreviewStatCard'),
  'kanban-board': resolveComponent('PreviewKanbanBoard'),
  'chat-bubble': resolveComponent('PreviewChatBubble'),
  'empty-state': resolveComponent('PreviewEmptyState'),
  'notification-feed': resolveComponent('PreviewNotificationFeed'),
}

const activeComponent = computed(() => componentMap[props.slug])
</script>

<template>
  <component :is="activeComponent" v-if="activeComponent" />
  <div v-else class="text-ink-faint text-sm font-mono">
    &lt;{{ slug }} /&gt;
  </div>
</template>

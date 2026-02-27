<template>
  <div class="w-full max-w-xs">
    <!-- Header -->
    <div class="flex items-center justify-between mb-3">
      <h3 class="text-sm font-semibold text-ink">Notifiche</h3>
      <span class="text-[10px] font-medium text-ink-muted bg-surface px-2 py-0.5 rounded-full">3 nuove</span>
    </div>

    <div class="flex flex-col gap-1">
      <div
        v-for="(item, i) in notifications"
        :key="i"
        class="flex items-start gap-2.5 p-2.5 rounded-xl transition-colors"
        :class="item.unread ? 'bg-surface' : ''"
      >
        <!-- Icon -->
        <div class="size-8 rounded-lg flex items-center justify-center shrink-0" :class="item.iconBg">
          <svg class="size-4" :class="item.iconColor" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" :d="item.icon" />
          </svg>
        </div>

        <!-- Content -->
        <div class="flex-1 min-w-0">
          <p class="text-xs text-ink leading-relaxed">
            <span class="font-semibold">{{ item.actor }}</span> {{ item.action }}
          </p>
          <span class="text-[10px] text-ink-faint mt-0.5 block">{{ item.time }}</span>
        </div>

        <!-- Unread dot -->
        <div v-if="item.unread" class="size-2 rounded-full bg-blue-500 shrink-0 mt-1.5" />
      </div>
    </div>

    <!-- Footer -->
    <button class="w-full text-center text-[11px] font-medium text-ink-muted hover:text-ink mt-2 py-2 transition-colors cursor-pointer">
      Vedi tutte le notifiche
    </button>
  </div>
</template>

<script setup lang="ts">
const notifications = [
  {
    actor: 'Marco R.',
    action: 'ha commentato il tuo progetto',
    time: '2 min fa',
    unread: true,
    icon: 'M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z',
    iconBg: 'bg-blue-50',
    iconColor: 'text-blue-600',
  },
  {
    actor: 'Sara L.',
    action: 'ti ha invitato nel team Design',
    time: '15 min fa',
    unread: true,
    icon: 'M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z',
    iconBg: 'bg-purple-50',
    iconColor: 'text-purple-600',
  },
  {
    actor: 'Deploy',
    action: 'completato con successo su prod',
    time: '1 ora fa',
    unread: true,
    icon: 'M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z',
    iconBg: 'bg-green-50',
    iconColor: 'text-green-600',
  },
  {
    actor: 'Sistema',
    action: 'aggiornamento disponibile v2.4.0',
    time: '3 ore fa',
    unread: false,
    icon: 'M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182',
    iconBg: 'bg-amber-50',
    iconColor: 'text-amber-600',
  },
  {
    actor: 'Luca B.',
    action: 'ha approvato la pull request #42',
    time: 'Ieri',
    unread: false,
    icon: 'M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V3a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z',
    iconBg: 'bg-surface',
    iconColor: 'text-ink-faint',
  },
]
</script>

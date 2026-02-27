<template>
  <div class="w-full max-w-md">
    <div class="border border-border-subtle rounded-xl overflow-hidden">
      <table class="w-full text-sm">
        <thead>
          <tr class="bg-surface text-left">
            <th class="px-4 py-2.5 font-medium text-ink-muted text-xs">Nome</th>
            <th class="px-4 py-2.5 font-medium text-ink-muted text-xs">Ruolo</th>
            <th class="px-4 py-2.5 font-medium text-ink-muted text-xs">Stato</th>
          </tr>
        </thead>
        <tbody>
          <tr class="border-t border-border-subtle/40">
            <td class="px-4 py-2.5 text-ink">Marco Rossi</td>
            <td class="px-4 py-2.5 text-ink-muted">Admin</td>
            <td class="px-4 py-2.5"><UiBadge variant="default" size="sm">Attivo</UiBadge></td>
          </tr>
          <tr class="border-t border-border-subtle/40">
            <td class="px-4 py-2.5 text-ink">Laura Bianchi</td>
            <td class="px-4 py-2.5 text-ink-muted">Editor</td>
            <td class="px-4 py-2.5"><UiBadge variant="muted" size="sm">Inattivo</UiBadge></td>
          </tr>
          <tr class="border-t border-border-subtle/40">
            <td class="px-4 py-2.5 text-ink">Luca Verdi</td>
            <td class="px-4 py-2.5 text-ink-muted">Viewer</td>
            <td class="px-4 py-2.5"><UiBadge variant="default" size="sm">Attivo</UiBadge></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

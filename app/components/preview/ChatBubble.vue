<template>
  <div class="w-full max-w-sm flex flex-col gap-3">
    <!-- Received -->
    <div class="flex items-start gap-2.5">
      <div class="size-7 rounded-full bg-ink/70 flex items-center justify-center text-[10px] font-semibold text-white shrink-0">MR</div>
      <div>
        <div class="bg-white border border-border-subtle rounded-2xl rounded-tl-sm px-3.5 py-2.5 max-w-64">
          <p class="text-xs text-ink leading-relaxed">Ciao! Ho visto il nuovo design, mi piace molto. Quando pensi di finire?</p>
        </div>
        <span class="text-[9px] text-ink-faint mt-1 ml-1 block">10:32</span>
      </div>
    </div>

    <!-- Sent -->
    <div class="flex items-start gap-2.5 flex-row-reverse">
      <div class="size-7 rounded-full bg-ink flex items-center justify-center text-[10px] font-semibold text-white shrink-0">Tu</div>
      <div class="flex flex-col items-end">
        <div class="bg-ink text-white rounded-2xl rounded-tr-sm px-3.5 py-2.5 max-w-64">
          <p class="text-xs leading-relaxed">Grazie! Dovrei finire entro venerdì. Ti mando un link per la preview.</p>
        </div>
        <span class="text-[9px] text-ink-faint mt-1 mr-1 block">10:34</span>
      </div>
    </div>

    <!-- Received with typing -->
    <div class="flex items-start gap-2.5">
      <div class="size-7 rounded-full bg-ink/70 flex items-center justify-center text-[10px] font-semibold text-white shrink-0">MR</div>
      <div class="bg-white border border-border-subtle rounded-2xl rounded-tl-sm px-3.5 py-2.5">
        <div class="flex gap-1">
          <div class="size-1.5 rounded-full bg-ink-faint animate-bounce" style="animation-delay: 0ms" />
          <div class="size-1.5 rounded-full bg-ink-faint animate-bounce" style="animation-delay: 150ms" />
          <div class="size-1.5 rounded-full bg-ink-faint animate-bounce" style="animation-delay: 300ms" />
        </div>
      </div>
    </div>
  </div>
</template>

<template>
  <div class="min-h-screen bg-white text-ink flex flex-col">
    <SiteNavbarReserved />
    <main class="flex-1">
      <slot />
    </main>
    <SiteFooterReserved />
  </div>
</template>

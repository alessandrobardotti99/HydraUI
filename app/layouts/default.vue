<template>
  <div class="min-h-screen bg-white text-ink flex flex-col">
    <SiteNavbar />
    <main class="flex-1">
      <slot />
    </main>
    <SiteFooter />
  </div>
</template>

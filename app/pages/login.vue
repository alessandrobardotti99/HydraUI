<script setup lang="ts">
useHead({ title: 'Accedi — HydraUI' })

const email = ref('')
const password = ref('')
const error = ref('')

const { login, isAuthenticated } = useAuth()
const router = useRouter()

if (isAuthenticated.value) {
  router.replace('/reserved')
}

async function handleLogin() {
  error.value = ''

  if (!email.value || !password.value) {
    error.value = 'Compila tutti i campi.'
    return
  }

  const success = login(email.value, password.value)
  if (success) {
    await router.push('/reserved')
  }
}
</script>

<template>
  <div class="min-h-[80vh] flex items-center justify-center px-6">
    <div class="w-full max-w-sm">
      <div class="text-center mb-8">
        <h1 class="text-2xl font-bold tracking-tight text-ink">Accedi</h1>
        <p class="mt-2 text-sm text-ink-muted">Entra nella tua area riservata.</p>
      </div>

      <form class="flex flex-col gap-4" @submit.prevent="handleLogin">
        <div v-if="error" class="p-3 rounded-lg bg-red-50 text-red-600 text-sm">
          {{ error }}
        </div>

        <UiInput
          v-model="email"
          label="Email"
          type="email"
          placeholder="nome@email.com"
        />

        <UiInput
          v-model="password"
          label="Password"
          type="password"
          placeholder="••••••••"
        />

        <UiButton type="submit" variant="primary" class="w-full mt-2">
          Accedi
        </UiButton>
      </form>

      <p class="mt-6 text-center text-sm text-ink-muted">
        Non hai un account?
        <NuxtLink to="/register" class="font-medium text-ink hover:text-ink/80 transition-colors">
          Registrati
        </NuxtLink>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({ title: 'Registrati — HydraUI' })

const name = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const error = ref('')

const { register, isAuthenticated } = useAuth()
const router = useRouter()

if (isAuthenticated.value) {
  router.replace('/reserved')
}

async function handleRegister() {
  error.value = ''

  if (!name.value || !email.value || !password.value || !confirmPassword.value) {
    error.value = 'Compila tutti i campi.'
    return
  }

  if (password.value !== confirmPassword.value) {
    error.value = 'Le password non corrispondono.'
    return
  }

  if (password.value.length < 6) {
    error.value = 'La password deve essere di almeno 6 caratteri.'
    return
  }

  const success = register(name.value, email.value, password.value)
  if (success) {
    await router.push('/reserved')
  }
}
</script>

<template>
  <div class="min-h-[80vh] flex items-center justify-center px-6">
    <div class="w-full max-w-sm">
      <div class="text-center mb-8">
        <h1 class="text-2xl font-bold tracking-tight text-ink">Crea un account</h1>
        <p class="mt-2 text-sm text-ink-muted">Inizia a salvare i tuoi componenti.</p>
      </div>

      <form class="flex flex-col gap-4" @submit.prevent="handleRegister">
        <div v-if="error" class="p-3 rounded-lg bg-red-50 text-red-600 text-sm">
          {{ error }}
        </div>

        <UiInput
          v-model="name"
          label="Nome"
          placeholder="Mario Rossi"
        />

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

        <UiInput
          v-model="confirmPassword"
          label="Conferma password"
          type="password"
          placeholder="••••••••"
        />

        <UiButton type="submit" variant="primary" class="w-full mt-2">
          Registrati
        </UiButton>
      </form>

      <p class="mt-6 text-center text-sm text-ink-muted">
        Hai già un account?
        <NuxtLink to="/login" class="font-medium text-ink hover:text-ink/80 transition-colors">
          Accedi
        </NuxtLink>
      </p>
    </div>
  </div>
</template>

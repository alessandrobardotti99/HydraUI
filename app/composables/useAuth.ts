interface AuthUser {
  name: string
  email: string
}

export const useAuth = () => {
  const user = useState<AuthUser | null>('auth-user', () => null)
  const isAuthenticated = computed(() => !!user.value)

  const login = (email: string, _password: string) => {
    user.value = { name: email.split('@')[0], email }
    return true
  }

  const register = (name: string, email: string, _password: string) => {
    user.value = { name, email }
    return true
  }

  const logout = () => {
    user.value = null
    navigateTo('/')
  }

  return { user, isAuthenticated, login, register, logout }
}

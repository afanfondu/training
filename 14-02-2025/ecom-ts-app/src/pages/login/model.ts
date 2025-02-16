import api, { APIResponse } from '@lib/api'
import createStore from '@lib/create-store'
import { jwtDecode } from 'jwt-decode'

export type User = { sub: number; user: string; iat: number }

type AuthState = {
  token: string | null
  user: User | null
}

type AuthActions = {
  login: (loginData: {
    username: string
    password: string
  }) => Promise<APIResponse>
  logout: () => void
}

export const auth = createStore<AuthState, AuthActions>(
  set => ({
    _state: { token: null, user: null },

    async login(loginData) {
      const res = (await api.post('/auth/login', loginData)) as APIResponse<{
        token: string
      }>

      if (!res.isError && res.data) {
        const user = jwtDecode(res.data.token) as User
        set({ token: res.data.token, user })
      }

      return res
    },

    logout() {
      set({ token: null, user: null })
    }
  }),
  'auth'
)

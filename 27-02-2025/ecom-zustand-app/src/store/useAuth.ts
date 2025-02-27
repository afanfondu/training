import config from '@/lib/config'
import { User } from '@/lib/types'
import { jwtDecode } from 'jwt-decode'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type AuthState = {
  token: string | null
  user: User | null

  setAuth: (token: string) => void
  removeAuth: () => void
}

const persistKey = `${config.appName}-auth`

const useAuth = create<AuthState>()(
  persist(
    set => ({
      token: null,
      user: null,

      setAuth: (token: string) => {
        const user = jwtDecode(token) as User
        set({ token, user })
      },

      removeAuth: () => set({ user: null, token: null })
    }),
    {
      name: persistKey
    }
  )
)

export default useAuth

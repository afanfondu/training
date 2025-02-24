import config from '@/lib/config'
import { createContext, useContext, useEffect, useReducer } from 'react'
import { AuthAction, authReducer, AuthState } from './auth-reducer'

type AuthContextType = {
  state: AuthState
  dispatch: React.ActionDispatch<[action: AuthAction]>
}

const AuthContext = createContext<AuthContextType | null>(null)

const storageKey = `${config.appName}-auth`

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(
    authReducer,
    {
      token: null,
      user: null
    },
    () => {
      const storageValue = localStorage.getItem(storageKey)
      return storageValue
        ? JSON.parse(storageValue)
        : { token: null, user: null }
    }
  )

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(state))
  }, [state])

  return <AuthContext value={{ state, dispatch }}>{children}</AuthContext>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within an AuthProvider')
  return context
}

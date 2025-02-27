import config from '@/lib/config'
import { User } from '@/lib/types'
import { createContext, useContext, useEffect, useState } from 'react'

type Auth = {
  token: string | null
  user: User | null
}

type AuthContextType = {
  auth: Auth
  setAuth: React.Dispatch<React.SetStateAction<Auth>>
}

const AuthContext = createContext<AuthContextType | null>(null)

const storageKey = `${config.appName}-auth`

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [auth, setAuth] = useState<Auth>(() => {
    const storageValue = localStorage.getItem(storageKey)
    return storageValue ? JSON.parse(storageValue) : { token: null, user: null }
  })

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(auth))
  }, [auth])

  return <AuthContext value={{ auth, setAuth }}>{children}</AuthContext>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within an AuthProvider')
  return context
}

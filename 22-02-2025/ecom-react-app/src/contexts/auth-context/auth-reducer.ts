import { User } from '@/lib/types'

export type AuthState = {
  token: string | null
  user: User | null
}

export type AuthAction =
  | { type: 'SET_AUTH'; payload: AuthState }
  | { type: 'REMOVE_AUTH' }

export const authReducer = (
  state: AuthState,
  action: AuthAction
): AuthState => {
  switch (action.type) {
    case 'SET_AUTH':
      return action.payload
    case 'REMOVE_AUTH':
      return { token: null, user: null }
  }
}

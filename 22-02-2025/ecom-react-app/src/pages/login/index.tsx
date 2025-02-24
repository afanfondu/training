import { useEffect } from 'react'
import { LoginForm } from './login-form'
import { useAuth } from '@/contexts/auth-context'
import { useNavigate } from 'react-router'

const LoginPage = () => {
  const { state } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (state.user) {
      navigate('/')
    }
  }, [state, navigate])

  return (
    <div className="w-full max-w-sm mx-auto mt-24">
      <LoginForm />
    </div>
  )
}

export default LoginPage

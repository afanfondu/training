import { useEffect } from 'react'
import { LoginForm } from './login-form'
import { useNavigate } from 'react-router'
import { useAuth } from '@/context/auth-context'

const LoginPage = () => {
  const { auth } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (auth.user) {
      navigate('/')
    }
  }, [auth, navigate])

  return (
    <div className="w-full max-w-sm mx-auto mt-24">
      <LoginForm />
    </div>
  )
}

export default LoginPage

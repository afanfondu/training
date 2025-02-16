import '@styles/globals.scss'
// @ts-ignore-next-line
import * as bootstrap from 'bootstrap'
import navbar from '@components/navbar'
import loginForm from './views/login-form'
import { auth } from './model'

const init = () => {
  const user = auth.get().user
  if (user) return (window.location.href = '/')

  navbar.render(user)

  loginForm.render()
  loginForm.loginHandler(async loginData => {
    return await auth.login(loginData)
  })
}

init()

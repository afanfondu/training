import View from '@components/view'
import toast from '@components/toast'
import { APIResponse } from '@lib/api'

class LoginView extends View {
  container = document.querySelector('#container') as HTMLDivElement

  generateMarkup() {
    return `
      <div class="container mt-5">
        <div class="row justify-content-center">
          <div class="col-md-6">
            <div class="card">
              <div class="card-header">
                <h3 class="text-center">Login</h3>
              </div>
              <div class="alert alert-primary" role="alert">
                Use one of the username and password from this <a target="_blank" href="http://fakestoreapi.com/users">users</a> list. Admin user - username: donero, password: ewedon
              </div>
              <div class="card-body">
                <form id="login-form">
                  <div class="mb-3">
                    <label for="username" class="form-label">Username</label>
                    <input type="text" class="form-control" id="username" required>
                  </div>
                  <div class="mb-3">
                    <label for="password" class="form-label">Password</label>
                    <input type="password" class="form-control" id="password" required>
                  </div>
                  <div class="d-grid">
                    <button type="submit" class="btn btn-primary">Login</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    `
  }

  formSubmitting(loading: boolean) {
    const loginBtn = this.container.querySelector('button') as HTMLButtonElement
    if (loading) {
      loginBtn.setAttribute('disabled', 'true')
      loginBtn.innerHTML = 'Loading...'
    } else {
      loginBtn.removeAttribute('disabled')
      loginBtn.innerHTML = 'Login'
    }
  }

  loginHandler(
    handler: (loginData: {
      username: string
      password: string
    }) => Promise<APIResponse>
  ) {
    this.container
      .querySelector('#login-form')
      ?.addEventListener('submit', async e => {
        e.preventDefault()
        this.formSubmitting(true)

        const username = (
          this.container.querySelector('#username') as HTMLInputElement
        ).value
        const password = (
          this.container.querySelector('#password') as HTMLInputElement
        ).value

        const { isError } = await handler({ username, password })

        if (isError) {
          toast.error('Invalid username or password!')
          this.formSubmitting(false)
          return
        }

        window.location.href = '/'
      })
  }
}

export default new LoginView()

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginFormSchema, LoginFormValues } from './schema'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Link } from 'react-router'
import { useMutation } from '@/hooks/useMutation'
import { LoadingButton } from '@/components/shared/loading-button'
import { useAuth } from '@/contexts/auth-context'
import { toast } from 'sonner'
import { jwtDecode } from 'jwt-decode'
import { User } from '@/lib/types'
import { login } from './actions'

export function LoginForm() {
  const { dispatch } = useAuth()
  const { mutate, isLoading } = useMutation<LoginFormValues, { token: string }>(
    login,
    {
      onSuccess: data => {
        const user = jwtDecode(data.token) as User
        dispatch({ type: 'SET_AUTH', payload: { token: data.token, user } })
      },
      onError: error => {
        toast.error(error)
      }
    }
  )
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      username: '',
      password: ''
    }
  })

  async function onSubmit(values: LoginFormValues) {
    await mutate(values)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Use one of the username from this{' '}
          <Link
            to="https://fakestoreapi.com/users"
            className="text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
          >
            users
          </Link>{' '}
          list. Admin user: username - donero, password - ewedon
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input placeholder="donero" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="ewedon"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <LoadingButton isLoading={isLoading}>Login</LoadingButton>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

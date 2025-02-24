import { AxiosError } from 'axios'
import { useState } from 'react'

type MutationFn<TArgs, TData> = (args: TArgs) => Promise<TData>

type MutationResult<TArgs> = {
  isLoading: boolean
  mutate: (args: TArgs) => Promise<void>
}

type MutationOptions<TData> = {
  onSuccess?: (data: TData) => void
  onError?: (error: string) => void
}

export const useMutation = <TArgs, TData>(
  mutationFn: MutationFn<TArgs, TData>,
  opts?: MutationOptions<TData>
): MutationResult<TArgs> => {
  const [loading, setLoading] = useState(false)

  const mutate = async (args: TArgs) => {
    setLoading(true)

    try {
      const data = await mutationFn(args)

      if (opts?.onSuccess) opts.onSuccess(data)
    } catch (err) {
      const errorMsg =
        err instanceof AxiosError
          ? err.response?.data
          : err instanceof Error
            ? err.message
            : 'Something went wrong!'
      if (opts?.onError) opts.onError(errorMsg)
    } finally {
      setLoading(false)
    }
  }

  return {
    isLoading: loading,
    mutate
  }
}

// const { isLoading, mutate } = useMutation(login, {
//   onSuccess: (data) => {}
//   onError: (error) => {}
// })
// const login = async (loginData) => {
//   const { data } = await axios.post('/login', loginData)
//   return data
// }
// mutate({ username, password })

import { AxiosError } from 'axios'
import { mutationReducer, MutationState } from './mutationReducer'
import { useReducer } from 'react'

type MutationFn<TArgs, TData> = (args: TArgs) => Promise<TData>

type MutationResult<TArgs, TData> = MutationState<TData> & {
  mutate: (args: TArgs) => Promise<void>
}

type MutationOptions<TData> = {
  onSuccess?: (data: TData) => void
  onError?: (error: string) => void
}

export const useMutation = <TArgs, TData>(
  mutationFn: MutationFn<TArgs, TData>,
  opts?: MutationOptions<TData>
): MutationResult<TArgs, TData> => {
  const [state, dispatch] = useReducer(mutationReducer<TData>, {
    isLoading: false
  })

  const mutate = async (args: TArgs) => {
    dispatch({ type: 'MUTATION_START' })

    try {
      const data = await mutationFn(args)
      dispatch({ type: 'MUTATION_SUCCESS', payload: data })

      if (opts?.onSuccess) opts.onSuccess(data)
    } catch (err) {
      const errorMsg =
        err instanceof AxiosError
          ? err.response?.data
          : err instanceof Error
            ? err.message
            : 'Something went wrong!'
      dispatch({
        type: 'MUTATION_ERROR',
        payload: errorMsg
      })
      if (opts?.onError) opts.onError(errorMsg)
    }
  }

  return {
    ...state,
    mutate
  }
}

// const { isLoading } = useMutation(login, {
//   onSuccess: (data) => {}
//   onError: (error) => {}
// })
// const login = async (loginData) => {
//   const { data } = await axios.post('/login', loginData)
//   return data
// }

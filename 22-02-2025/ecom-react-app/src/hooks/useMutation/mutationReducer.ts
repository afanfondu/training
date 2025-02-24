export type MutationState<TData> = {
  isLoading: boolean
  isError?: boolean
  data?: TData
  error?: string
}

type MutationAction<TData> =
  | { type: 'MUTATION_START' }
  | { type: 'MUTATION_SUCCESS'; payload: TData }
  | { type: 'MUTATION_ERROR'; payload: string }

export const mutationReducer = <TData>(
  state: MutationState<TData>,
  action: MutationAction<TData>
): MutationState<TData> => {
  switch (action.type) {
    case 'MUTATION_START':
      return { isLoading: true }

    case 'MUTATION_SUCCESS':
      return { isLoading: false, isError: false, data: action.payload }

    case 'MUTATION_ERROR':
      return { isLoading: false, isError: true, error: action.payload }
  }
}

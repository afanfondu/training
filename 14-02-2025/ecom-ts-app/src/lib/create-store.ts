import config from './config'

const appName = config.appName.toLowerCase().replace(' ', '-')

type GetState<S> = () => S
type SetState<S> = (newState: Partial<S>) => void

type Store<S, A> = {
  _state: S
  get: GetState<S>
  set: SetState<S>
} & A

type StoreCallback<S, A> = (
  set: SetState<S>,
  get: GetState<S>
) => { _state: S } & A

/*
 * const count = createStore((set, get) => ({
 *  _state: { count: 0, products: [] },
 *  increment: () => set({ count: get().count + 1 })
 *  fetchProducts: async () => set({ products })
 * }))
 */
const createStore = <S, A>(
  callback: StoreCallback<S, A>,
  persist: string | null = null
) => {
  let store = { _state: null } as Store<S, A>

  const set: SetState<S> = newState => {
    store._state = { ...store._state, ...newState }

    if (persist) {
      localStorage.setItem(
        `${appName}-${persist}`,
        JSON.stringify(store._state)
      )
    }
  }

  const get = () => {
    return store._state
  }

  const newStore = callback(set, get)
  store = {
    ...store,
    get,
    set,
    ...newStore
  }

  if (persist) {
    const value = localStorage.getItem(`${appName}-${persist}`)
    store._state = value ? JSON.parse(value) : newStore._state
  }

  return store
}

export default createStore

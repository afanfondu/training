import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios'
import config from '@lib/config'

export type APIResponse<T = any> = {
  isError: boolean
  data?: T
  error?: AxiosError | null
}

const api: AxiosInstance = axios.create({
  baseURL: config.apiUrl,
  headers: {
    'Content-Type': 'application/json'
  }
})

api.interceptors.response.use(
  (data: AxiosResponse): any => ({
    isError: false,
    data: data.data
  }),
  (error: AxiosError) => ({ isError: true, error })
)

export default api

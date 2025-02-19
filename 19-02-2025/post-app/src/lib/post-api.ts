import { PostFormData } from '@/components/post-form'
import { Post } from '../lib/types'

interface APIResponse<T> {
  data?: T
  error?: Error
}

export const getPosts = async (): Promise<APIResponse<Post[]>> => {
  const res = await fetch(
    'https://jsonplaceholder.typicode.com/posts?_limit=12'
  )
  if (!res.ok)
    return { error: new Error('Something went wrong while fetching posts!') }
  return { data: await res.json() }
}

export const createPost = async (
  formData: PostFormData
): Promise<APIResponse<Post>> => {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  })
  if (!res.ok)
    return { error: new Error('Something went wrong while creating post!') }
  return { data: await res.json() }
}

export const deletePost = async (
  postId: number
): Promise<APIResponse<Post>> => {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${postId}`,
    { method: 'DELETE' }
  )
  if (!res.ok)
    return { error: new Error('Something went wrong while deleting post!') }
  return { data: await res.json() }
}

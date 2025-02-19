import { getPosts } from '@/lib/post-api'
import { Post } from '@/lib/types'
import { useEffect, useState } from 'react'
import PostForm from './components/post-form'
import AlertError from '@/components/alert-error'
import PostCard from './components/post-card'
import PostsLoading from './components/posts-loading'

const App = () => {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    ;(async () => {
      const { error, data } = await getPosts()
      setLoading(false)
      if (error) {
        setError(error)
        return
      }

      setPosts(data!)
    })()
  }, [])

  const addNewPost = (newPost: Post) => {
    setPosts(prevPosts => [newPost, ...prevPosts])
  }

  const removePost = (postId: number) => {
    setPosts(prevPosts => prevPosts.filter(post => post.id !== postId))
  }

  return (
    <div className="space-y-12 p-4">
      <h1 className="text-3xl text-center">Posts App</h1>
      <PostForm addNewPost={addNewPost} />

      <section className="max-w-6xl flex flex-wrap mx-auto space-x-4 space-y-4">
        {loading && <PostsLoading />}
        {error && <AlertError>{error.message}</AlertError>}
        {posts.map(post => (
          <PostCard key={post.id} post={post} removePost={removePost} />
        ))}
      </section>
    </div>
  )
}

export default App

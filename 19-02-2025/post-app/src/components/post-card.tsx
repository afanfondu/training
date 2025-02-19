import { Post } from '@/lib/types'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useTransition } from 'react'
import { toast } from 'sonner'
import { deletePost } from '@/lib/post-api'

type Props = {
  post: Post
  removePost: (postId: number) => void
}

const PostCard = ({ post, removePost }: Props) => {
  const [isPending, startTransition] = useTransition()

  const handleDelete = () => {
    const confirmDelete = confirm('Are you sure you want to delete this post?')
    if (!confirmDelete) return

    startTransition(async () => {
      const { error } = await deletePost(post.id)
      if (error) {
        toast.error(error.message)
        return
      }

      toast.success(`Post-${post.id} deleted successfully!`)
      removePost(post.id)
    })
  }

  return (
    <Card className="min-w-80 flex-1">
      <CardHeader>
        <CardTitle className="text-lg">{post.title}</CardTitle>
      </CardHeader>
      <CardContent className="text-muted-foreground">{post.body}</CardContent>
      <CardFooter>
        <Button
          onClick={handleDelete}
          variant="destructive"
          className="mt-4"
          disabled={isPending}
        >
          {isPending ? 'Deleting...' : 'Delete'}
        </Button>
      </CardFooter>
    </Card>
  )
}

export default PostCard

import { Skeleton } from '@/components/ui/skeleton'

const PostsLoading = () => {
  return Array.from({ length: 6 }).map((_, index) => (
    <PostSkeleton key={index} />
  ))
}

function PostSkeleton() {
  return (
    <div className="flex flex-col space-y-4 min-w-80 flex-1">
      <Skeleton className="h-8 rounded-xl" />
      <div className="space-y-2 mb-8">
        <Skeleton className="h-36" />
        <Skeleton className="h-6 w-[100px]" />
      </div>
    </div>
  )
}

export default PostsLoading

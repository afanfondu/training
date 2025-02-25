import { Skeleton } from '@/components/ui/skeleton'

export default function CategoryListSkeleton() {
  return Array.from({ length: 5 }).map((_, i) => (
    <Skeleton key={i} className="h-9 w-28" />
  ))
}

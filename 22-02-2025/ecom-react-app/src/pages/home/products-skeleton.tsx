import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export default function ProductsSkeleton() {
  return (
    <>
      <div className="flex justify-end">
        <Skeleton className="w-[180px] h-10 mb-8" />
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <Card key={i}>
            <CardContent className="pt-4">
              <Skeleton className="aspect-square w-full" />
              <Skeleton className="mt-4 h-4 w-2/3" />
            </CardContent>
            <CardFooter>
              <Skeleton className="h-4 w-20" />
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  )
}

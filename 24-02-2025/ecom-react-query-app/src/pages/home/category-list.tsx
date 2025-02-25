import { useSearchParams } from 'react-router'
import { cn } from '@/lib/utils'
import useCategories from '@/hooks/useCategories'
import { Button } from '@/components/ui/button'
import CategoryListSkeleton from './category-list-skeleton'

export default function CategoryList() {
  const { data: categories, isLoading } = useCategories()
  const [searchParams, setSearchParams] = useSearchParams()
  const activeCategory = searchParams.get('category')

  const handleCategoryClick = (category: string | null) => {
    if (category) {
      setSearchParams({ category })
    } else {
      searchParams.delete('category')
      setSearchParams(searchParams)
    }
  }

  return (
    <div className="container py-8">
      <div className="flex flex-col gap-6">
        <div className="flex gap-4 border-b pb-4 overflow-x-auto">
          {isLoading ? (
            <CategoryListSkeleton />
          ) : (
            <>
              <Button
                variant="ghost"
                onClick={() => handleCategoryClick(null)}
                className={cn(
                  'text-sm font-medium whitespace-nowrap',
                  !activeCategory && 'bg-primary/10'
                )}
              >
                All Products
              </Button>
              {categories?.map((cat: string) => (
                <Button
                  key={cat}
                  variant="ghost"
                  onClick={() => handleCategoryClick(cat)}
                  className={cn(
                    'text-sm font-medium capitalize whitespace-nowrap',
                    activeCategory === cat && 'bg-primary/10'
                  )}
                >
                  {cat}
                </Button>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

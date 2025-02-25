import ProductsSkeleton from './products-skeleton'
import ProductCard from './product-card'
import AlertError from '@/components/shared/alert-error'
import useProducts from '@/hooks/useProducts'
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router'

const categories = [
  'All products',
  'electronics',
  'jewelery',
  "men's clothing",
  "women's clothing"
]

export default function HomePage() {
  const navigate = useNavigate()
  const { data: products, isLoading, isError, error } = useProducts()
  if (isLoading) return <ProductsSkeleton />

  if (isError) return <AlertError description={error.message} />

  return (
    <div>
      <div className="mb-8 flex justify-end">
        <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
          {categories.map(category => (
            <Button
              key={category}
              variant="outline"
              onClick={() => {
                if (category == 'All products') navigate('/')
                else navigate(`/category/${category}`)
              }}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products?.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}

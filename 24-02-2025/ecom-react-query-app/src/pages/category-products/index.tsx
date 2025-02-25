import { Category } from '@/lib/types'
import AlertError from '@/components/shared/alert-error'
import { useNavigate, useParams } from 'react-router'
import ProductCard from '../home/product-card'
import ProductsSkeleton from '../home/products-skeleton'
import useCatagoryProducts from '@/hooks/useProductsCategory'
import { Button } from '@/components/ui/button'

const categories = [
  'All products',
  'electronics',
  'jewelery',
  "men's clothing",
  "women's clothing"
]

export default function CategoryProducts() {
  const { category } = useParams<{ category: Category }>()
  const navigate = useNavigate()
  if (!category) navigate('/')

  const {
    data: products,
    isLoading,
    isError,
    error
  } = useCatagoryProducts(category!)
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

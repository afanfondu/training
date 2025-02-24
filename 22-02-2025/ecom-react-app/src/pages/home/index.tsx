import { useProducts } from '@/contexts/products-context'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import ProductsSkeleton from './products-skeleton'
import { Category } from '@/lib/types'
import { useState } from 'react'
import ProductCard from './product-card'
import AlertError from '@/components/shared/alert-error'

export default function HomePage() {
  const { products, isLoading, error } = useProducts()
  const [category, setCategory] = useState<Category | 'all'>('all')

  if (isLoading) return <ProductsSkeleton />

  if (error) return <AlertError description={error} />

  const filteredProducts = products.filter(product => {
    if (category === 'all') return true
    return product.category === category
  })

  return (
    <div>
      <div className="mb-8 flex justify-end">
        <Select
          value={category}
          onValueChange={category => setCategory(category as Category)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Category</SelectItem>
            {Object.values(Category).map(category => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}

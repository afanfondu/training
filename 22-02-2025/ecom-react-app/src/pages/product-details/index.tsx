import { Button } from '@/components/ui/button'
import { useCart } from '@/contexts/cart-context'
import { useProducts } from '@/contexts/products-context'
import { useNavigate, useParams } from 'react-router'
import ProductDetailsSkeleton from './product-details-skeleton'
import { ChevronsLeft } from 'lucide-react'
import { toast } from 'sonner'

export default function ProductDetailsPage() {
  const navigate = useNavigate()
  const { productId } = useParams()
  const { products, isLoading } = useProducts()
  const { cartItems, dispatch } = useCart()

  if (isLoading) return <ProductDetailsSkeleton />

  const product = products.find(p => p.id === Number(productId))
  if (!product) return <div>Product not found</div>

  const addToCart = () => {
    const itemExists = cartItems.find(item => item.product.id === product.id)
    if (itemExists) return toast.info('Product already in cart')

    dispatch({ type: 'ADD_TO_CART', payload: { product, quantity: 1 } })
    toast.success('Product added to cart')
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Button variant="outline" className="mb-8" onClick={() => navigate(-1)}>
        <ChevronsLeft /> Back
      </Button>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="relative aspect-square overflow-hidden rounded-lg">
          <img
            src={product.image}
            alt={product.title}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold">{product.title}</h1>
          <p className="text-2xl font-semibold">${product.price}</p>
          <p className="text-muted-foreground">{product.description}</p>
          <div className="mt-auto">
            <Button className="w-full" onClick={addToCart}>
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

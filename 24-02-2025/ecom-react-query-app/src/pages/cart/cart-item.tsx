import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useCart } from '@/context/cart-context'
import { CartItem as TCartItem } from '@/lib/types'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from '@/components/ui/select'
import { Trash2 } from 'lucide-react'

const MAX_QUANTITY = 5

export default function CartItem({ item }: { item: TCartItem }) {
  const { dispatch } = useCart()
  const { product, quantity } = item

  return (
    <Card key={product.id} className="p-4">
      <div className="flex gap-4">
        <img
          src={product.image}
          alt={product.title}
          className="h-24 w-24 object-contain"
        />
        <div className="flex-1 space-y-2">
          <h3 className="font-medium">{product.title}</h3>
          <p className="text-sm text-muted-foreground">${product.price}</p>
          <div className="flex items-center gap-4">
            <Select
              value={quantity.toString()}
              onValueChange={value =>
                dispatch({
                  type: 'UPDATE_QUANTITY',
                  payload: {
                    productId: product.id,
                    updatedQuantity: parseInt(value)
                  }
                })
              }
            >
              <SelectTrigger className="w-20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: MAX_QUANTITY }, (_, i) => i + 1).map(
                  num => (
                    <SelectItem key={num} value={num.toString()}>
                      {num}
                    </SelectItem>
                  )
                )}
              </SelectContent>
            </Select>
            <Button
              variant="destructive"
              size="sm"
              onClick={() =>
                dispatch({
                  type: 'REMOVE_FROM_CART',
                  payload: { productId: product.id }
                })
              }
            >
              <Trash2 />
            </Button>
          </div>
        </div>
        <div className="text-right">
          <p className="font-medium">
            ${(product.price * quantity).toFixed(2)}
          </p>
        </div>
      </div>
    </Card>
  )
}

import { TableRow, TableCell } from '@/components/ui/table'
import { useMutation } from '@/hooks/useMutation'
import { Product } from '@/lib/types'
import { Trash2 } from 'lucide-react'
import { deleteProduct } from './actions'
import { LoadingButton } from '@/components/shared/loading-button'
import { useProducts } from '@/contexts/products-context'
import { toast } from 'sonner'

export default function ProductsTableRow({ product }: { product: Product }) {
  const { dispatch } = useProducts()
  const { mutate, isLoading } = useMutation<string, Product>(deleteProduct, {
    onSuccess: () => {
      dispatch({ type: 'DELETE_PRODUCT', payload: { productId: product.id } })
    },
    onError: error => {
      toast.error(error)
    }
  })

  const deleteHandler = async () => {
    const deleteConfirm = confirm(
      'Are you sure you want to delete this product?'
    )
    if (!deleteConfirm) return

    await mutate(product.id.toString())
  }

  return (
    <TableRow key={product.id}>
      <TableCell>
        <img
          src={product.image}
          alt={product.title}
          className="w-16 h-16 object-contain"
        />
      </TableCell>
      <TableCell>{product.title}</TableCell>
      <TableCell>${product.price}</TableCell>
      <TableCell>{product.category}</TableCell>
      <TableCell>
        <LoadingButton
          onClick={deleteHandler}
          variant={'destructive'}
          isLoading={isLoading}
        >
          <Trash2 className="h-4 w-4" />
        </LoadingButton>
      </TableCell>
    </TableRow>
  )
}

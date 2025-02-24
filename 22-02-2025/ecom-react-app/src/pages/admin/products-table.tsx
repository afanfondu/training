import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { useProducts } from '@/contexts/products-context'
import ProductsTableRow from './products-table-row'

export function ProductsTable() {
  const { products } = useProducts()

  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Image</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map(product => (
            <ProductsTableRow key={product.id} product={product} />
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

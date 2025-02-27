import { Button } from '@/components/ui/button'
import { ProductsTable } from './products-table'
import { AddProductDialog, ProductProp } from './add-product-dialog'
import { useEffect, useState } from 'react'
import { useAuth } from '@/context/auth-context'
import { useNavigate } from 'react-router'

const defaultValues = {
  title: '',
  description: '',
  price: undefined,
  category: undefined,
  image: ''
}

export default function AdminPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] =
    useState<ProductProp>(defaultValues)
  const { auth } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!auth.user || auth.user.user !== 'donero') navigate('/')
  }, [auth, navigate])

  return (
    <div className="container py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Products Management</h1>
        <Button
          onClick={() => {
            setSelectedProduct(defaultValues)
            setIsDialogOpen(true)
          }}
        >
          Add New Product
        </Button>
      </div>
      <ProductsTable
        setIsDialogOpen={setIsDialogOpen}
        setSelectedProduct={setSelectedProduct}
      />
      <AddProductDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        selectedProduct={selectedProduct}
      />
    </div>
  )
}

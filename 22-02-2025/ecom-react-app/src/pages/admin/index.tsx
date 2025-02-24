import { Button } from '@/components/ui/button'
import { ProductsTable } from './products-table'
import { AddProductDialog } from './add-product-dialog'
import { useEffect, useState } from 'react'
import { useAuth } from '@/contexts/auth-context'
import { useNavigate } from 'react-router'

export default function AdminPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const { state } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!state.user || state.user.user !== 'donero') navigate('/')
  }, [state, navigate])

  return (
    <div className="container py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Products Management</h1>
        <Button onClick={() => setIsDialogOpen(true)}>Add New Product</Button>
      </div>
      <ProductsTable />
      <AddProductDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
    </div>
  )
}

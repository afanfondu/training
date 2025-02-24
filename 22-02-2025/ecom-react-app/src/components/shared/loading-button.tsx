import React from 'react'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'

type LoadingButtonProps = {
  isLoading?: boolean
  children: React.ReactNode
} & React.ButtonHTMLAttributes<HTMLButtonElement>

export function LoadingButton({
  isLoading = false,
  children,
  disabled,
  ...props
}: LoadingButtonProps) {
  return (
    <Button disabled={isLoading || disabled} {...props}>
      {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : children}
    </Button>
  )
}

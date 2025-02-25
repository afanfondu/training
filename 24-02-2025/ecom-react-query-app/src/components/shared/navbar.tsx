import { Button } from '@/components/ui/button'
import ThemeToggle from '@/components/shared/theme-toggle'
import { Sheet, SheetTrigger, SheetContent } from '@/components/ui/sheet'
import { Link, NavLink, NavLinkProps, Outlet } from 'react-router'
import { MenuIcon } from 'lucide-react'
import { useAuth } from '@/context/auth-context'
import { cn } from '@/lib/utils'

export default function Component() {
  const { setAuth, auth } = useAuth()
  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-white dark:border-gray-800 dark:bg-gray-950">
        <div className="container mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:px-6">
          <Link to="/" className="flex items-center gap-2">
            <h3 className="text-xl font-bold">E.</h3>
          </Link>

          <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
            <ActiveLink to="/">Home</ActiveLink>
            <ActiveLink to="/cart">Cart</ActiveLink>
            {auth.user && auth.user.user === 'donero' && (
              <ActiveLink to="/admin">Admin</ActiveLink>
            )}
          </nav>

          <div className="flex items-center gap-4">
            <ThemeToggle />

            {auth.user ? (
              <>
                <p>{auth.user.user}</p>
                <Button onClick={() => setAuth({ token: null, user: null })}>
                  Logout
                </Button>
              </>
            ) : (
              <Link to="/login">
                <Button>Login</Button>
              </Link>
            )}

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <MenuIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="md:hidden">
                <div className="grid gap-4 p-4">
                  <ActiveLink to="/">Home</ActiveLink>
                  <ActiveLink to="/cart">Cart</ActiveLink>
                  <ActiveLink to="/admin">Admin</ActiveLink>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <main className="container py-8 max-w-6xl px-4 mx-auto">
        <Outlet />
      </main>
    </>
  )
}

export function ActiveLink({
  children,
  className,
  ...props
}: {
  children: React.ReactNode
  className?: string
} & NavLinkProps) {
  return (
    <NavLink
      {...props}
      className={({ isActive }) =>
        cn(
          'transition-colors',
          isActive
            ? 'text-primary font-medium'
            : 'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50',
          className
        )
      }
    >
      {children}
    </NavLink>
  )
}

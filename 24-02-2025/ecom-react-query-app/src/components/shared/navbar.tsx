import { Button } from '@/components/ui/button'
import ThemeToggle from '@/components/shared/theme-toggle'
import { Sheet, SheetTrigger, SheetContent } from '@/components/ui/sheet'
import { Link, NavLink, Outlet } from 'react-router'
import { MenuIcon } from 'lucide-react'
import { useAuth } from '@/context/auth-context'

export default function Component() {
  const { setAuth, auth } = useAuth()
  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-white dark:border-gray-800 dark:bg-gray-950">
        <div className="container mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:px-6">
          <NavLink to="/" className="flex items-center gap-2">
            <h3 className="text-xl font-bold">E.</h3>
          </NavLink>

          <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
            <NavLink
              to="/"
              className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
            >
              Home
            </NavLink>
            <NavLink
              to="/cart"
              className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
            >
              Cart
            </NavLink>
            {auth.user && auth.user.user === 'donero' && (
              <NavLink
                to="/admin"
                className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              >
                Admin
              </NavLink>
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
                  <NavLink
                    to="/"
                    className="text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                  >
                    Home
                  </NavLink>
                  <NavLink
                    to="/cart"
                    className="text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                  >
                    Cart
                  </NavLink>
                  <NavLink
                    to="/admin"
                    className="text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                  >
                    Admin
                  </NavLink>
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

'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import { Menu, X, LogOut, Leaf, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Logo } from '@/components/logo'
import { useEco } from '@/lib/store'
import { NAV_ITEMS, MOBILE_ITEMS } from './nav-items'

export function AppShell({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const { state, hydrated, logout } = useEco()
  const [drawer, setDrawer] = useState(false)

  useEffect(() => {
    if (hydrated && !state.authed) router.replace('/login')
  }, [hydrated, state.authed, router])

  useEffect(() => {
    setDrawer(false)
  }, [pathname])

  function handleLogout() {
    logout()
    router.replace('/')
  }

  if (!hydrated || !state.authed) {
    return (
      <div className="flex min-h-dvh items-center justify-center bg-background">
        <Loader2 className="size-6 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="min-h-dvh bg-background lg:grid lg:grid-cols-[16rem_1fr]">
      {/* Desktop sidebar */}
      <aside className="sticky top-0 hidden h-dvh flex-col border-r border-sidebar-border bg-sidebar p-4 text-sidebar-foreground lg:flex">
        <div className="px-2 py-2">
          <Link href="/dashboard">
            <Logo invert />
          </Link>
        </div>
        <div className="mx-2 mt-4 rounded-2xl bg-sidebar-accent p-4">
          <p className="text-xs text-sidebar-foreground/70">EcoPuntos disponibles</p>
          <p className="mt-1 font-display text-2xl font-bold text-sidebar-foreground">
            {state.points.toLocaleString('es-PE')}
          </p>
          <p className="mt-0.5 flex items-center gap-1 text-xs text-primary">
            <Leaf className="size-3" /> Nivel {state.level} · Eco Guardián
          </p>
        </div>
        <nav className="mt-4 flex-1 space-y-1 overflow-y-auto">
          {NAV_ITEMS.map((item) => {
            const active = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors',
                  active
                    ? 'bg-primary text-primary-foreground'
                    : 'text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-foreground',
                )}
              >
                <item.icon className="size-4.5" />
                {item.label}
              </Link>
            )
          })}
        </nav>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-sidebar-foreground/80 transition-colors hover:bg-sidebar-accent hover:text-sidebar-foreground"
        >
          <LogOut className="size-4.5" />
          Cerrar sesión
        </button>
      </aside>

      {/* Mobile top bar */}
      <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-background/90 px-4 backdrop-blur lg:hidden">
        <Link href="/dashboard">
          <Logo />
        </Link>
        <div className="flex items-center gap-3">
          <span className="rounded-full bg-secondary px-3 py-1 text-sm font-semibold text-primary">
            {state.points.toLocaleString('es-PE')} pts
          </span>
          <button
            onClick={() => setDrawer(true)}
            aria-label="Abrir menú"
            className="flex size-9 items-center justify-center rounded-xl border border-border text-foreground"
          >
            <Menu className="size-5" />
          </button>
        </div>
      </header>

      {/* Mobile drawer */}
      {drawer && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-foreground/40 backdrop-blur-sm"
            onClick={() => setDrawer(false)}
          />
          <div className="absolute right-0 top-0 flex h-full w-72 flex-col bg-sidebar p-4 text-sidebar-foreground animate-in slide-in-from-right">
            <div className="flex items-center justify-between px-2">
              <Logo invert />
              <button
                onClick={() => setDrawer(false)}
                aria-label="Cerrar menú"
                className="flex size-9 items-center justify-center rounded-xl text-sidebar-foreground"
              >
                <X className="size-5" />
              </button>
            </div>
            <nav className="mt-6 flex-1 space-y-1 overflow-y-auto">
              {NAV_ITEMS.map((item) => {
                const active = pathname === item.href
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      'flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-colors',
                      active
                        ? 'bg-primary text-primary-foreground'
                        : 'text-sidebar-foreground/80 hover:bg-sidebar-accent',
                    )}
                  >
                    <item.icon className="size-5" />
                    {item.label}
                  </Link>
                )
              })}
            </nav>
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-sidebar-foreground/80 hover:bg-sidebar-accent"
            >
              <LogOut className="size-5" />
              Cerrar sesión
            </button>
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="flex min-h-dvh flex-col">
        <main className="flex-1 px-4 py-6 pb-24 sm:px-6 lg:px-8 lg:pb-8">{children}</main>
      </div>

      {/* Mobile bottom nav */}
      <nav className="fixed inset-x-0 bottom-0 z-30 flex items-center justify-around border-t border-border bg-background/95 px-2 py-2 backdrop-blur lg:hidden">
        {MOBILE_ITEMS.map((item) => {
          const active = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex flex-1 flex-col items-center gap-1 rounded-lg py-1.5 text-[11px] font-medium transition-colors',
                active ? 'text-primary' : 'text-muted-foreground',
              )}
            >
              <item.icon className={cn('size-5', active && 'stroke-[2.4]')} />
              {item.label}
            </Link>
          )
        })}
      </nav>
    </div>
  )
}

import Link from 'next/link'
import { Leaf, Recycle, Gift } from 'lucide-react'
import { Logo } from '@/components/logo'

const PANEL_POINTS = [
  { icon: Recycle, text: 'Registra cada material reciclado en segundos' },
  { icon: Gift, text: 'Canjea tus puntos por recompensas reales' },
  { icon: Leaf, text: 'Mide tu impacto ambiental en tiempo real' },
]

export function AuthShell({
  title,
  subtitle,
  children,
}: {
  title: string
  subtitle: string
  children: React.ReactNode
}) {
  return (
    <div className="grid min-h-dvh lg:grid-cols-2">
      <aside className="relative hidden flex-col justify-between bg-sidebar p-10 text-sidebar-foreground lg:flex">
        <Link href="/">
          <Logo invert />
        </Link>
        <div>
          <h2 className="max-w-sm text-balance font-display text-3xl font-bold leading-tight">
            Cada residuo que reciclas es un paso hacia un planeta más limpio.
          </h2>
          <ul className="mt-8 space-y-4">
            {PANEL_POINTS.map((p) => (
              <li key={p.text} className="flex items-center gap-3">
                <span className="flex size-9 items-center justify-center rounded-xl bg-sidebar-accent text-primary">
                  <p.icon className="size-4.5" />
                </span>
                <span className="text-sm text-sidebar-foreground/85">{p.text}</span>
              </li>
            ))}
          </ul>
        </div>
        <p className="text-xs text-sidebar-foreground/60">
          ODS 12 · Producción y Consumo Responsables
        </p>
      </aside>

      <main className="flex flex-col items-center justify-center px-4 py-10 sm:px-6">
        <div className="w-full max-w-sm">
          <div className="mb-8 lg:hidden">
            <Link href="/">
              <Logo />
            </Link>
          </div>
          <h1 className="font-display text-2xl font-bold tracking-tight">{title}</h1>
          <p className="mt-1.5 text-sm text-muted-foreground">{subtitle}</p>
          <div className="mt-8">{children}</div>
        </div>
      </main>
    </div>
  )
}

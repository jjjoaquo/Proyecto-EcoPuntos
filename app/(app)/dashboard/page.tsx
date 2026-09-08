'use client'

import Link from 'next/link'
import {
  Recycle,
  Coins,
  Package,
  Leaf,
  ArrowRight,
  Truck,
  Gift,
  MapPin,
  Milk,
  Wind,
} from 'lucide-react'
import { PageHeader } from '@/components/app/page-header'
import { WeeklyChart } from '@/components/app/weekly-chart'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useEco } from '@/lib/store'

const QUICK_ACTIONS = [
  { href: '/recycle', label: 'Registrar reciclaje', icon: Recycle },
  { href: '/pickup', label: 'Solicitar recojo', icon: Truck },
  { href: '/points', label: 'Ver puntos', icon: MapPin },
  { href: '/rewards', label: 'Canjear premios', icon: Gift },
]

export default function DashboardPage() {
  const { state } = useEco()

  const nextLevel = 2000
  const progress = Math.min((state.points / nextLevel) * 100, 100)

  const stats = [
    {
      label: 'EcoPuntos',
      value: state.points.toLocaleString('es-PE'),
      icon: Coins,
      hint: 'Disponibles para canjear',
    },
    {
      label: 'Total reciclado',
      value: `${state.kg} kg`,
      icon: Package,
      hint: `${state.deliveries} entregas`,
    },
    {
      label: 'CO₂ evitado',
      value: `${state.co2} kg`,
      icon: Wind,
      hint: 'Huella reducida',
    },
    {
      label: 'Recompensas',
      value: state.rewardsRedeemed,
      icon: Gift,
      hint: 'Canjeadas hasta hoy',
    },
  ]

  return (
    <div className="mx-auto w-full max-w-6xl">
      <PageHeader
        title={`Hola, ${state.name.split(' ')[0]} 👋`}
        description="Este es el resumen de tu impacto ambiental."
        action={
          <Button asChild className="gap-2">
            <Link href="/recycle">
              <Recycle className="size-4" /> Registrar reciclaje
            </Link>
          </Button>
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((s) => (
          <Card key={s.label}>
            <CardContent className="p-5">
              <span className="flex size-10 items-center justify-center rounded-xl bg-secondary text-primary">
                <s.icon className="size-5" />
              </span>
              <p className="mt-4 font-display text-2xl font-bold tracking-tight">{s.value}</p>
              <p className="text-sm font-medium text-foreground">{s.label}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">{s.hint}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        {/* Chart */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex-row items-center justify-between">
            <div>
              <CardTitle>Reciclaje semanal</CardTitle>
              <p className="text-sm text-muted-foreground">Kilos reciclados por semana</p>
            </div>
            <Badge variant="success">
              <Leaf className="size-3" /> En crecimiento
            </Badge>
          </CardHeader>
          <CardContent>
            <WeeklyChart />
          </CardContent>
        </Card>

        {/* Level progress */}
        <Card>
          <CardHeader>
            <CardTitle>Tu nivel</CardTitle>
            <p className="text-sm text-muted-foreground">Nivel {state.level} · Eco Guardián</p>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between text-sm">
              <span className="font-semibold text-primary">
                {state.points.toLocaleString('es-PE')} pts
              </span>
              <span className="text-muted-foreground">{nextLevel.toLocaleString('es-PE')} pts</span>
            </div>
            <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-muted">
              <div className="h-full rounded-full bg-primary" style={{ width: `${progress}%` }} />
            </div>
            <p className="mt-3 text-sm text-muted-foreground">
              Te faltan{' '}
              <span className="font-semibold text-foreground">
                {Math.max(nextLevel - state.points, 0).toLocaleString('es-PE')} puntos
              </span>{' '}
              para alcanzar el siguiente nivel.
            </p>
            <div className="mt-5 grid grid-cols-2 gap-3">
              <div className="rounded-xl bg-secondary/60 p-3">
                <Milk className="size-4 text-primary" />
                <p className="mt-1.5 font-display text-lg font-bold">{state.bottles}</p>
                <p className="text-xs text-muted-foreground">Botellas recuperadas</p>
              </div>
              <div className="rounded-xl bg-secondary/60 p-3">
                <Package className="size-4 text-primary" />
                <p className="mt-1.5 font-display text-lg font-bold">{state.deliveries}</p>
                <p className="text-xs text-muted-foreground">Entregas realizadas</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick actions */}
      <h2 className="mb-3 mt-8 font-display text-lg font-semibold">Acciones rápidas</h2>
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {QUICK_ACTIONS.map((a) => (
          <Link
            key={a.href}
            href={a.href}
            className="group flex items-center justify-between rounded-2xl border border-border bg-card p-5 shadow-sm transition-colors hover:border-primary/40 hover:bg-secondary/40"
          >
            <span className="flex items-center gap-3">
              <span className="flex size-10 items-center justify-center rounded-xl bg-secondary text-primary">
                <a.icon className="size-5" />
              </span>
              <span className="text-sm font-medium">{a.label}</span>
            </span>
            <ArrowRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
          </Link>
        ))}
      </div>

      {/* Recent activity */}
      <div className="mb-3 mt-8 flex items-center justify-between">
        <h2 className="font-display text-lg font-semibold">Actividad reciente</h2>
        <Button asChild variant="ghost" size="sm" className="gap-1">
          <Link href="/history">
            Ver todo <ArrowRight className="size-4" />
          </Link>
        </Button>
      </div>
      <Card>
        <CardContent className="divide-y divide-border p-0">
          {state.activities.slice(0, 4).map((a) => (
            <div key={a.id} className="flex items-center justify-between gap-3 p-4">
              <div className="flex items-center gap-3">
                <span className="flex size-9 items-center justify-center rounded-xl bg-secondary text-primary">
                  <Recycle className="size-4" />
                </span>
                <div>
                  <p className="text-sm font-medium">{a.material}</p>
                  <p className="text-xs text-muted-foreground">
                    {a.date} · {a.place}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p
                  className={`text-sm font-semibold ${a.points < 0 ? 'text-destructive' : 'text-primary'}`}
                >
                  {a.points > 0 ? '+' : ''}
                  {a.points} pts
                </p>
                {a.weight > 0 && (
                  <p className="text-xs text-muted-foreground">{a.weight} kg</p>
                )}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}

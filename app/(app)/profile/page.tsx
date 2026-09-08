'use client'

import { useRouter } from 'next/navigation'
import {
  Mail,
  MapPin,
  Cake,
  Leaf,
  Package,
  Wind,
  Gift,
  LogOut,
  RotateCcw,
  Award,
} from 'lucide-react'
import { PageHeader } from '@/components/app/page-header'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useEco } from '@/lib/store'
import { useToast } from '@/components/toast'

export default function ProfilePage() {
  const router = useRouter()
  const { state, logout, reset } = useEco()
  const { toast } = useToast()

  const initials = state.name
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')

  const details = [
    { icon: Mail, label: 'Correo', value: state.email },
    { icon: Cake, label: 'Edad', value: `${state.age} años` },
    { icon: MapPin, label: 'Ubicación', value: state.location },
  ]

  const impact = [
    { icon: Package, label: 'Total reciclado', value: `${state.kg} kg` },
    { icon: Wind, label: 'CO₂ evitado', value: `${state.co2} kg` },
    { icon: Leaf, label: 'Botellas recuperadas', value: state.bottles },
    { icon: Gift, label: 'Recompensas canjeadas', value: state.rewardsRedeemed },
  ]

  function handleLogout() {
    logout()
    router.replace('/')
  }

  function handleReset() {
    reset()
    toast({ type: 'info', title: 'Datos restablecidos', description: 'Se restauró la cuenta demo.' })
  }

  return (
    <div className="mx-auto w-full max-w-4xl">
      <PageHeader title="Mi perfil" description="Tu información y tu impacto ambiental acumulado." />

      <div className="grid gap-6 lg:grid-cols-[1fr_1.4fr]">
        {/* Identity card */}
        <Card>
          <CardContent className="flex flex-col items-center p-6 text-center">
            <span className="flex size-20 items-center justify-center rounded-3xl bg-primary font-display text-2xl font-bold text-primary-foreground">
              {initials}
            </span>
            <h2 className="mt-4 font-display text-xl font-bold">{state.name}</h2>
            <Badge variant="success" className="mt-2">
              <Award className="size-3" /> Nivel {state.level} · Eco Guardián
            </Badge>
            <span className="mt-4 w-full rounded-2xl bg-secondary/60 p-4">
              <span className="block text-xs text-muted-foreground">EcoPuntos actuales</span>
              <span className="mt-1 block font-display text-3xl font-bold text-primary">
                {state.points.toLocaleString('es-PE')}
              </span>
            </span>

            <div className="mt-6 w-full space-y-3 text-left">
              {details.map((d) => (
                <div key={d.label} className="flex items-center gap-3">
                  <span className="flex size-9 items-center justify-center rounded-xl bg-secondary text-primary">
                    <d.icon className="size-4.5" />
                  </span>
                  <div>
                    <p className="text-xs text-muted-foreground">{d.label}</p>
                    <p className="text-sm font-medium">{d.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          {/* Impact */}
          <div>
            <h3 className="mb-3 font-display font-semibold">Mi impacto ambiental</h3>
            <div className="grid grid-cols-2 gap-4">
              {impact.map((i) => (
                <Card key={i.label}>
                  <CardContent className="p-5">
                    <span className="flex size-10 items-center justify-center rounded-xl bg-secondary text-primary">
                      <i.icon className="size-5" />
                    </span>
                    <p className="mt-3 font-display text-2xl font-bold">{i.value}</p>
                    <p className="text-xs text-muted-foreground">{i.label}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Contribution note */}
          <Card className="bg-secondary/40">
            <CardContent className="flex items-start gap-3 p-5">
              <Leaf className="mt-0.5 size-5 shrink-0 text-primary" />
              <p className="text-sm text-secondary-foreground">
                Gracias a tu constancia has evitado la emisión de{' '}
                <span className="font-semibold">{state.co2} kg de CO₂</span>, contribuyendo
                directamente al ODS 12: Producción y Consumo Responsables.
              </p>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button onClick={handleReset} variant="outline" className="gap-2">
              <RotateCcw className="size-4" /> Restablecer datos demo
            </Button>
            <Button onClick={handleLogout} variant="ghost" className="gap-2 text-destructive hover:bg-destructive/10 hover:text-destructive">
              <LogOut className="size-4" /> Cerrar sesión
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

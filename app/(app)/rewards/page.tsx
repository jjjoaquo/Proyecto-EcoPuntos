'use client'

import { useState } from 'react'
import { Coffee, Tag, Sprout, Ticket, Coins, Lock, Check, Loader2, type LucideIcon } from 'lucide-react'
import { PageHeader } from '@/components/app/page-header'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { REWARDS } from '@/lib/data'
import { useEco } from '@/lib/store'
import { useToast } from '@/components/toast'

const ICONS: Record<string, LucideIcon> = {
  coffee: Coffee,
  tag: Tag,
  sprout: Sprout,
  ticket: Ticket,
}

export default function RewardsPage() {
  const { state, redeemReward } = useEco()
  const { toast } = useToast()
  const [pending, setPending] = useState<string | null>(null)

  function handleRedeem(id: string, points: number, name: string) {
    setPending(id)
    setTimeout(() => {
      const ok = redeemReward(id, points, name)
      if (ok) {
        toast({
          type: 'success',
          title: '¡Recompensa canjeada!',
          description: `Canjeaste "${name}" por ${points} puntos.`,
        })
      } else {
        toast({
          type: 'error',
          title: 'Puntos insuficientes',
          description: `Necesitas ${points - state.points} puntos más para esta recompensa.`,
        })
      }
      setPending(null)
    }, 600)
  }

  return (
    <div className="mx-auto w-full max-w-6xl">
      <PageHeader
        title="Recompensas"
        description="Canjea tus EcoPuntos por beneficios de nuestros aliados sostenibles."
      />

      {/* Balance banner */}
      <Card className="mb-6 border-primary/30 bg-sidebar text-sidebar-foreground">
        <CardContent className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <span className="flex size-12 items-center justify-center rounded-2xl bg-primary/20 text-primary">
              <Coins className="size-6" />
            </span>
            <div>
              <p className="text-sm text-sidebar-foreground/70">Saldo disponible</p>
              <p className="font-display text-3xl font-bold">
                {state.points.toLocaleString('es-PE')} <span className="text-lg">pts</span>
              </p>
            </div>
          </div>
          <p className="text-sm text-sidebar-foreground/70">
            Has canjeado{' '}
            <span className="font-semibold text-sidebar-foreground">{state.rewardsRedeemed}</span>{' '}
            recompensas hasta ahora.
          </p>
        </CardContent>
      </Card>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {REWARDS.map((r) => {
          const Icon = ICONS[r.icon] ?? Coins
          const affordable = state.points >= r.points
          const isPending = pending === r.id
          return (
            <Card key={r.id} className="flex flex-col">
              <CardContent className="flex flex-1 flex-col p-6">
                <span className="flex size-12 items-center justify-center rounded-2xl bg-secondary text-primary">
                  <Icon className="size-6" />
                </span>
                <h3 className="mt-4 font-semibold">{r.name}</h3>
                <p className="mt-1.5 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {r.description}
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="font-display text-lg font-bold text-primary">
                    {r.points.toLocaleString('es-PE')} pts
                  </span>
                </div>
                {!affordable && (
                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-primary/60"
                      style={{ width: `${Math.min((state.points / r.points) * 100, 100)}%` }}
                    />
                  </div>
                )}
                <Button
                  onClick={() => handleRedeem(r.id, r.points, r.name)}
                  disabled={!affordable || isPending}
                  variant={affordable ? 'default' : 'secondary'}
                  className="mt-4 w-full gap-2"
                >
                  {isPending ? (
                    <Loader2 className="size-4 animate-spin" />
                  ) : affordable ? (
                    <Check className="size-4" />
                  ) : (
                    <Lock className="size-4" />
                  )}
                  {isPending ? 'Canjeando...' : affordable ? 'Canjear' : 'Puntos insuficientes'}
                </Button>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}

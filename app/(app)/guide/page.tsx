'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Recycle, Check, Lightbulb, ArrowRight, CircleCheckBig } from 'lucide-react'
import { PageHeader } from '@/components/app/page-header'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { MATERIALS } from '@/lib/data'

export default function GuidePage() {
  const [selectedId, setSelectedId] = useState(MATERIALS[0].id)
  const selected = MATERIALS.find((m) => m.id === selectedId)!

  return (
    <div className="mx-auto w-full max-w-6xl">
      <PageHeader
        title="Guía de materiales"
        description="Aprende qué reciclar, cómo prepararlo y cuántos puntos ganas por cada kilo."
      />

      <div className="grid gap-6 lg:grid-cols-[20rem_1fr]">
        {/* Material list */}
        <div className="flex gap-3 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0">
          {MATERIALS.map((m) => {
            const active = m.id === selectedId
            return (
              <button
                key={m.id}
                onClick={() => setSelectedId(m.id)}
                className={cn(
                  'flex min-w-[9rem] flex-1 items-center gap-3 rounded-2xl border p-4 text-left transition-colors lg:min-w-0',
                  active
                    ? 'border-primary bg-secondary/60'
                    : 'border-border bg-card hover:border-primary/40',
                )}
              >
                <span
                  className="flex size-10 shrink-0 items-center justify-center rounded-xl"
                  style={{ backgroundColor: m.color.replace(')', ' / 0.14)') }}
                >
                  <Recycle className="size-5" style={{ color: m.color }} />
                </span>
                <div>
                  <p className="font-semibold">{m.name}</p>
                  <p className="text-xs text-primary">{m.pointsPerKg} pts / kg</p>
                </div>
              </button>
            )
          })}
        </div>

        {/* Detail */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-4">
                <span
                  className="flex size-14 items-center justify-center rounded-2xl"
                  style={{ backgroundColor: selected.color.replace(')', ' / 0.14)') }}
                >
                  <Recycle className="size-7" style={{ color: selected.color }} />
                </span>
                <div>
                  <h2 className="font-display text-2xl font-bold">{selected.name}</h2>
                  <p className="font-semibold text-primary">
                    {selected.pointsPerKg} puntos por kilo
                  </p>
                </div>
              </div>
            </div>

            <p className="mt-5 text-pretty leading-relaxed text-muted-foreground">
              {selected.description}
            </p>

            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              <div>
                <h3 className="flex items-center gap-2 text-sm font-semibold">
                  <CircleCheckBig className="size-4 text-primary" /> Qué se acepta
                </h3>
                <ul className="mt-3 space-y-2">
                  {selected.examples.map((ex) => (
                    <li key={ex} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Check className="size-4 shrink-0 text-primary" /> {ex}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="flex items-center gap-2 text-sm font-semibold">
                  <Lightbulb className="size-4 text-warning-foreground" /> Recomendaciones
                </h3>
                <ul className="mt-3 space-y-2">
                  {selected.tips.map((tip) => (
                    <li key={tip} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span className="mt-0 size-1.5 shrink-0 rounded-full bg-primary" /> {tip}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-3 rounded-2xl bg-secondary/50 p-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-secondary-foreground">
                ¿Listo para reciclar {selected.name.toLowerCase()}?
              </p>
              <Button asChild size="sm" className="gap-2">
                <Link href="/recycle">
                  Registrar reciclaje <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

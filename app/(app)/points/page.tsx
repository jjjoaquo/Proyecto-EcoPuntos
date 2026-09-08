'use client'

import { useState } from 'react'
import Link from 'next/link'
import { MapPin, Clock, Navigation, Recycle, Truck } from 'lucide-react'
import { PageHeader } from '@/components/app/page-header'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { POINTS, getMaterial } from '@/lib/data'

export default function PointsPage() {
  const [selectedId, setSelectedId] = useState(POINTS[0].id)
  const selected = POINTS.find((p) => p.id === selectedId)!

  return (
    <div className="mx-auto w-full max-w-6xl">
      <PageHeader
        title="Puntos de reciclaje"
        description="Encuentra el punto más cercano y revisa qué materiales aceptan."
        action={
          <Button asChild variant="outline" className="gap-2">
            <Link href="/pickup">
              <Truck className="size-4" /> Solicitar recojo
            </Link>
          </Button>
        }
      />

      <div className="grid gap-6 lg:grid-cols-[1fr_22rem]">
        {/* Map */}
        <Card className="overflow-hidden">
          <div className="relative h-[22rem] w-full bg-secondary/40 sm:h-[28rem]">
            {/* stylized abstract map background */}
            <svg
              className="absolute inset-0 size-full text-primary/10"
              aria-hidden
              preserveAspectRatio="none"
            >
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
            <div className="absolute left-6 top-6 h-1.5 w-28 rounded-full bg-primary/20" />
            <div className="absolute left-10 top-16 h-1.5 w-40 rounded-full bg-primary/15" />
            <div className="absolute bottom-20 right-10 h-1.5 w-32 rounded-full bg-primary/15" />

            {POINTS.map((p) => {
              const active = p.id === selectedId
              return (
                <button
                  key={p.id}
                  onClick={() => setSelectedId(p.id)}
                  style={{ left: `${p.x}%`, top: `${p.y}%` }}
                  className="absolute -translate-x-1/2 -translate-y-full"
                  aria-label={p.name}
                >
                  <span
                    className={cn(
                      'flex flex-col items-center transition-transform',
                      active ? 'scale-110' : 'hover:scale-105',
                    )}
                  >
                    <span
                      className={cn(
                        'flex size-9 items-center justify-center rounded-full border-2 border-background shadow-md',
                        active ? 'bg-primary text-primary-foreground' : 'bg-card text-primary',
                      )}
                    >
                      <MapPin className="size-4.5" />
                    </span>
                    {active && (
                      <span className="mt-1 whitespace-nowrap rounded-full bg-foreground px-2 py-0.5 text-[11px] font-medium text-background">
                        {p.district}
                      </span>
                    )}
                  </span>
                </button>
              )
            })}
          </div>
          {/* selected detail bar */}
          <CardContent className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-semibold">{selected.name}</p>
              <p className="text-sm text-muted-foreground">{selected.address}</p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary">
                <Navigation className="size-3" /> {selected.distanceKm} km
              </Badge>
              <Button size="sm" className="gap-1.5">
                <Navigation className="size-4" /> Cómo llegar
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* List */}
        <div className="space-y-3">
          {POINTS.map((p) => {
            const active = p.id === selectedId
            return (
              <button
                key={p.id}
                onClick={() => setSelectedId(p.id)}
                className={cn(
                  'w-full rounded-2xl border p-4 text-left transition-colors',
                  active ? 'border-primary bg-secondary/50' : 'border-border bg-card hover:border-primary/40',
                )}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="flex size-9 items-center justify-center rounded-xl bg-secondary text-primary">
                      <MapPin className="size-4.5" />
                    </span>
                    <div>
                      <p className="text-sm font-semibold">{p.district}</p>
                      <p className="text-xs text-muted-foreground">{p.address}</p>
                    </div>
                  </div>
                  <Badge variant="muted">{p.distanceKm} km</Badge>
                </div>
                <p className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Clock className="size-3.5" /> {p.schedule}
                </p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {p.materials.map((mId) => (
                    <span
                      key={mId}
                      className="inline-flex items-center gap-1 rounded-full bg-secondary px-2 py-0.5 text-[11px] font-medium text-secondary-foreground"
                    >
                      <Recycle className="size-3" />
                      {getMaterial(mId)?.name}
                    </span>
                  ))}
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

'use client'

import { useState } from 'react'
import { Recycle, Gift, CheckCircle2, Clock, Inbox } from 'lucide-react'
import { PageHeader } from '@/components/app/page-header'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { useEco } from '@/lib/store'

type Filter = 'todos' | 'reciclaje' | 'canjes'

const FILTERS: { id: Filter; label: string }[] = [
  { id: 'todos', label: 'Todos' },
  { id: 'reciclaje', label: 'Reciclaje' },
  { id: 'canjes', label: 'Canjes' },
]

export default function HistoryPage() {
  const { state } = useEco()
  const [filter, setFilter] = useState<Filter>('todos')

  const items = state.activities.filter((a) => {
    if (filter === 'reciclaje') return a.points > 0
    if (filter === 'canjes') return a.points < 0
    return true
  })

  return (
    <div className="mx-auto w-full max-w-3xl">
      <PageHeader
        title="Historial de actividad"
        description="Revisa todos tus reciclajes y canjes registrados."
      />

      <div className="mb-5 flex gap-2">
        {FILTERS.map((f) => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            className={cn(
              'rounded-full px-4 py-1.5 text-sm font-medium transition-colors',
              filter === f.id
                ? 'bg-primary text-primary-foreground'
                : 'bg-secondary text-secondary-foreground hover:bg-accent',
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      {items.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center gap-3 p-10 text-center">
            <span className="flex size-12 items-center justify-center rounded-2xl bg-secondary text-primary">
              <Inbox className="size-6" />
            </span>
            <p className="text-sm text-muted-foreground">No hay registros en esta categoría.</p>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="divide-y divide-border p-0">
            {items.map((a) => {
              const isRedeem = a.points < 0
              return (
                <div key={a.id} className="flex items-center justify-between gap-3 p-4">
                  <div className="flex items-center gap-3">
                    <span
                      className={cn(
                        'flex size-10 items-center justify-center rounded-xl',
                        isRedeem ? 'bg-accent text-accent-foreground' : 'bg-secondary text-primary',
                      )}
                    >
                      {isRedeem ? <Gift className="size-5" /> : <Recycle className="size-5" />}
                    </span>
                    <div>
                      <p className="text-sm font-medium">{a.material}</p>
                      <p className="text-xs text-muted-foreground">
                        {a.date} · {a.place}
                        {a.weight > 0 && ` · ${a.weight} kg`}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <p
                      className={cn(
                        'text-sm font-semibold',
                        isRedeem ? 'text-destructive' : 'text-primary',
                      )}
                    >
                      {a.points > 0 ? '+' : ''}
                      {a.points} pts
                    </p>
                    <Badge variant={a.status === 'Validado' ? 'success' : 'warning'}>
                      {a.status === 'Validado' ? (
                        <CheckCircle2 className="size-3" />
                      ) : (
                        <Clock className="size-3" />
                      )}
                      {a.status}
                    </Badge>
                  </div>
                </div>
              )
            })}
          </CardContent>
        </Card>
      )}
    </div>
  )
}

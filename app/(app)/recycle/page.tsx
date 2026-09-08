'use client'

import { useState } from 'react'
import { Recycle, Coins, Check, Loader2 } from 'lucide-react'
import { PageHeader } from '@/components/app/page-header'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import { MATERIALS, POINTS, getMaterial } from '@/lib/data'
import { useEco } from '@/lib/store'
import { useToast } from '@/components/toast'

export default function RecyclePage() {
  const { addRecycle } = useEco()
  const { toast } = useToast()
  const [materialId, setMaterialId] = useState(MATERIALS[0].id)
  const [weight, setWeight] = useState('')
  const [place, setPlace] = useState(POINTS[0].district)
  const [loading, setLoading] = useState(false)

  const material = getMaterial(materialId)!
  const weightNum = Number.parseFloat(weight) || 0
  const estimated = Math.round(weightNum * material.pointsPerKg)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (weightNum <= 0) return
    setLoading(true)
    setTimeout(() => {
      const res = addRecycle({ materialId, weight: weightNum, place })
      toast({
        type: 'success',
        title: `+${res.points} EcoPuntos`,
        description: `Registraste ${weightNum} kg de ${res.material.toLowerCase()}.`,
      })
      setWeight('')
      setLoading(false)
    }, 700)
  }

  return (
    <div className="mx-auto w-full max-w-3xl">
      <PageHeader
        title="Registrar reciclaje"
        description="Selecciona el material, indica el peso y suma tus EcoPuntos."
      />

      <form onSubmit={handleSubmit} className="grid gap-4">
        {/* Material selection */}
        <Card>
          <CardContent className="p-5">
            <Label className="mb-3 block">Tipo de material</Label>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
              {MATERIALS.map((m) => {
                const active = m.id === materialId
                return (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setMaterialId(m.id)}
                    className={cn(
                      'flex flex-col items-center gap-2 rounded-2xl border p-3 transition-colors',
                      active ? 'border-primary bg-secondary/60' : 'border-border hover:border-primary/40',
                    )}
                  >
                    <span
                      className="flex size-10 items-center justify-center rounded-xl"
                      style={{ backgroundColor: m.color.replace(')', ' / 0.14)') }}
                    >
                      <Recycle className="size-5" style={{ color: m.color }} />
                    </span>
                    <span className="text-xs font-semibold">{m.name}</span>
                    <span className="text-[11px] text-primary">{m.pointsPerKg} pts/kg</span>
                  </button>
                )
              })}
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-4 sm:grid-cols-2">
          <Card>
            <CardContent className="p-5">
              <Label htmlFor="weight" className="mb-2 block">
                Peso aproximado (kg)
              </Label>
              <Input
                id="weight"
                type="number"
                min="0"
                step="0.1"
                inputMode="decimal"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder="Ej. 2.5"
              />
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-5">
              <Label htmlFor="place" className="mb-2 block">
                Punto de entrega
              </Label>
              <select
                id="place"
                value={place}
                onChange={(e) => setPlace(e.target.value)}
                className="flex h-11 w-full rounded-xl border border-input bg-card px-3.5 text-sm shadow-sm focus-visible:border-ring focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/25"
              >
                {POINTS.map((p) => (
                  <option key={p.id} value={p.district}>
                    {p.district}
                  </option>
                ))}
              </select>
            </CardContent>
          </Card>
        </div>

        {/* Estimate */}
        <Card className="border-primary/30 bg-secondary/40">
          <CardContent className="flex items-center justify-between p-5">
            <div className="flex items-center gap-3">
              <span className="flex size-11 items-center justify-center rounded-xl bg-primary/15 text-primary">
                <Coins className="size-5.5" />
              </span>
              <div>
                <p className="text-sm text-muted-foreground">Puntos estimados</p>
                <p className="font-display text-2xl font-bold text-primary">+{estimated} pts</p>
              </div>
            </div>
            <p className="max-w-[10rem] text-right text-xs text-muted-foreground">
              {weightNum > 0
                ? `${weightNum} kg × ${material.pointsPerKg} pts`
                : 'Ingresa un peso para calcular'}
            </p>
          </CardContent>
        </Card>

        <Button type="submit" size="lg" disabled={loading || weightNum <= 0} className="gap-2">
          {loading ? <Loader2 className="size-4 animate-spin" /> : <Check className="size-4" />}
          {loading ? 'Registrando...' : 'Confirmar reciclaje'}
        </Button>
      </form>
    </div>
  )
}

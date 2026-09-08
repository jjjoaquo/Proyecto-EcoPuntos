'use client'

import { useState } from 'react'
import { Truck, Loader2, Check, Clock, MapPin, Package } from 'lucide-react'
import { PageHeader } from '@/components/app/page-header'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { MATERIALS } from '@/lib/data'
import { useEco } from '@/lib/store'
import { useToast } from '@/components/toast'

const SCHEDULES = ['8:00 – 11:00', '11:00 – 14:00', '14:00 – 17:00', '17:00 – 20:00']

const selectClass =
  'flex h-11 w-full rounded-xl border border-input bg-card px-3.5 text-sm shadow-sm focus-visible:border-ring focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/25'

export default function PickupPage() {
  const { state, addPickup } = useEco()
  const { toast } = useToast()
  const [address, setAddress] = useState('')
  const [date, setDate] = useState('')
  const [schedule, setSchedule] = useState(SCHEDULES[0])
  const [material, setMaterial] = useState(MATERIALS[0].name)
  const [amount, setAmount] = useState('')
  const [comments, setComments] = useState('')
  const [loading, setLoading] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      const pickup = addPickup({ address, date, schedule, material, amount, comments })
      toast({
        type: 'success',
        title: 'Recojo solicitado',
        description: `Tu código es ${pickup.code}. Te contactaremos pronto.`,
      })
      setAddress('')
      setDate('')
      setAmount('')
      setComments('')
      setLoading(false)
    }, 800)
  }

  return (
    <div className="mx-auto w-full max-w-4xl">
      <PageHeader
        title="Solicitar recojo a domicilio"
        description="Programa la recolección de tus reciclables sin salir de casa."
      />

      <div className="grid gap-6 lg:grid-cols-[1fr_20rem]">
        <Card>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="grid gap-5">
              <div className="flex flex-col gap-2">
                <Label htmlFor="address">Dirección de recojo</Label>
                <Input
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Av. Ejemplo 123, distrito"
                  required
                />
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="date">Fecha preferida</Label>
                  <Input
                    id="date"
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="schedule">Horario</Label>
                  <select
                    id="schedule"
                    value={schedule}
                    onChange={(e) => setSchedule(e.target.value)}
                    className={selectClass}
                  >
                    {SCHEDULES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="material">Material principal</Label>
                  <select
                    id="material"
                    value={material}
                    onChange={(e) => setMaterial(e.target.value)}
                    className={selectClass}
                  >
                    {MATERIALS.map((m) => (
                      <option key={m.id} value={m.name}>
                        {m.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="amount">Cantidad aproximada</Label>
                  <Input
                    id="amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Ej. 2 bolsas grandes"
                    required
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="comments">Comentarios (opcional)</Label>
                <Textarea
                  id="comments"
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                  placeholder="Referencias, indicaciones para el recojo, etc."
                />
              </div>

              <Button type="submit" size="lg" disabled={loading} className="gap-2">
                {loading ? <Loader2 className="size-4 animate-spin" /> : <Truck className="size-4" />}
                {loading ? 'Enviando solicitud...' : 'Solicitar recojo'}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Sidebar: how it works + requests */}
        <div className="space-y-4">
          <Card className="bg-secondary/40">
            <CardContent className="p-5">
              <h3 className="font-semibold">Cómo funciona el recojo</h3>
              <ul className="mt-3 space-y-3 text-sm text-muted-foreground">
                <li className="flex gap-2">
                  <Check className="size-4 shrink-0 text-primary" /> Completa el formulario con tus datos.
                </li>
                <li className="flex gap-2">
                  <Check className="size-4 shrink-0 text-primary" /> Un recolector confirmará tu solicitud.
                </li>
                <li className="flex gap-2">
                  <Check className="size-4 shrink-0 text-primary" /> Recibe tus EcoPuntos tras la validación.
                </li>
              </ul>
            </CardContent>
          </Card>

          <div>
            <h3 className="mb-3 font-display font-semibold">Mis solicitudes</h3>
            {state.pickups.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center gap-2 p-6 text-center">
                  <span className="flex size-11 items-center justify-center rounded-xl bg-secondary text-primary">
                    <Package className="size-5" />
                  </span>
                  <p className="text-sm text-muted-foreground">
                    Aún no tienes solicitudes de recojo.
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-3">
                {state.pickups.map((p) => (
                  <Card key={p.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-sm font-semibold">{p.code}</span>
                        <Badge variant="warning">
                          <Clock className="size-3" /> {p.status}
                        </Badge>
                      </div>
                      <p className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
                        <MapPin className="size-3.5" /> {p.address}
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {p.material} · {p.amount} · {p.date || 'Fecha por confirmar'} · {p.schedule}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

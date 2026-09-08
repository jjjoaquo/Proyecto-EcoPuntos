'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Eye, EyeOff, Loader2 } from 'lucide-react'
import { AuthShell } from '@/components/auth/auth-shell'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useEco } from '@/lib/store'
import { useToast } from '@/components/toast'
import { DEMO_EMAIL, DEMO_PASSWORD } from '@/lib/data'

export default function LoginPage() {
  const router = useRouter()
  const { login } = useEco()
  const { toast } = useToast()
  const [email, setEmail] = useState(DEMO_EMAIL)
  const [password, setPassword] = useState(DEMO_PASSWORD)
  const [show, setShow] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    setTimeout(() => {
      const res = login(email, password)
      if (res.ok) {
        toast({ type: 'success', title: '¡Bienvenido de nuevo!', description: 'Sesión iniciada correctamente.' })
        router.push('/dashboard')
      } else {
        setError(res.error ?? 'No se pudo iniciar sesión.')
        setLoading(false)
      }
    }, 600)
  }

  return (
    <AuthShell title="Inicia sesión" subtitle="Accede a tu cuenta y sigue sumando EcoPuntos.">
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div className="rounded-xl border border-primary/20 bg-secondary/60 p-3 text-xs text-secondary-foreground">
          <p className="font-semibold">Cuenta demo</p>
          <p className="mt-0.5 text-muted-foreground">
            {DEMO_EMAIL} · contraseña: {DEMO_PASSWORD}
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="email">Correo electrónico</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="tucorreo@ejemplo.com"
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="password">Contraseña</Label>
          <div className="relative">
            <Input
              id="password"
              type={show ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••"
              required
              className="pr-10"
            />
            <button
              type="button"
              onClick={() => setShow((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
              aria-label={show ? 'Ocultar contraseña' : 'Mostrar contraseña'}
            >
              {show ? <EyeOff className="size-4.5" /> : <Eye className="size-4.5" />}
            </button>
          </div>
        </div>

        {error && (
          <p role="alert" className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">
            {error}
          </p>
        )}

        <Button type="submit" size="lg" disabled={loading} className="gap-2">
          {loading && <Loader2 className="size-4 animate-spin" />}
          {loading ? 'Ingresando...' : 'Iniciar sesión'}
        </Button>

        <p className="text-center text-sm text-muted-foreground">
          ¿No tienes cuenta?{' '}
          <Link href="/register" className="font-semibold text-primary hover:underline">
            Regístrate
          </Link>
        </p>
      </form>
    </AuthShell>
  )
}

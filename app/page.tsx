import Link from 'next/link'
import Image from 'next/image'
import {
  ArrowRight,
  Recycle,
  Gift,
  MapPin,
  Leaf,
  TrendingUp,
  Sparkles,
  Truck,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Logo } from '@/components/logo'
import { MATERIALS, REWARDS } from '@/lib/data'

const STEPS = [
  {
    icon: MapPin,
    title: 'Encuentra un punto',
    text: 'Ubica el punto de reciclaje más cercano o solicita un recojo a domicilio.',
  },
  {
    icon: Recycle,
    title: 'Recicla tus materiales',
    text: 'Entrega plástico, papel, cartón, vidrio o metal debidamente separados.',
  },
  {
    icon: Sparkles,
    title: 'Suma puntos',
    text: 'Cada kilo reciclado se convierte en puntos según el tipo de material.',
  },
  {
    icon: Gift,
    title: 'Canjea recompensas',
    text: 'Usa tus puntos en café, descuentos, kits ecológicos y más beneficios.',
  },
]

export default function LandingPage() {
  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
          <Logo />
          <nav className="hidden items-center gap-8 md:flex">
            <a href="#como-funciona" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
              Cómo funciona
            </a>
            <a href="#materiales" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
              Materiales
            </a>
            <a href="#recompensas" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
              Recompensas
            </a>
          </nav>
          <div className="flex items-center gap-2">
            <Button asChild variant="ghost" className="hidden sm:inline-flex">
              <Link href="/login">Iniciar sesión</Link>
            </Button>
            <Button asChild>
              <Link href="/register">Comenzar</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="mx-auto grid w-full max-w-6xl items-center gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 md:py-20">
            <div className="flex flex-col gap-6">
              <span className="inline-flex w-fit items-center gap-2 rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-secondary-foreground">
                <Leaf className="size-3.5" />
                ODS 12 · Producción y Consumo Responsables
              </span>
              <h1 className="text-balance font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
                Recicla, suma puntos y{' '}
                <span className="text-primary">genera impacto</span>
              </h1>
              <p className="max-w-md text-pretty text-lg leading-relaxed text-muted-foreground">
                EcoPuntos convierte tus residuos reciclables en puntos y recompensas
                mientras contribuyes al cuidado del planeta. Reciclar nunca fue tan
                gratificante.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg" className="gap-2">
                  <Link href="/register">
                    Crear cuenta gratis
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href="/login">Ya tengo cuenta</Link>
                </Button>
              </div>
              <div className="mt-2 flex items-center gap-6 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <TrendingUp className="size-4 text-primary" /> +2.4 t recicladas
                </span>
                <span className="flex items-center gap-1.5">
                  <Recycle className="size-4 text-primary" /> 5 materiales
                </span>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 -z-10 rounded-[2.5rem] bg-secondary/60 blur-2xl" />
              <Image
                src="/hero-recycle.png"
                alt="Persona reciclando materiales en contenedores inteligentes"
                width={720}
                height={720}
                priority
                className="w-full rounded-3xl border border-border/60 bg-card shadow-sm"
              />
            </div>
          </div>
        </section>

        {/* How it works */}
        <section id="como-funciona" className="border-y border-border/60 bg-card/50">
          <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-balance font-display text-3xl font-bold tracking-tight sm:text-4xl">
                Cómo funciona
              </h2>
              <p className="mt-3 text-pretty text-muted-foreground">
                Cuatro pasos simples para transformar tus residuos en beneficios reales.
              </p>
            </div>
            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {STEPS.map((s, i) => (
                <div
                  key={s.title}
                  className="relative rounded-2xl border border-border bg-card p-6 shadow-sm"
                >
                  <span className="absolute right-5 top-5 font-display text-sm font-semibold text-muted-foreground/40">
                    0{i + 1}
                  </span>
                  <span className="flex size-11 items-center justify-center rounded-xl bg-secondary text-primary">
                    <s.icon className="size-5.5" />
                  </span>
                  <h3 className="mt-4 text-lg font-semibold">{s.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                    {s.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Materials */}
        <section id="materiales" className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
            <div className="max-w-xl">
              <h2 className="text-balance font-display text-3xl font-bold tracking-tight sm:text-4xl">
                Materiales que puedes reciclar
              </h2>
              <p className="mt-3 text-pretty text-muted-foreground">
                Cada material tiene un valor distinto en puntos por kilo reciclado.
              </p>
            </div>
            <Button asChild variant="outline" className="gap-2">
              <Link href="/guide">
                Ver guía completa <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {MATERIALS.map((m) => (
              <div key={m.id} className="rounded-2xl border border-border bg-card p-5 shadow-sm">
                <span
                  className="flex size-10 items-center justify-center rounded-xl"
                  style={{ backgroundColor: `${m.color.replace(')', ' / 0.14)')}` }}
                  aria-hidden
                >
                  <Recycle className="size-5" style={{ color: m.color }} />
                </span>
                <h3 className="mt-4 font-semibold">{m.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  <span className="font-semibold text-primary">{m.pointsPerKg} pts</span> / kg
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Rewards */}
        <section id="recompensas" className="border-y border-border/60 bg-card/50">
          <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-balance font-display text-3xl font-bold tracking-tight sm:text-4xl">
                Recompensas que valen la pena
              </h2>
              <p className="mt-3 text-pretty text-muted-foreground">
                Canjea los puntos que acumulas por beneficios reales de nuestros aliados.
              </p>
            </div>
            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {REWARDS.map((r) => (
                <div key={r.id} className="flex flex-col rounded-2xl border border-border bg-card p-6 shadow-sm">
                  <span className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Gift className="size-5" />
                  </span>
                  <h3 className="mt-4 font-semibold">{r.name}</h3>
                  <p className="mt-1.5 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {r.description}
                  </p>
                  <p className="mt-4 font-display text-lg font-bold text-primary">
                    {r.points.toLocaleString('es-PE')} pts
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
          <div className="relative overflow-hidden rounded-3xl border border-border bg-sidebar px-6 py-12 text-sidebar-foreground sm:px-12 sm:py-16">
            <div className="grid items-center gap-8 md:grid-cols-2">
              <div>
                <h2 className="text-balance font-display text-3xl font-bold tracking-tight sm:text-4xl">
                  Únete al movimiento por una Lima más verde
                </h2>
                <p className="mt-4 max-w-md text-pretty leading-relaxed text-sidebar-foreground/80">
                  Recicla desde hoy, mide tu impacto ambiental y sé parte del cambio hacia
                  un consumo más responsable.
                </p>
                <div className="mt-8 flex items-center gap-3">
                  <Button asChild size="lg" className="gap-2">
                    <Link href="/register">
                      Comenzar ahora <Truck className="size-4" />
                    </Link>
                  </Button>
                </div>
              </div>
              <div className="relative hidden md:block">
                <Image
                  src="/eco-city.png"
                  alt="Ilustración de una ciudad sostenible"
                  width={560}
                  height={360}
                  className="w-full rounded-2xl border border-sidebar-border"
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border/60">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row sm:px-6">
          <Logo />
          <p className="text-center text-sm text-muted-foreground">
            EcoPuntos · Proyecto alineado al ODS 12 · Producción y Consumo Responsables
          </p>
        </div>
      </footer>
    </div>
  )
}

'use client'

import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from 'react'
import { CheckCircle2, XCircle, Info, X } from 'lucide-react'
import { cn } from '@/lib/utils'

type ToastType = 'success' | 'error' | 'info'
interface Toast {
  id: number
  type: ToastType
  title: string
  description?: string
}

interface ToastContextValue {
  toast: (t: Omit<Toast, 'id'>) => void
}

const ToastContext = createContext<ToastContextValue | null>(null)

const ICONS = {
  success: CheckCircle2,
  error: XCircle,
  info: Info,
}

const STYLES: Record<ToastType, string> = {
  success: 'border-success/30 [&_svg]:text-success',
  error: 'border-destructive/30 [&_svg]:text-destructive',
  info: 'border-primary/30 [&_svg]:text-primary',
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const dismiss = useCallback((id: number) => {
    setToasts((t) => t.filter((x) => x.id !== id))
  }, [])

  const toast = useCallback(
    (t: Omit<Toast, 'id'>) => {
      const id = Date.now() + Math.random()
      setToasts((prev) => [...prev, { ...t, id }])
      setTimeout(() => dismiss(id), 3800)
    },
    [dismiss],
  )

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="pointer-events-none fixed inset-x-0 bottom-4 z-[100] flex flex-col items-center gap-2 px-4 sm:bottom-6">
        {toasts.map((t) => {
          const Icon = ICONS[t.type]
          return (
            <div
              key={t.id}
              role="status"
              className={cn(
                'pointer-events-auto flex w-full max-w-sm items-start gap-3 rounded-2xl border bg-card p-4 shadow-lg animate-in slide-in-from-bottom-4 fade-in',
                STYLES[t.type],
              )}
            >
              <Icon className="mt-0.5 size-5 shrink-0" />
              <div className="flex-1">
                <p className="text-sm font-semibold text-card-foreground">{t.title}</p>
                {t.description && (
                  <p className="mt-0.5 text-sm text-muted-foreground">{t.description}</p>
                )}
              </div>
              <button
                onClick={() => dismiss(t.id)}
                className="text-muted-foreground transition-colors hover:text-foreground"
                aria-label="Cerrar notificación"
              >
                <X className="size-4" />
              </button>
            </div>
          )
        })}
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast debe usarse dentro de ToastProvider')
  return ctx
}

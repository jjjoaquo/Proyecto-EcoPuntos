import { Recycle } from 'lucide-react'
import { cn } from '@/lib/utils'

export function Logo({
  className,
  invert = false,
}: {
  className?: string
  invert?: boolean
}) {
  return (
    <span className={cn('inline-flex items-center gap-2', className)}>
      <span
        className={cn(
          'flex size-8 items-center justify-center rounded-xl',
          invert ? 'bg-primary text-primary-foreground' : 'bg-primary text-primary-foreground',
        )}
      >
        <Recycle className="size-5" />
      </span>
      <span
        className={cn(
          'font-display text-lg font-bold tracking-tight',
          invert ? 'text-sidebar-foreground' : 'text-foreground',
        )}
      >
        Eco<span className="text-primary">Puntos</span>
      </span>
    </span>
  )
}

'use client'

import { useEco } from '@/lib/store'

export function WeeklyChart() {
  const { state } = useEco()
  const max = Math.max(...state.weekly.map((w) => w.kg), 1)

  return (
    <div className="flex h-44 items-stretch justify-between gap-3">
      {state.weekly.map((w) => {
        const height = Math.max((w.kg / max) * 100, 6)
        return (
          <div key={w.label} className="flex h-full flex-1 flex-col items-center gap-2">
            <div className="flex w-full flex-1 items-end">
              <div
                className="w-full rounded-t-lg bg-primary/85 transition-all hover:bg-primary"
                style={{ height: `${height}%` }}
                title={`${w.kg} kg`}
              />
            </div>
            <span className="text-[11px] font-medium text-muted-foreground">{w.label}</span>
            <span className="-mt-1 text-[11px] font-semibold text-foreground">{w.kg} kg</span>
          </div>
        )
      })}
    </div>
  )
}

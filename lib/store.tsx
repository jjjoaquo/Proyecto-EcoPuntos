'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { Activity, EcoState, PickupRequest } from './types'
import {
  CO2_FACTOR,
  DEMO_EMAIL,
  DEMO_PASSWORD,
  INITIAL_STATE,
  getMaterial,
} from './data'

const STORAGE_KEY = 'ecopuntos_state_v1'

interface RecycleInput {
  materialId: string
  weight: number
  place: string
}

interface PickupInput {
  address: string
  date: string
  schedule: string
  material: string
  amount: string
  comments: string
}

interface EcoContextValue {
  state: EcoState
  hydrated: boolean
  login: (email: string, password: string) => { ok: boolean; error?: string }
  register: (name: string, email: string) => { ok: boolean; error?: string }
  logout: () => void
  addRecycle: (input: RecycleInput) => { points: number; material: string }
  redeemReward: (rewardId: string, points: number, name: string) => boolean
  addPickup: (input: PickupInput) => PickupRequest
  reset: () => void
}

const EcoContext = createContext<EcoContextValue | null>(null)

function todayLabel() {
  return new Date().toLocaleDateString('es-PE', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
}

export function EcoProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<EcoState>(INITIAL_STATE)
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) {
        setState({ ...INITIAL_STATE, ...JSON.parse(raw) })
      }
    } catch {
      // ignore corrupt storage
    }
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (!hydrated) return
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    } catch {
      // ignore quota errors
    }
  }, [state, hydrated])

  const login = useCallback((email: string, password: string) => {
    if (email.trim().toLowerCase() === DEMO_EMAIL && password === DEMO_PASSWORD) {
      setState((s) => ({ ...s, authed: true, email: DEMO_EMAIL, name: 'Diego Ramírez' }))
      return { ok: true }
    }
    return { ok: false, error: 'Credenciales incorrectas. Usa la cuenta demo.' }
  }, [])

  const register = useCallback((name: string, email: string) => {
    setState((s) => ({ ...s, authed: true, name: name || s.name, email: email || s.email }))
    return { ok: true }
  }, [])

  const logout = useCallback(() => {
    setState((s) => ({ ...s, authed: false }))
  }, [])

  const addRecycle = useCallback((input: RecycleInput) => {
    const material = getMaterial(input.materialId)
    const pointsPerKg = material?.pointsPerKg ?? 0
    const earned = Math.round(input.weight * pointsPerKg)
    const materialName = material?.name ?? input.materialId
    const co2 = Math.round(input.weight * CO2_FACTOR * 10) / 10
    const bottles = input.materialId === 'plastico' ? Math.round(input.weight * 10) : 0

    setState((s) => {
      const activity: Activity = {
        id: `a-${Date.now()}`,
        date: todayLabel(),
        material: materialName,
        weight: input.weight,
        points: earned,
        place: input.place,
        status: 'Validado',
      }
      const weekly = [...s.weekly]
      const last = weekly[weekly.length - 1]
      weekly[weekly.length - 1] = {
        ...last,
        kg: Math.round((last.kg + input.weight) * 10) / 10,
      }
      return {
        ...s,
        points: s.points + earned,
        kg: Math.round((s.kg + input.weight) * 10) / 10,
        deliveries: s.deliveries + 1,
        co2: Math.round((s.co2 + co2) * 10) / 10,
        bottles: s.bottles + bottles,
        weekly,
        activities: [activity, ...s.activities],
      }
    })

    return { points: earned, material: materialName }
  }, [])

  const redeemReward = useCallback(
    (_rewardId: string, points: number, name: string) => {
      let success = false
      setState((s) => {
        if (s.points < points) return s
        success = true
        const activity: Activity = {
          id: `r-${Date.now()}`,
          date: todayLabel(),
          material: `Canje: ${name}`,
          weight: 0,
          points: -points,
          place: 'Recompensas',
          status: 'Validado',
        }
        return {
          ...s,
          points: s.points - points,
          rewardsRedeemed: s.rewardsRedeemed + 1,
          activities: [activity, ...s.activities],
        }
      })
      return success
    },
    [],
  )

  const addPickup = useCallback((input: PickupInput) => {
    const pickup: PickupRequest = {
      id: `p-${Date.now()}`,
      code: `EP-${Math.floor(1000 + Math.random() * 9000)}`,
      address: input.address,
      date: input.date,
      schedule: input.schedule,
      material: input.material,
      amount: input.amount,
      comments: input.comments,
      status: 'Pendiente de validación',
    }
    setState((s) => ({ ...s, pickups: [pickup, ...s.pickups] }))
    return pickup
  }, [])

  const reset = useCallback(() => {
    setState(INITIAL_STATE)
  }, [])

  const value = useMemo<EcoContextValue>(
    () => ({
      state,
      hydrated,
      login,
      register,
      logout,
      addRecycle,
      redeemReward,
      addPickup,
      reset,
    }),
    [state, hydrated, login, register, logout, addRecycle, redeemReward, addPickup, reset],
  )

  return <EcoContext.Provider value={value}>{children}</EcoContext.Provider>
}

export function useEco() {
  const ctx = useContext(EcoContext)
  if (!ctx) throw new Error('useEco debe usarse dentro de EcoProvider')
  return ctx
}

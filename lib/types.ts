export type MaterialId = 'plastico' | 'papel' | 'carton' | 'vidrio' | 'metal'

export interface MaterialInfo {
  id: MaterialId
  name: string
  pointsPerKg: number
  color: string
  description: string
  examples: string[]
  tips: string[]
}

export interface RecyclePoint {
  id: string
  name: string
  district: string
  address: string
  distanceKm: number
  schedule: string
  materials: MaterialId[]
  x: number
  y: number
}

export interface Reward {
  id: string
  name: string
  description: string
  points: number
  icon: string
}

export type ActivityStatus = 'Validado' | 'Pendiente de validación'

export interface Activity {
  id: string
  date: string
  material: string
  weight: number
  points: number
  place: string
  status: ActivityStatus
}

export type PickupStatus = 'Pendiente de validación' | 'Confirmado'

export interface PickupRequest {
  id: string
  code: string
  address: string
  date: string
  schedule: string
  material: string
  amount: string
  comments: string
  status: PickupStatus
}

export interface EcoState {
  authed: boolean
  name: string
  email: string
  age: number
  location: string
  level: number
  points: number
  kg: number
  deliveries: number
  co2: number
  bottles: number
  rewardsRedeemed: number
  weekly: { label: string; kg: number }[]
  activities: Activity[]
  pickups: PickupRequest[]
}

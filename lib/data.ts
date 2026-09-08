import type { EcoState, MaterialInfo, RecyclePoint, Reward } from './types'

export const DEMO_EMAIL = 'demo@ecopuntos.pe'
export const DEMO_PASSWORD = '123456'

export const CO2_FACTOR = 0.66 // kg de CO2 evitado por kg reciclado

export const MATERIALS: MaterialInfo[] = [
  {
    id: 'plastico',
    name: 'Plástico',
    pointsPerKg: 50,
    color: 'oklch(0.62 0.15 150)',
    description:
      'Envases y botellas fabricados con polímeros. Uno de los residuos más comunes y de mayor impacto.',
    examples: ['Botellas PET', 'Envases de shampoo', 'Tapas plásticas', 'Bolsas limpias'],
    tips: ['Enjuaga los envases', 'Retira etiquetas cuando sea posible', 'Aplasta las botellas para ahorrar espacio'],
  },
  {
    id: 'papel',
    name: 'Papel',
    pointsPerKg: 25,
    color: 'oklch(0.72 0.13 155)',
    description: 'Hojas y documentos de papel. Su reciclaje ahorra agua y árboles.',
    examples: ['Hojas de cuaderno', 'Periódicos', 'Revistas', 'Sobres'],
    tips: ['Mantén el papel seco', 'Evita papel con grasa o comida', 'Retira grapas y clips'],
  },
  {
    id: 'carton',
    name: 'Cartón',
    pointsPerKg: 30,
    color: 'oklch(0.6 0.1 90)',
    description: 'Cajas y empaques de cartón corrugado o plano, muy reutilizable.',
    examples: ['Cajas de envíos', 'Empaques de alimentos secos', 'Rollos de cartón'],
    tips: ['Desarma y aplana las cajas', 'Mantén el cartón seco', 'Retira cintas adhesivas y plásticos'],
  },
  {
    id: 'vidrio',
    name: 'Vidrio',
    pointsPerKg: 20,
    color: 'oklch(0.7 0.12 200)',
    description: 'Botellas y frascos de vidrio, 100% reciclable de forma infinita.',
    examples: ['Botellas de bebidas', 'Frascos de conservas', 'Envases de perfume'],
    tips: ['Enjuaga los frascos', 'Retira tapas metálicas', 'Manipula con cuidado para evitar cortes'],
  },
  {
    id: 'metal',
    name: 'Metal',
    pointsPerKg: 60,
    color: 'oklch(0.55 0.03 260)',
    description: 'Latas y envases metálicos de aluminio o acero, altamente valorados.',
    examples: ['Latas de gaseosa', 'Latas de conservas', 'Tapas metálicas', 'Papel aluminio limpio'],
    tips: ['Enjuaga las latas', 'Aplasta las latas de aluminio', 'Separa aluminio de acero si puedes'],
  },
]

export function getMaterial(id: string) {
  return MATERIALS.find((m) => m.id === id)
}

export const POINTS: RecyclePoint[] = [
  {
    id: 'mira',
    name: 'Punto de reciclaje Miraflores',
    district: 'Miraflores',
    address: 'Av. Larco 345, Miraflores',
    distanceKm: 1.2,
    schedule: 'Lun a Sáb · 8:00 – 18:00',
    materials: ['plastico', 'papel', 'carton', 'vidrio', 'metal'],
    x: 32,
    y: 64,
  },
  {
    id: 'sanmiguel',
    name: 'Punto de reciclaje San Miguel',
    district: 'San Miguel',
    address: 'Av. La Marina 2200, San Miguel',
    distanceKm: 4.6,
    schedule: 'Lun a Vie · 9:00 – 17:00',
    materials: ['plastico', 'papel', 'carton'],
    x: 18,
    y: 34,
  },
  {
    id: 'surco',
    name: 'Punto de reciclaje Surco',
    district: 'Santiago de Surco',
    address: 'Av. Caminos del Inca 1500, Surco',
    distanceKm: 3.1,
    schedule: 'Todos los días · 7:00 – 20:00',
    materials: ['plastico', 'vidrio', 'metal', 'carton'],
    x: 68,
    y: 78,
  },
  {
    id: 'sanborja',
    name: 'Punto de reciclaje San Borja',
    district: 'San Borja',
    address: 'Av. San Borja Norte 780, San Borja',
    distanceKm: 2.4,
    schedule: 'Lun a Sáb · 8:30 – 19:00',
    materials: ['papel', 'carton', 'vidrio', 'metal'],
    x: 58,
    y: 48,
  },
]

export const REWARDS: Reward[] = [
  {
    id: 'cafe',
    name: 'Café gratis',
    description: 'Un café de especialidad en cafeterías aliadas.',
    points: 500,
    icon: 'coffee',
  },
  {
    id: 'descuento',
    name: '10% de descuento',
    description: 'Cupón de descuento en tiendas ecológicas asociadas.',
    points: 800,
    icon: 'tag',
  },
  {
    id: 'kit',
    name: 'Kit ecológico',
    description: 'Set de productos reutilizables: botella, bolsa y sorbete.',
    points: 1500,
    icon: 'sprout',
  },
  {
    id: 'evento',
    name: 'Entrada para evento',
    description: 'Acceso a un evento de sostenibilidad y medio ambiente.',
    points: 2000,
    icon: 'ticket',
  },
]

export const INITIAL_STATE: EcoState = {
  authed: false,
  name: 'Diego Ramírez',
  email: DEMO_EMAIL,
  age: 23,
  location: 'Lima, Perú',
  level: 3,
  points: 1250,
  kg: 12.5,
  deliveries: 18,
  co2: 8.3,
  bottles: 25,
  rewardsRedeemed: 2,
  weekly: [
    { label: 'Sem 1', kg: 2.0 },
    { label: 'Sem 2', kg: 3.2 },
    { label: 'Sem 3', kg: 1.8 },
    { label: 'Sem 4', kg: 2.5 },
    { label: 'Sem 5', kg: 3.0 },
  ],
  activities: [
    {
      id: 'a1',
      date: '08/09/2026',
      material: 'Plástico',
      weight: 2.5,
      points: 125,
      place: 'Miraflores',
      status: 'Validado',
    },
    {
      id: 'a2',
      date: '05/09/2026',
      material: 'Cartón',
      weight: 3,
      points: 90,
      place: 'Surco',
      status: 'Validado',
    },
    {
      id: 'a3',
      date: '01/09/2026',
      material: 'Vidrio',
      weight: 2,
      points: 40,
      place: 'San Borja',
      status: 'Validado',
    },
  ],
  pickups: [],
}

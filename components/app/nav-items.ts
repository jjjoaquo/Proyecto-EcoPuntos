import {
  Home,
  Recycle,
  BookOpen,
  MapPin,
  Truck,
  Gift,
  Clock,
  User,
  type LucideIcon,
} from 'lucide-react'

export interface NavItem {
  href: string
  label: string
  icon: LucideIcon
}

export const NAV_ITEMS: NavItem[] = [
  { href: '/dashboard', label: 'Inicio', icon: Home },
  { href: '/recycle', label: 'Reciclar', icon: Recycle },
  { href: '/guide', label: 'Guía de materiales', icon: BookOpen },
  { href: '/points', label: 'Puntos de reciclaje', icon: MapPin },
  { href: '/pickup', label: 'Solicitar recojo', icon: Truck },
  { href: '/rewards', label: 'Recompensas', icon: Gift },
  { href: '/history', label: 'Historial', icon: Clock },
  { href: '/profile', label: 'Perfil', icon: User },
]

export const MOBILE_ITEMS: NavItem[] = [
  { href: '/dashboard', label: 'Inicio', icon: Home },
  { href: '/recycle', label: 'Reciclar', icon: Recycle },
  { href: '/points', label: 'Puntos', icon: MapPin },
  { href: '/rewards', label: 'Premios', icon: Gift },
  { href: '/profile', label: 'Perfil', icon: User },
]

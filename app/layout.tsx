import type { Metadata, Viewport } from 'next'
import { Inter, Poppins } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { EcoProvider } from '@/lib/store'
import { ToastProvider } from '@/components/toast'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-poppins',
})

export const metadata: Metadata = {
  title: 'EcoPuntos — Recicla. Suma puntos. Genera impacto.',
  description:
    'Convierte tus residuos reciclables en puntos y recompensas mientras contribuyes al cuidado del planeta. ODS 12: Producción y Consumo Responsables.',
  generator: 'v0.app',
}

export const viewport: Viewport = {
  themeColor: '#16a34a',
  colorScheme: 'light',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={`${inter.variable} ${poppins.variable} bg-background`}>
      <body className="antialiased">
        <EcoProvider>
          <ToastProvider>{children}</ToastProvider>
        </EcoProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}

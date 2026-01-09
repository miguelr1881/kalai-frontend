import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair',
})

export const metadata: Metadata = {
  title: 'Kalai Medical Center | Centro de Estética Premium',
  description: 'Descubre la belleza natural en Kalai Medical Center. Tratamientos faciales, corporales y productos de estética de alta calidad en Costa Rica.',
  keywords: 'estética, belleza, spa, tratamientos faciales, Costa Rica, Kalai',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={`${inter.variable} ${playfair.variable}`}>
      <body>
        {children}
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#F5EFE7',
              color: '#6B5E4C',
              borderRadius: '16px',
              padding: '16px',
            },
            success: {
              iconTheme: {
                primary: '#9DAB8E',
                secondary: '#fff',
              },
            },
          }}
        />
      </body>
    </html>
  )
}

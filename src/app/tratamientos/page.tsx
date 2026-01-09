import { getTreatments, getTreatmentCategories } from '@/lib/api'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import TreatmentsGrid from '@/components/treatments/TreatmentsGrid'

export const metadata = {
  title: 'Tratamientos - Kalai Medical Center',
  description: 'Descubre nuestros tratamientos estéticos profesionales. Reserva tu cita ahora.',
}

export default async function TreatamientosPage() {
  const [treatments, categories] = await Promise.all([
    getTreatments(),
    getTreatmentCategories()
  ])

  return (
    <main className="min-h-screen bg-kalai-cream">
      <Navbar />
      
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-b from-kalai-white to-kalai-cream">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-display font-semibold text-kalai-brown mb-6">
            Nuestros
            <span className="block text-kalai-sage">Tratamientos</span>
          </h1>
          <p className="text-xl text-kalai-brown/70 max-w-2xl mx-auto">
            Tratamientos profesionales diseñados para realzar tu belleza natural. 
            Reserva tu cita y comienza tu transformación.
          </p>
        </div>
      </section>

      {/* Treatments Grid */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto">
          <TreatmentsGrid treatments={treatments} categories={categories} />
        </div>
      </section>

      <Footer />
    </main>
  )
}

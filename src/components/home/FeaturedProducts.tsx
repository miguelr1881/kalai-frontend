'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import TreatmentCard from '@/components/treatments/TreatmentCard'
import { getTreatments } from '@/lib/api'
import type { Treatment } from '@/types'

export default function FeaturedProducts() {
  const [treatments, setTreatments] = useState<Treatment[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTreatments = async () => {
      try {
        const data = await getTreatments()
        setTreatments(data.slice(0, 3)) // Show only first 3
      } catch (error) {
        console.error('Error fetching treatments:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchTreatments()
  }, [])

  return (
    <section className="section-padding bg-gradient-to-b from-kalai-white to-kalai-cream">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-display font-semibold text-kalai-brown mb-4">
              Nuestros Tratamientos
            </h2>
            <p className="text-xl text-kalai-brown/70 max-w-2xl mx-auto">
              Descubre nuestra selección de tratamientos premium diseñados para ti
            </p>
          </motion.div>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="card animate-pulse">
                <div className="aspect-square bg-kalai-beige rounded-2xl mb-4" />
                <div className="h-6 bg-kalai-beige rounded mb-2" />
                <div className="h-4 bg-kalai-beige rounded w-3/4" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {treatments.map((treatment, index) => (
              <motion.div
                key={treatment.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <TreatmentCard treatment={treatment} />
              </motion.div>
            ))}
          </div>
        )}

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link href="/tratamientos" className="btn-primary group inline-flex items-center">
            Ver Todos los Tratamientos
            <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

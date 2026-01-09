'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Clock, Sparkles } from 'lucide-react'
import Image from 'next/image'
import { getWhatsAppTreatmentLink } from '@/lib/api'
import type { Treatment } from '@/types'

interface TreatmentCardProps {
  treatment: Treatment
}

export default function TreatmentCard({ treatment }: TreatmentCardProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleReserve = async () => {
    setIsLoading(true)
    try {
      const whatsappLink = await getWhatsAppTreatmentLink(treatment.id)
      window.open(whatsappLink, '_blank')
    } catch (error) {
      console.error('Error al generar link de WhatsApp:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card group hover:shadow-2xl transition-all duration-300"
    >
      {/* Image */}
      <div className="relative h-64 mb-4 rounded-2xl overflow-hidden bg-kalai-beige/30">
        {treatment.image_url ? (
          <Image
            src={treatment.image_url}
            alt={treatment.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Sparkles size={48} className="text-kalai-sage/30" />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="space-y-3">
        {/* Category Badge */}
        {treatment.category && (
          <span className="inline-block px-3 py-1 rounded-full bg-kalai-sage/10 text-kalai-sage text-xs font-medium">
            {treatment.category}
          </span>
        )}

        {/* Title */}
        <h3 className="text-xl font-semibold text-kalai-brown line-clamp-2">
          {treatment.name}
        </h3>

        {/* Description */}
        <p className="text-kalai-brown/70 text-sm line-clamp-3">
          {treatment.description}
        </p>

        {/* Duration */}
        {treatment.duration && (
          <div className="flex items-center gap-2 text-kalai-brown/60 text-sm">
            <Clock size={16} />
            <span>{treatment.duration}</span>
          </div>
        )}

        {/* Price & CTA */}
        <div className="pt-4 border-t border-kalai-beige flex items-center justify-between">
          <div>
            <p className="text-sm text-kalai-brown/60">Desde</p>
            <p className="text-2xl font-bold text-kalai-sage">
              {treatment.currency === 'USD' ? '$' : '₡'}{treatment.price.toLocaleString()}
            </p>
          </div>
          <button
            onClick={handleReserve}
            disabled={isLoading}
            className="btn-primary"
          >
            {isLoading ? 'Cargando...' : 'Reservar'}
          </button>
        </div>
      </div>
    </motion.div>
  )
}

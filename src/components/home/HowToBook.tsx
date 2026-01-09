'use client'

import { motion } from 'framer-motion'
import { MessageCircle, CreditCard, CheckCircle, AlertCircle } from 'lucide-react'

export default function HowToBook() {
  const steps = [
    {
      icon: MessageCircle,
      number: '1',
      title: 'Escríbenos al WhatsApp',
      description: 'Contáctanos al 8892-6754 para consultar espacios disponibles y motivo de consulta.',
      link: 'https://wa.me/50688926754'
    },
    {
      icon: CreditCard,
      number: '2',
      title: 'Aparta tu cita',
      description: 'Realiza un depósito de ₡5,000 (este monto se rebaja del total el día de tu cita).'
    },
    {
      icon: CheckCircle,
      number: '3',
      title: 'Confirma tu reserva',
      description: 'Envía tu comprobante de pago y listo, ¡tu espacio está asegurado!'
    }
  ]

  const conditions = [
    'El depósito no es reembolsable, salvo que la cita sea cancelada por parte de la clínica.',
    'Podrás reprogramar una sola vez, avisando con al menos 72 horas de anticipación.'
  ]

  return (
    <section className="section-padding bg-kalai-beige/30">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-display font-semibold text-kalai-brown mb-4">
            ✨ Agenda tu cita en
            <span className="block text-kalai-sage">3 pasos</span>
          </h2>
          <p className="text-lg text-kalai-brown/70 max-w-2xl mx-auto">
            ¡Así de fácil aseguras tu espacio en Kalai Medical Center!
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative"
              >
                {step.link ? (
                  <a
                    href={step.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block card hover:shadow-xl transition-all h-full group"
                  >
                    <div className="text-center">
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-kalai-sage text-white text-2xl font-bold mb-4 group-hover:scale-110 transition-transform">
                        {step.number}
                      </div>
                      <div className="mb-4">
                        <Icon size={40} className="text-kalai-sage mx-auto" />
                      </div>
                      <h3 className="text-xl font-semibold text-kalai-brown mb-3">
                        {step.title}
                      </h3>
                      <p className="text-kalai-brown/70">
                        {step.description}
                      </p>
                    </div>
                  </a>
                ) : (
                  <div className="card h-full">
                    <div className="text-center">
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-kalai-sage text-white text-2xl font-bold mb-4">
                        {step.number}
                      </div>
                      <div className="mb-4">
                        <Icon size={40} className="text-kalai-sage mx-auto" />
                      </div>
                      <h3 className="text-xl font-semibold text-kalai-brown mb-3">
                        {step.title}
                      </h3>
                      <p className="text-kalai-brown/70">
                        {step.description}
                      </p>
                    </div>
                  </div>
                )}
              </motion.div>
            )
          })}
        </div>

        {/* Conditions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="card bg-white/50 border-2 border-kalai-sage/20"
        >
          <div className="flex items-start gap-4">
            <AlertCircle size={24} className="text-kalai-sage flex-shrink-0 mt-1" />
            <div>
              <h4 className="text-lg font-semibold text-kalai-brown mb-3">
                📌 Condiciones importantes:
              </h4>
              <ul className="space-y-2">
                {conditions.map((condition, index) => (
                  <li key={index} className="text-kalai-brown/70 flex items-start">
                    <span className="mr-2">•</span>
                    <span>{condition}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

'use client'

import { motion } from 'framer-motion'
import { Heart, Star, Award } from 'lucide-react'

export default function About() {
  const features = [
    {
      icon: Heart,
      title: 'Con Amor',
      description: 'Cada tratamiento está diseñado con cuidado y dedicación para tu bienestar'
    },
    {
      icon: Star,
      title: 'Calidad Premium',
      description: 'Utilizamos solo los mejores productos y las técnicas más avanzadas'
    },
    {
      icon: Award,
      title: 'Experiencia',
      description: 'Años de experiencia respaldando resultados excepcionales'
    }
  ]

  return (
    <section className="section-padding bg-kalai-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="inline-block px-4 py-2 rounded-full bg-kalai-sage/10 text-kalai-sage text-sm font-medium">
              Origen: Cantones - Ka (Más) Lai (Belleza) = Más Belleza
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-semibold text-kalai-brown">
              Tu Centro de
              <span className="block text-kalai-sage">Estética de Confianza</span>
            </h2>
            <p className="text-lg text-kalai-brown/70 leading-relaxed">
              En Kalai Medical Center, creemos que la verdadera belleza viene de sentirse bien contigo mismo. 
              Nuestro equipo de profesionales está dedicado a brindarte una experiencia única y personalizada.
            </p>
            <p className="text-lg text-kalai-brown/70 leading-relaxed">
              Cada tratamiento está cuidadosamente diseñado para realzar tu belleza natural, 
              utilizando las mejores técnicas y productos del mercado.
            </p>
          </motion.div>

          {/* Right Features */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="card flex items-start gap-4"
                >
                  <div className="p-3 rounded-2xl bg-kalai-sage/10">
                    <Icon size={24} className="text-kalai-sage" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-kalai-brown mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-kalai-brown/70">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

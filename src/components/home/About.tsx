'use client'

import { motion } from 'framer-motion'
import { Heart, Star, Award } from 'lucide-react'
import Image from 'next/image'

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
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
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
              Hola, soy la
              <span className="block text-kalai-sage">Dra. Ilen</span>
            </h2>
            <p className="text-lg text-kalai-brown/70 leading-relaxed">
              Toda mi vida he lidiado con el acné, y fue precisamente esa experiencia la que me motivó a dejar la CCSS y abrir mi clínica. Hoy, ayudar a otras personas a mejorar su piel y su confianza es lo que más me llena cada día.
            </p>
            <p className="text-lg text-kalai-brown/70 leading-relaxed">
              El acné no solo afecta lo físico, también impacta nuestras emociones, nuestra autoestima y hasta nuestra forma de vernos. Por eso, he creado un enfoque más integral, para acompañarte a conocer tu piel, entenderla y aprender a cuidarla con amor y constancia.
            </p>
            <p className="text-lg text-kalai-brown/70 leading-relaxed">
              Agradezco profundamente a todas las personas que han confiado en mí; cada historia me ha ayudado a crecer tanto profesional como personalmente.
            </p>
          </motion.div>

          {/* Right Image */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="/images/dra-ilen.png"
                alt="Dra. Ilen - Kalai Medical Center"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>
            {/* Decorative Elements */}
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-kalai-sage/20 rounded-full blur-3xl -z-10" />
            <div className="absolute -top-4 -left-4 w-32 h-32 bg-kalai-beige/40 rounded-full blur-3xl -z-10" />
          </motion.div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card text-center"
              >
                <div className="inline-flex p-4 rounded-2xl bg-kalai-sage/10 mb-4">
                  <Icon size={32} className="text-kalai-sage" />
                </div>
                <h3 className="text-xl font-semibold text-kalai-brown mb-2">
                  {feature.title}
                </h3>
                <p className="text-kalai-brown/70">
                  {feature.description}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

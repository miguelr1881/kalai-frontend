'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Sparkles, ArrowRight } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-kalai-cream via-kalai-white to-kalai-beige overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-20 w-96 h-96 bg-kalai-sage/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-kalai-gold/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-32 md:py-40">
        <div className="text-center space-y-8">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-kalai-sage/10 text-kalai-sage-dark"
          >
            <Sparkles size={16} />
            <span className="text-sm font-medium">Centro de Estética Premium</span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-5xl md:text-7xl lg:text-8xl font-display font-semibold text-kalai-brown leading-tight"
          >
            Realza tu
            <br />
            <span className="text-kalai-sage">Belleza Natural</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl md:text-2xl text-kalai-brown/70 max-w-2xl mx-auto"
          >
            Descubre tratamientos faciales y corporales diseñados para resaltar tu esencia única
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/productos" className="btn-primary group">
              Ver Productos
              <ArrowRight size={20} className="inline ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/contacto" className="btn-secondary">
              Contáctanos
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="grid grid-cols-3 gap-8 max-w-2xl mx-auto pt-12"
          >
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-display font-semibold text-kalai-sage">500+</div>
              <div className="text-sm text-kalai-brown/60 mt-1">Clientes Felices</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-display font-semibold text-kalai-sage">50+</div>
              <div className="text-sm text-kalai-brown/60 mt-1">Tratamientos</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-display font-semibold text-kalai-sage">5★</div>
              <div className="text-sm text-kalai-brown/60 mt-1">Calificación</div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2 text-kalai-brown/40">
          <span className="text-xs uppercase tracking-wider">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-kalai-brown/40 to-transparent" />
        </div>
      </motion.div>
    </section>
  )
}

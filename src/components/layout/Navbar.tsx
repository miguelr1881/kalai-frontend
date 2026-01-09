'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X, ShoppingBag } from 'lucide-react'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-effect border-b border-kalai-beige/30">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="text-2xl md:text-3xl font-display font-semibold text-kalai-brown">
              Kalai
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-kalai-brown hover:text-kalai-sage transition-colors">
              Inicio
            </Link>
            <Link href="/tratamientos" className="text-kalai-brown hover:text-kalai-sage transition-colors">
              Tratamientos
            </Link>
            <Link href="/productos" className="text-kalai-brown hover:text-kalai-sage transition-colors">
              Productos
            </Link>
            <Link href="/nosotros" className="text-kalai-brown hover:text-kalai-sage transition-colors">
              Nosotros
            </Link>
            <Link href="/contacto" className="text-kalai-brown hover:text-kalai-sage transition-colors">
              Contacto
            </Link>
            <Link href="/admin" className="btn-primary text-sm">
              Iniciar Sesión
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-kalai-cream transition-colors"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-20 left-0 right-0 bg-white border-b border-kalai-beige shadow-lg animate-slide-up">
          <div className="px-6 py-4 space-y-4">
            <Link 
              href="/" 
              className="block text-kalai-brown hover:text-kalai-sage transition-colors py-2"
              onClick={() => setIsOpen(false)}
            >
              Inicio
            </Link>
            <Link 
              href="/tratamientos" 
              className="block text-kalai-brown hover:text-kalai-sage transition-colors py-2"
              onClick={() => setIsOpen(false)}
            >
              Tratamientos
            </Link>
            <Link 
              href="/productos" 
              className="block text-kalai-brown hover:text-kalai-sage transition-colors py-2"
              onClick={() => setIsOpen(false)}
            >
              Productos
            </Link>
            <Link 
              href="/nosotros" 
              className="block text-kalai-brown hover:text-kalai-sage transition-colors py-2"
              onClick={() => setIsOpen(false)}
            >
              Nosotros
            </Link>
            <Link 
              href="/contacto" 
              className="block text-kalai-brown hover:text-kalai-sage transition-colors py-2"
              onClick={() => setIsOpen(false)}
            >
              Contacto
            </Link>
            <Link 
              href="/admin" 
              className="block text-kalai-sage hover:text-kalai-sage-dark transition-colors py-2 font-medium"
              onClick={() => setIsOpen(false)}
            >
              Iniciar Sesión
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}

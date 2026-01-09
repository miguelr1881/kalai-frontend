'use client'

import { ShoppingBag } from 'lucide-react'
import toast from 'react-hot-toast'
import { getWhatsAppLink } from '@/lib/api'
import type { Product } from '@/types'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const handleWhatsAppClick = async () => {
    try {
      const link = await getWhatsAppLink(product.id)
      window.open(link, '_blank')
    } catch (error) {
      toast.error('Error al generar el link de WhatsApp')
    }
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CR', {
      style: 'currency',
      currency: 'CRC',
      minimumFractionDigits: 0,
    }).format(price)
  }

  return (
    <div className="card group cursor-pointer hover:scale-105 transition-transform duration-300">
      {/* Image Placeholder */}
      <div className="aspect-square bg-gradient-to-br from-kalai-cream to-kalai-beige rounded-2xl mb-4 flex items-center justify-center overflow-hidden">
        {product.image_url ? (
          <img 
            src={product.image_url} 
            alt={product.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <ShoppingBag size={48} className="text-kalai-sage/30" />
        )}
      </div>

      {/* Content */}
      <div className="space-y-2">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-xl font-semibold text-kalai-brown group-hover:text-kalai-sage transition-colors">
            {product.name}
          </h3>
          {product.category && (
            <span className="px-2 py-1 text-xs rounded-full bg-kalai-sage/10 text-kalai-sage whitespace-nowrap">
              {product.category}
            </span>
          )}
        </div>

        <p className="text-kalai-brown/70 line-clamp-2 text-sm">
          {product.description}
        </p>

        <div className="flex items-center justify-between pt-4">
          <div className="text-2xl font-display font-semibold text-kalai-sage">
            {formatPrice(product.price)}
          </div>
          <button
            onClick={handleWhatsAppClick}
            className="px-6 py-2 bg-kalai-sage hover:bg-kalai-sage-dark text-white rounded-full text-sm font-medium transition-colors"
          >
            Comprar
          </button>
        </div>

        {product.stock > 0 && product.stock < 10 && (
          <p className="text-xs text-kalai-gold">
            ¡Solo quedan {product.stock} disponibles!
          </p>
        )}
      </div>
    </div>
  )
}

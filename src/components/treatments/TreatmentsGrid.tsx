'use client'

import { useState, useMemo } from 'react'
import { Search, Filter } from 'lucide-react'
import TreatmentCard from './TreatmentCard'
import type { Treatment } from '@/types'

interface TreatmentsGridProps {
  treatments: Treatment[]
  categories: string[]
}

export default function TreatmentsGrid({ treatments, categories }: TreatmentsGridProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  const filteredTreatments = useMemo(() => {
    return treatments.filter(treatment => {
      const matchesSearch = treatment.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        treatment.description?.toLowerCase().includes(searchTerm.toLowerCase())
      
      const matchesCategory = selectedCategory === 'all' || treatment.category === selectedCategory

      return matchesSearch && matchesCategory
    })
  }, [treatments, searchTerm, selectedCategory])

  return (
    <div className="space-y-8">
      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-kalai-brown/40" size={20} />
          <input
            type="text"
            placeholder="Buscar tratamientos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-2xl border border-kalai-beige bg-white/50 focus:outline-none focus:ring-2 focus:ring-kalai-sage/20 transition-all"
          />
        </div>

        {/* Category Filter */}
        <div className="relative">
          <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-kalai-brown/40" size={20} />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="pl-12 pr-8 py-3 rounded-2xl border border-kalai-beige bg-white/50 focus:outline-none focus:ring-2 focus:ring-kalai-sage/20 transition-all appearance-none cursor-pointer min-w-[200px]"
          >
            <option value="all">Todas las categorías</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Results Count */}
      <p className="text-kalai-brown/60">
        Mostrando {filteredTreatments.length} de {treatments.length} tratamientos
      </p>

      {/* Grid */}
      {filteredTreatments.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTreatments.map((treatment) => (
            <TreatmentCard key={treatment.id} treatment={treatment} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-kalai-brown/60 text-lg">
            No se encontraron tratamientos que coincidan con tu búsqueda.
          </p>
        </div>
      )}
    </div>
  )
}

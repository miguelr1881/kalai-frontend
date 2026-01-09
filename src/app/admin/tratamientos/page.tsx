'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/authStore'
import { getAllTreatments, createTreatment, updateTreatment, deleteTreatment, toggleTreatmentActive } from '@/lib/api'
import type { Treatment, TreatmentCreate } from '@/types'
import toast from 'react-hot-toast'
import { Plus, Edit, Trash2, Power, Sparkles, ArrowLeft, Package } from 'lucide-react'
import Link from 'next/link'

export default function TreatmentsAdmin() {
  const router = useRouter()
  const { token, isAuthenticated, logout } = useAuthStore()
  const [treatments, setTreatments] = useState<Treatment[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingTreatment, setEditingTreatment] = useState<Treatment | null>(null)

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/admin')
      return
    }

    fetchTreatments()
  }, [isAuthenticated, router])

  const fetchTreatments = async () => {
    try {
      const data = await getAllTreatments(token!)
      setTreatments(data)
    } catch (error) {
      toast.error('Error al cargar tratamientos')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    const treatmentData: TreatmentCreate = {
      name: formData.get('name') as string,
      description: formData.get('description') as string,
      price: parseFloat(formData.get('price') as string),
      duration: formData.get('duration') as string,
      category: formData.get('category') as string,
      image_url: formData.get('image_url') as string || undefined,
      is_active: true,
    }

    try {
      if (editingTreatment) {
        await updateTreatment(token!, editingTreatment.id, treatmentData)
        toast.success('Tratamiento actualizado')
      } else {
        await createTreatment(token!, treatmentData)
        toast.success('Tratamiento creado')
      }
      
      setShowModal(false)
      setEditingTreatment(null)
      fetchTreatments()
    } catch (error) {
      toast.error('Error al guardar tratamiento')
    }
  }

  const handleToggleActive = async (id: string) => {
    try {
      await toggleTreatmentActive(token!, id)
      await fetchTreatments()
      toast.success('Estado actualizado')
    } catch (error) {
      toast.error('Error al cambiar estado')
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('¿Estás seguro de eliminar este tratamiento?')) return

    try {
      await deleteTreatment(token!, id)
      await fetchTreatments()
      toast.success('Tratamiento eliminado')
    } catch (error) {
      toast.error('Error al eliminar')
    }
  }

  const openEditModal = (treatment: Treatment) => {
    setEditingTreatment(treatment)
    setShowModal(true)
  }

  const openCreateModal = () => {
    setEditingTreatment(null)
    setShowModal(true)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-kalai-cream">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-kalai-sage"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-kalai-cream">
      {/* Header */}
      <div className="bg-white border-b border-kalai-beige">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/admin/dashboard" className="p-2 hover:bg-kalai-cream rounded-lg transition-colors">
                <ArrowLeft size={24} className="text-kalai-brown" />
              </Link>
              <div>
                <h1 className="text-3xl font-display font-semibold text-kalai-brown flex items-center gap-2">
                  <Sparkles className="text-kalai-sage" />
                  Gestión de Tratamientos
                </h1>
                <p className="text-kalai-brown/60 mt-1">{treatments.length} tratamientos registrados</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/admin/dashboard" className="px-4 py-2 rounded-lg border border-kalai-beige hover:bg-kalai-cream transition-colors flex items-center gap-2">
                <Package size={18} />
                Ver Productos
              </Link>
              <button
                onClick={openCreateModal}
                className="btn-primary flex items-center gap-2"
              >
                <Plus size={20} />
                Nuevo Tratamiento
              </button>
              <button
                onClick={logout}
                className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Treatments Table */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-kalai-beige/30">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-kalai-brown">Nombre</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-kalai-brown">Categoría</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-kalai-brown">Precio</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-kalai-brown">Duración</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-kalai-brown">Estado</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-kalai-brown">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-kalai-beige">
                {treatments.map((treatment) => (
                  <tr key={treatment.id} className="hover:bg-kalai-cream/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-medium text-kalai-brown">{treatment.name}</div>
                      <div className="text-sm text-kalai-brown/60 line-clamp-1">{treatment.description}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-block px-3 py-1 rounded-full bg-kalai-sage/10 text-kalai-sage text-xs font-medium">
                        {treatment.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-kalai-brown font-medium">
                      ₡{treatment.price.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-kalai-brown/70 text-sm">
                      {treatment.duration || '-'}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleToggleActive(treatment.id)}
                        className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                          treatment.is_active
                            ? 'bg-green-100 text-green-700 hover:bg-green-200'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        <Power size={12} />
                        {treatment.is_active ? 'Activo' : 'Inactivo'}
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEditModal(treatment)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Editar"
                        >
                          <Edit size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(treatment.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Eliminar"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {treatments.length === 0 && (
              <div className="text-center py-12">
                <Sparkles size={48} className="mx-auto text-kalai-sage/30 mb-4" />
                <p className="text-kalai-brown/60">No hay tratamientos registrados</p>
                <button onClick={openCreateModal} className="mt-4 btn-primary">
                  Crear primer tratamiento
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-kalai-beige">
              <h2 className="text-2xl font-semibold text-kalai-brown">
                {editingTreatment ? 'Editar Tratamiento' : 'Nuevo Tratamiento'}
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-kalai-brown mb-2">
                  Nombre *
                </label>
                <input
                  type="text"
                  name="name"
                  defaultValue={editingTreatment?.name}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-kalai-beige focus:outline-none focus:ring-2 focus:ring-kalai-sage/20"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-kalai-brown mb-2">
                  Descripción *
                </label>
                <textarea
                  name="description"
                  defaultValue={editingTreatment?.description}
                  required
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl border border-kalai-beige focus:outline-none focus:ring-2 focus:ring-kalai-sage/20"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-kalai-brown mb-2">
                    Precio (₡) *
                  </label>
                  <input
                    type="number"
                    name="price"
                    defaultValue={editingTreatment?.price}
                    required
                    min="0"
                    step="0.01"
                    className="w-full px-4 py-3 rounded-xl border border-kalai-beige focus:outline-none focus:ring-2 focus:ring-kalai-sage/20"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-kalai-brown mb-2">
                    Duración
                  </label>
                  <input
                    type="text"
                    name="duration"
                    defaultValue={editingTreatment?.duration || ''}
                    placeholder="Ej: 60 minutos, 5 sesiones"
                    className="w-full px-4 py-3 rounded-xl border border-kalai-beige focus:outline-none focus:ring-2 focus:ring-kalai-sage/20"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-kalai-brown mb-2">
                  Categoría *
                </label>
                <input
                  type="text"
                  name="category"
                  defaultValue={editingTreatment?.category}
                  required
                  placeholder="Ej: Tratamientos Faciales, Paquetes"
                  className="w-full px-4 py-3 rounded-xl border border-kalai-beige focus:outline-none focus:ring-2 focus:ring-kalai-sage/20"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-kalai-brown mb-2">
                  URL de Imagen
                </label>
                <input
                  type="url"
                  name="image_url"
                  defaultValue={editingTreatment?.image_url || ''}
                  placeholder="https://ejemplo.com/imagen.jpg"
                  className="w-full px-4 py-3 rounded-xl border border-kalai-beige focus:outline-none focus:ring-2 focus:ring-kalai-sage/20"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false)
                    setEditingTreatment(null)
                  }}
                  className="flex-1 px-6 py-3 border border-kalai-beige rounded-xl hover:bg-kalai-cream transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 btn-primary"
                >
                  {editingTreatment ? 'Actualizar' : 'Crear'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

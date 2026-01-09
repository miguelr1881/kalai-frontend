'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/authStore'
import { 
  getAllProducts, createProduct, updateProduct, deleteProduct, toggleProductActive,
  getAllTreatments, createTreatment, updateTreatment, deleteTreatment, toggleTreatmentActive 
} from '@/lib/api'
import type { Product, ProductCreate, Treatment, TreatmentCreate } from '@/types'
import toast from 'react-hot-toast'
import { Plus, Edit, Trash2, Power, Package, Sparkles } from 'lucide-react'

type TabType = 'products' | 'treatments'

export default function AdminDashboard() {
  const router = useRouter()
  const { token, isAuthenticated, logout } = useAuthStore()
  
  const [activeTab, setActiveTab] = useState<TabType>('treatments')
  const [products, setProducts] = useState<Product[]>([])
  const [treatments, setTreatments] = useState<Treatment[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [editingTreatment, setEditingTreatment] = useState<Treatment | null>(null)

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/admin')
      return
    }

    fetchData()
  }, [isAuthenticated, router])

  const fetchData = async () => {
    try {
      const [productsData, treatmentsData] = await Promise.all([
        getAllProducts(token!),
        getAllTreatments(token!)
      ])
      setProducts(productsData)
      setTreatments(treatmentsData)
    } catch (error) {
      console.error('Error al cargar datos:', error)
      toast.error('Error al cargar datos')
    } finally {
      setLoading(false)
    }
  }

  const handleProductSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    const productData: ProductCreate = {
      name: formData.get('name') as string,
      description: formData.get('description') as string,
      price: parseFloat(formData.get('price') as string),
      stock: parseInt(formData.get('stock') as string),
      category: formData.get('category') as string,
      image_url: formData.get('image_url') as string || undefined,
      is_active: true,
    }

    try {
      if (editingProduct) {
        await updateProduct(token!, editingProduct.id, productData)
        toast.success('Producto actualizado')
      } else {
        await createProduct(token!, productData)
        toast.success('Producto creado')
      }
      
      setShowModal(false)
      setEditingProduct(null)
      fetchData()
    } catch (error) {
      toast.error('Error al guardar producto')
    }
  }

  const handleTreatmentSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    const treatmentData: TreatmentCreate = {
      name: formData.get('name') as string,
      description: formData.get('description') as string,
      price: parseFloat(formData.get('price') as string),
      duration: formData.get('duration') as string,
      currency: formData.get('currency') as string,
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
      fetchData()
    } catch (error) {
      toast.error('Error al guardar tratamiento')
    }
  }

  const handleToggleProduct = async (id: number) => {
    try {
      await toggleProductActive(token!, id)
      await fetchData()
      toast.success('Estado actualizado')
    } catch (error) {
      toast.error('Error al cambiar estado')
    }
  }

  const handleToggleTreatment = async (id: string) => {
    try {
      await toggleTreatmentActive(token!, id)
      await fetchData()
      toast.success('Estado actualizado')
    } catch (error) {
      toast.error('Error al cambiar estado')
    }
  }

  const handleDeleteProduct = async (id: number) => {
    if (!confirm('¿Estás seguro de eliminar este producto?')) return
    try {
      await deleteProduct(token!, id)
      await fetchData()
      toast.success('Producto eliminado')
    } catch (error) {
      toast.error('Error al eliminar')
    }
  }

  const handleDeleteTreatment = async (id: string) => {
    if (!confirm('¿Estás seguro de eliminar este tratamiento?')) return
    try {
      await deleteTreatment(token!, id)
      await fetchData()
      toast.success('Tratamiento eliminado')
    } catch (error) {
      toast.error('Error al eliminar')
    }
  }

  const openCreateModal = (type: TabType) => {
    if (type === 'products') {
      setEditingProduct(null)
      setEditingTreatment(null)
    } else {
      setEditingTreatment(null)
      setEditingProduct(null)
    }
    setShowModal(true)
  }

  const openEditProductModal = (product: Product) => {
    setEditingProduct(product)
    setEditingTreatment(null)
    setShowModal(true)
  }

  const openEditTreatmentModal = (treatment: Treatment) => {
    setEditingTreatment(treatment)
    setEditingProduct(null)
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
            <div>
              <h1 className="text-3xl font-display font-semibold text-kalai-brown">
                Panel de Administración
              </h1>
              <p className="text-kalai-brown/60 mt-1">Kalai Medical Center</p>
            </div>
            <button
              onClick={logout}
              className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              Cerrar Sesión
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-kalai-beige">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab('treatments')}
              className={`px-6 py-4 font-medium transition-all relative flex items-center gap-2 ${
                activeTab === 'treatments'
                  ? 'text-kalai-sage'
                  : 'text-kalai-brown/60 hover:text-kalai-brown'
              }`}
            >
              <Sparkles size={20} />
              Tratamientos ({treatments.length})
              {activeTab === 'treatments' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-kalai-sage" />
              )}
            </button>
            <button
              onClick={() => setActiveTab('products')}
              className={`px-6 py-4 font-medium transition-all relative flex items-center gap-2 ${
                activeTab === 'products'
                  ? 'text-kalai-sage'
                  : 'text-kalai-brown/60 hover:text-kalai-brown'
              }`}
            >
              <Package size={20} />
              Productos ({products.length})
              {activeTab === 'products' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-kalai-sage" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Action Button */}
        <div className="flex justify-end mb-6">
          <button
            onClick={() => openCreateModal(activeTab)}
            className="btn-primary flex items-center gap-2"
          >
            <Plus size={20} />
            {activeTab === 'treatments' ? 'Nuevo Tratamiento' : 'Nuevo Producto'}
          </button>
        </div>

        {/* Table */}
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-kalai-beige/30">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-kalai-brown">Nombre</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-kalai-brown">Categoría</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-kalai-brown">Precio</th>
                  {activeTab === 'treatments' && (
                    <th className="px-6 py-4 text-left text-sm font-semibold text-kalai-brown">Duración</th>
                  )}
                  {activeTab === 'products' && (
                    <th className="px-6 py-4 text-left text-sm font-semibold text-kalai-brown">Stock</th>
                  )}
                  <th className="px-6 py-4 text-left text-sm font-semibold text-kalai-brown">Estado</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-kalai-brown">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-kalai-beige">
                {activeTab === 'treatments' ? (
                  treatments.map((treatment) => (
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
                        {treatment.currency === 'USD' ? '$' : '₡'}{treatment.price.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 text-kalai-brown/70 text-sm">
                        {treatment.duration || '-'}
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => handleToggleTreatment(treatment.id)}
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
                            onClick={() => openEditTreatmentModal(treatment)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          >
                            <Edit size={18} />
                          </button>
                          <button
                            onClick={() => handleDeleteTreatment(treatment.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  products.map((product) => (
                    <tr key={product.id} className="hover:bg-kalai-cream/30 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-medium text-kalai-brown">{product.name}</div>
                        <div className="text-sm text-kalai-brown/60 line-clamp-1">{product.description}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-block px-3 py-1 rounded-full bg-kalai-sage/10 text-kalai-sage text-xs font-medium">
                          {product.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-kalai-brown font-medium">
                        ₡{product.price.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 text-kalai-brown/70">
                        {product.stock}
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => handleToggleProduct(product.id)}
                          className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                            product.is_active
                              ? 'bg-green-100 text-green-700 hover:bg-green-200'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          <Power size={12} />
                          {product.is_active ? 'Activo' : 'Inactivo'}
                        </button>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => openEditProductModal(product)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          >
                            <Edit size={18} />
                          </button>
                          <button
                            onClick={() => handleDeleteProduct(product.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>

            {activeTab === 'treatments' && treatments.length === 0 && (
              <div className="text-center py-12">
                <Sparkles size={48} className="mx-auto text-kalai-sage/30 mb-4" />
                <p className="text-kalai-brown/60">No hay tratamientos registrados</p>
              </div>
            )}

            {activeTab === 'products' && products.length === 0 && (
              <div className="text-center py-12">
                <Package size={48} className="mx-auto text-kalai-sage/30 mb-4" />
                <p className="text-kalai-brown/60">No hay productos registrados</p>
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
                {activeTab === 'treatments'
                  ? (editingTreatment ? 'Editar Tratamiento' : 'Nuevo Tratamiento')
                  : (editingProduct ? 'Editar Producto' : 'Nuevo Producto')}
              </h2>
            </div>

            {activeTab === 'treatments' ? (
              <form onSubmit={handleTreatmentSubmit} className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-kalai-brown mb-2">Nombre *</label>
                  <input
                    type="text"
                    name="name"
                    defaultValue={editingTreatment?.name}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-kalai-beige focus:outline-none focus:ring-2 focus:ring-kalai-sage/20"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-kalai-brown mb-2">Descripción *</label>
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
                    <label className="block text-sm font-medium text-kalai-brown mb-2">Precio *</label>
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
                    <label className="block text-sm font-medium text-kalai-brown mb-2">Moneda *</label>
                    <select
                      name="currency"
                      defaultValue={editingTreatment?.currency || 'CRC'}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-kalai-beige focus:outline-none focus:ring-2 focus:ring-kalai-sage/20 bg-white"
                    >
                      <option value="CRC">₡ Colones (CRC)</option>
                      <option value="USD">$ Dólares (USD)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-kalai-brown mb-2">Duración</label>
                  <input
                    type="text"
                    name="duration"
                    defaultValue={editingTreatment?.duration || ''}
                    placeholder="Ej: 60 minutos"
                    className="w-full px-4 py-3 rounded-xl border border-kalai-beige focus:outline-none focus:ring-2 focus:ring-kalai-sage/20"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-kalai-brown mb-2">Categoría *</label>
                  <input
                    type="text"
                    name="category"
                    defaultValue={editingTreatment?.category}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-kalai-beige focus:outline-none focus:ring-2 focus:ring-kalai-sage/20"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-kalai-brown mb-2">URL de Imagen</label>
                  <input
                    type="url"
                    name="image_url"
                    defaultValue={editingTreatment?.image_url || ''}
                    className="w-full px-4 py-3 rounded-xl border border-kalai-beige focus:outline-none focus:ring-2 focus:ring-kalai-sage/20"
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => { setShowModal(false); setEditingTreatment(null) }}
                    className="flex-1 px-6 py-3 border border-kalai-beige rounded-xl hover:bg-kalai-cream transition-colors"
                  >
                    Cancelar
                  </button>
                  <button type="submit" className="flex-1 btn-primary">
                    {editingTreatment ? 'Actualizar' : 'Crear'}
                  </button>
                </div>
              </form>
            ) : (
              <form onSubmit={handleProductSubmit} className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-kalai-brown mb-2">Nombre *</label>
                  <input
                    type="text"
                    name="name"
                    defaultValue={editingProduct?.name}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-kalai-beige focus:outline-none focus:ring-2 focus:ring-kalai-sage/20"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-kalai-brown mb-2">Descripción *</label>
                  <textarea
                    name="description"
                    defaultValue={editingProduct?.description}
                    required
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl border border-kalai-beige focus:outline-none focus:ring-2 focus:ring-kalai-sage/20"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-kalai-brown mb-2">Precio (₡) *</label>
                    <input
                      type="number"
                      name="price"
                      defaultValue={editingProduct?.price}
                      required
                      min="0"
                      step="0.01"
                      className="w-full px-4 py-3 rounded-xl border border-kalai-beige focus:outline-none focus:ring-2 focus:ring-kalai-sage/20"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-kalai-brown mb-2">Stock *</label>
                    <input
                      type="number"
                      name="stock"
                      defaultValue={editingProduct?.stock}
                      required
                      min="0"
                      className="w-full px-4 py-3 rounded-xl border border-kalai-beige focus:outline-none focus:ring-2 focus:ring-kalai-sage/20"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-kalai-brown mb-2">Categoría *</label>
                  <input
                    type="text"
                    name="category"
                    defaultValue={editingProduct?.category}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-kalai-beige focus:outline-none focus:ring-2 focus:ring-kalai-sage/20"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-kalai-brown mb-2">URL de Imagen</label>
                  <input
                    type="url"
                    name="image_url"
                    defaultValue={editingProduct?.image_url || ''}
                    className="w-full px-4 py-3 rounded-xl border border-kalai-beige focus:outline-none focus:ring-2 focus:ring-kalai-sage/20"
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => { setShowModal(false); setEditingProduct(null) }}
                    className="flex-1 px-6 py-3 border border-kalai-beige rounded-xl hover:bg-kalai-cream transition-colors"
                  >
                    Cancelar
                  </button>
                  <button type="submit" className="flex-1 btn-primary">
                    {editingProduct ? 'Actualizar' : 'Crear'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/authStore'
import { getAllProducts, createProduct, updateProduct, deleteProduct, toggleProductActive } from '@/lib/api'
import type { Product, ProductCreate } from '@/types'
import toast from 'react-hot-toast'
import { Plus, Edit, Trash2, Power, Package } from 'lucide-react'

export default function AdminDashboard() {
  const router = useRouter()
  const { token, isAuthenticated, logout } = useAuthStore()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/admin')
      return
    }

    fetchProducts()
  }, [isAuthenticated, router])

  const fetchProducts = async () => {
    try {
      const data = await getAllProducts(token!)
      setProducts(data)
    } catch (error) {
      toast.error('Error al cargar productos')
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    logout()
    router.push('/admin')
  }

  const handleToggleActive = async (id: number) => {
    try {
      await toggleProductActive(token!, id)
      await fetchProducts()
      toast.success('Estado actualizado')
    } catch (error) {
      toast.error('Error al actualizar estado')
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('¿Estás seguro de eliminar este producto?')) return

    try {
      await deleteProduct(token!, id)
      await fetchProducts()
      toast.success('Producto eliminado')
    } catch (error) {
      toast.error('Error al eliminar producto')
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
    <div className="min-h-screen bg-kalai-white">
      {/* Header */}
      <div className="bg-white border-b border-kalai-beige">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-display font-semibold text-kalai-brown">
              Panel de Administración
            </h1>
            <p className="text-sm text-kalai-brown/60">Kalai Medical Center</p>
          </div>
          <button onClick={handleLogout} className="btn-secondary text-sm">
            Cerrar Sesión
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Actions */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-xl font-semibold text-kalai-brown">
              Productos ({products.length})
            </h2>
          </div>
          <button
            onClick={() => {
              setEditingProduct(null)
              setShowModal(true)
            }}
            className="btn-primary flex items-center gap-2"
          >
            <Plus size={20} />
            Nuevo Producto
          </button>
        </div>

        {/* Products Table */}
        {loading ? (
          <div className="text-center py-12">
            <p className="text-kalai-brown/60">Cargando productos...</p>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-12 card">
            <Package size={48} className="mx-auto text-kalai-brown/20 mb-4" />
            <p className="text-kalai-brown/60">No hay productos aún</p>
            <button
              onClick={() => setShowModal(true)}
              className="mt-4 btn-primary"
            >
              Crear Primer Producto
            </button>
          </div>
        ) : (
          <div className="card overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-kalai-beige">
                  <th className="text-left py-4 px-4 text-kalai-brown font-semibold">Producto</th>
                  <th className="text-left py-4 px-4 text-kalai-brown font-semibold">Categoría</th>
                  <th className="text-left py-4 px-4 text-kalai-brown font-semibold">Precio</th>
                  <th className="text-left py-4 px-4 text-kalai-brown font-semibold">Stock</th>
                  <th className="text-left py-4 px-4 text-kalai-brown font-semibold">Estado</th>
                  <th className="text-right py-4 px-4 text-kalai-brown font-semibold">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="border-b border-kalai-beige/50 hover:bg-kalai-cream/50">
                    <td className="py-4 px-4">
                      <div>
                        <div className="font-medium text-kalai-brown">{product.name}</div>
                        <div className="text-sm text-kalai-brown/60 line-clamp-1">{product.description}</div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="px-3 py-1 rounded-full bg-kalai-sage/10 text-kalai-sage text-sm">
                        {product.category}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-kalai-brown">{formatPrice(product.price)}</td>
                    <td className="py-4 px-4 text-kalai-brown">{product.stock}</td>
                    <td className="py-4 px-4">
                      <button
                        onClick={() => handleToggleActive(product.id)}
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          product.is_active
                            ? 'bg-green-100 text-green-700'
                            : 'bg-red-100 text-red-700'
                        }`}
                      >
                        {product.is_active ? 'Activo' : 'Inactivo'}
                      </button>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleToggleActive(product.id)}
                          className="p-2 hover:bg-kalai-beige rounded-lg transition-colors"
                          title="Activar/Desactivar"
                        >
                          <Power size={18} className="text-kalai-brown/60" />
                        </button>
                        <button
                          onClick={() => {
                            setEditingProduct(product)
                            setShowModal(true)
                          }}
                          className="p-2 hover:bg-kalai-beige rounded-lg transition-colors"
                          title="Editar"
                        >
                          <Edit size={18} className="text-kalai-sage" />
                        </button>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="p-2 hover:bg-kalai-beige rounded-lg transition-colors"
                          title="Eliminar"
                        >
                          <Trash2 size={18} className="text-red-500" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Product Modal */}
      {showModal && (
        <ProductModal
          product={editingProduct}
          onClose={() => {
            setShowModal(false)
            setEditingProduct(null)
          }}
          onSuccess={() => {
            setShowModal(false)
            setEditingProduct(null)
            fetchProducts()
          }}
          token={token!}
        />
      )}
    </div>
  )
}

// Product Modal Component
function ProductModal({
  product,
  onClose,
  onSuccess,
  token,
}: {
  product: Product | null
  onClose: () => void
  onSuccess: () => void
  token: string
}) {
  const [formData, setFormData] = useState<ProductCreate>({
    name: product?.name || '',
    description: product?.description || '',
    price: product?.price || 0,
    stock: product?.stock || 0,
    category: product?.category || '',
    image_url: product?.image_url || '',
    is_active: product?.is_active ?? true,
  })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (product) {
        await updateProduct(token, product.id, formData)
        toast.success('Producto actualizado')
      } else {
        await createProduct(token, formData)
        toast.success('Producto creado')
      }
      onSuccess()
    } catch (error) {
      toast.error('Error al guardar producto')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-kalai-beige">
          <h2 className="text-2xl font-display font-semibold text-kalai-brown">
            {product ? 'Editar Producto' : 'Nuevo Producto'}
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-kalai-brown mb-2">
              Nombre *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="input-field"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-kalai-brown mb-2">
              Descripción
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="input-field min-h-[100px]"
              rows={4}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-kalai-brown mb-2">
                Precio (₡) *
              </label>
              <input
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                className="input-field"
                min="0"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-kalai-brown mb-2">
                Stock *
              </label>
              <input
                type="number"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: Number(e.target.value) })}
                className="input-field"
                min="0"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-kalai-brown mb-2">
              Categoría
            </label>
            <input
              type="text"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="input-field"
              placeholder="Faciales, Masajes, etc."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-kalai-brown mb-2">
              URL de Imagen
            </label>
            <input
              type="url"
              value={formData.image_url}
              onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
              className="input-field"
              placeholder="https://..."
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="is_active"
              checked={formData.is_active}
              onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
              className="w-4 h-4 text-kalai-sage"
            />
            <label htmlFor="is_active" className="text-sm text-kalai-brown">
              Producto activo
            </label>
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 btn-secondary"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 btn-primary disabled:opacity-50"
            >
              {loading ? 'Guardando...' : 'Guardar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

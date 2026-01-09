import axios from 'axios'
import type { Product, ProductCreate, ProductUpdate, AdminLogin, AdminToken } from '@/types'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Public endpoints
export const getProducts = async (): Promise<Product[]> => {
  const { data } = await api.get('/api/public/products')
  return data
}

export const getProduct = async (id: number): Promise<Product> => {
  const { data } = await api.get(`/api/public/products/${id}`)
  return data
}

export const getCategories = async (): Promise<string[]> => {
  const { data } = await api.get('/api/public/categories')
  return data.categories
}

export const getWhatsAppLink = async (productId: number): Promise<string> => {
  const { data } = await api.get(`/api/public/whatsapp-link/${productId}`)
  return data.whatsapp_link
}

// Admin endpoints
export const adminLogin = async (credentials: AdminLogin): Promise<AdminToken> => {
  const { data } = await api.post('/api/admin/login', credentials)
  return data
}

export const getAllProducts = async (token: string): Promise<Product[]> => {
  const { data } = await api.get('/api/admin/products', {
    headers: { Authorization: `Bearer ${token}` }
  })
  return data
}

export const createProduct = async (token: string, product: ProductCreate): Promise<Product> => {
  const { data } = await api.post('/api/admin/products', product, {
    headers: { Authorization: `Bearer ${token}` }
  })
  return data
}

export const updateProduct = async (
  token: string,
  id: number,
  product: ProductUpdate
): Promise<Product> => {
  const { data } = await api.put(`/api/admin/products/${id}`, product, {
    headers: { Authorization: `Bearer ${token}` }
  })
  return data
}

export const deleteProduct = async (token: string, id: number): Promise<void> => {
  await api.delete(`/api/admin/products/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  })
}

export const toggleProductActive = async (token: string, id: number): Promise<Product> => {
  const { data } = await api.patch(`/api/admin/products/${id}/toggle-active`, {}, {
    headers: { Authorization: `Bearer ${token}` }
  })
  return data
}

export const updateStock = async (
  token: string,
  id: number,
  newStock: number
): Promise<Product> => {
  const { data } = await api.patch(
    `/api/admin/products/${id}/stock?new_stock=${newStock}`,
    {},
    {
      headers: { Authorization: `Bearer ${token}` }
    }
  )
  return data
}

export default api

export interface Product {
  id: number
  name: string
  description: string
  price: number
  stock: number
  image_url: string | null
  category: string
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface ProductCreate {
  name: string
  description: string
  price: number
  stock: number
  image_url?: string
  category: string
  is_active?: boolean
}

export interface ProductUpdate {
  name?: string
  description?: string
  price?: number
  stock?: number
  image_url?: string
  category?: string
  is_active?: boolean
}

export interface AdminLogin {
  username: string
  password: string
}

export interface AdminToken {
  access_token: string
  token_type: string
}

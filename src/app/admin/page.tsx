'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Lock, User } from 'lucide-react'
import toast from 'react-hot-toast'
import { adminLogin } from '@/lib/api'
import { useAuthStore } from '@/store/authStore'

export default function AdminLoginPage() {
  const router = useRouter()
  const login = useAuthStore(state => state.login)
  const [credentials, setCredentials] = useState({ username: '', password: '' })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const { access_token } = await adminLogin(credentials)
      login(access_token)
      toast.success('¡Bienvenido!')
      router.push('/admin/dashboard')
    } catch (error) {
      toast.error('Credenciales incorrectas')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-kalai-cream via-kalai-white to-kalai-beige">
      <div className="w-full max-w-md px-6">
        <div className="card">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-kalai-sage/10 mb-4">
              <Lock className="text-kalai-sage" size={32} />
            </div>
            <h1 className="text-3xl font-display font-semibold text-kalai-brown mb-2">
              Panel de Administración
            </h1>
            <p className="text-kalai-brown/60">
              Ingresa tus credenciales para continuar
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-kalai-brown mb-2">
                Usuario
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-kalai-brown/40" size={20} />
                <input
                  type="text"
                  value={credentials.username}
                  onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                  className="w-full pl-12 input-field"
                  placeholder="admin"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-kalai-brown mb-2">
                Contraseña
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-kalai-brown/40" size={20} />
                <input
                  type="password"
                  value={credentials.password}
                  onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                  className="w-full pl-12 input-field"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Ingresando...' : 'Ingresar'}
            </button>
          </form>

          {/* Back Link */}
          <div className="mt-6 text-center">
            <a
              href="/"
              className="text-sm text-kalai-sage hover:text-kalai-sage-dark transition-colors"
            >
              ← Volver al sitio
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

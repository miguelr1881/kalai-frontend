import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import ProductsGrid from '@/components/products/ProductsGrid'

export default function ProductosPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="pt-20">
        <ProductsGrid />
      </div>
      <Footer />
    </main>
  )
}

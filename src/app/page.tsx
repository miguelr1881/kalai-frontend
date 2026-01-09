import Hero from '@/components/home/Hero'
import About from '@/components/home/About'
import FeaturedProducts from '@/components/home/FeaturedProducts'
import Footer from '@/components/layout/Footer'
import Navbar from '@/components/layout/Navbar'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <FeaturedProducts />
      <Footer />
    </main>
  )
}

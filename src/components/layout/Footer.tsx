import Link from 'next/link'
import { Instagram, Facebook, Mail, Phone, MapPin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-kalai-cream border-t border-kalai-beige">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-display font-semibold text-kalai-brown mb-4">
              Kalai Medical Center
            </h3>
            <p className="text-kalai-brown/70 mb-4 max-w-sm">
              Centro de estética premium dedicado a realzar tu belleza natural con tratamientos de alta calidad.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-kalai-sage/10 hover:bg-kalai-sage hover:text-white transition-all"
              >
                <Instagram size={20} />
              </a>
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-kalai-sage/10 hover:bg-kalai-sage hover:text-white transition-all"
              >
                <Facebook size={20} />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold text-kalai-brown mb-4">Enlaces</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-kalai-brown/70 hover:text-kalai-sage transition-colors">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="/productos" className="text-kalai-brown/70 hover:text-kalai-sage transition-colors">
                  Productos
                </Link>
              </li>
              <li>
                <Link href="/nosotros" className="text-kalai-brown/70 hover:text-kalai-sage transition-colors">
                  Nosotros
                </Link>
              </li>
              <li>
                <Link href="/contacto" className="text-kalai-brown/70 hover:text-kalai-sage transition-colors">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-kalai-brown mb-4">Contacto</h4>
            <ul className="space-y-3">
              <li className="flex items-center text-kalai-brown/70">
                <Phone size={16} className="mr-2" />
                <span>+506 8892 6754</span>
              </li>
              <li className="flex items-center text-kalai-brown/70">
                <Mail size={16} className="mr-2" />
                <span>info@kalai.cr</span>
              </li>
              <li className="flex items-start text-kalai-brown/70">
                <MapPin size={16} className="mr-2 mt-1" />
                <span>Costa Rica</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-kalai-beige text-center text-kalai-brown/60 text-sm">
          <p>© 2026 Kalai Medical Center. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}

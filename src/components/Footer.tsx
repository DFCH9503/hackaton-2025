import React from 'react';
import { Utensils, MapPin, Phone, Mail, Clock, Facebook, Instagram, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Twitter, href: '#', label: 'Twitter' }
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-600 to-orange-700 rounded-full flex items-center justify-center">
                <Utensils className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Bella Vista</h3>
                <p className="text-sm text-amber-400">Restaurante Gourmet</p>
              </div>
            </div>
            <p className="text-gray-400 mb-4">
              Experiencia gastronómica única con los mejores sabores mediterráneos 
              en un ambiente elegante y acogedor.
            </p>
            <div className="flex space-x-3">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    aria-label={social.label}
                    className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-amber-600 transition-colors duration-200"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contacto</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-amber-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-gray-300">Calle Gran Vía 123</p>
                  <p className="text-gray-300">Madrid, España 28013</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-amber-400 flex-shrink-0" />
                <p className="text-gray-300">+34 912 345 678</p>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-amber-400 flex-shrink-0" />
                <p className="text-gray-300">reservas@bellavista.es</p>
              </div>
            </div>
          </div>

          {/* Hours */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Horarios</h4>
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-amber-400 flex-shrink-0" />
                <div>
                  <p className="text-gray-300">Martes - Domingo</p>
                  <p className="text-gray-400 text-sm">18:00 - 24:00</p>
                </div>
              </div>
              <div className="ml-8">
                <p className="text-gray-300">Lunes</p>
                <p className="text-gray-400 text-sm">Cerrado</p>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Enlaces Rápidos</h4>
            <div className="space-y-2">
              <a href="#" className="block text-gray-300 hover:text-amber-400 transition-colors duration-200">
                Reservar Mesa
              </a>
              <a href="#" className="block text-gray-300 hover:text-amber-400 transition-colors duration-200">
                Ver Menú
              </a>
              <a href="#" className="block text-gray-300 hover:text-amber-400 transition-colors duration-200">
                Eventos Privados
              </a>
              <a href="#" className="block text-gray-300 hover:text-amber-400 transition-colors duration-200">
                Política de Privacidad
              </a>
              <a href="#" className="block text-gray-300 hover:text-amber-400 transition-colors duration-200">
                Términos y Condiciones
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2025 Bella Vista Restaurante. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
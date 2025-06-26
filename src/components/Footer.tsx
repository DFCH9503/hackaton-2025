import React from 'react';
import { Utensils, MapPin, Phone, Mail, Clock, Facebook, Instagram} from 'lucide-react';

const Footer: React.FC = () => {
  const socialLinks = [
    { icon: Facebook, href: 'https://www.facebook.com/people/AlRock-Burger-DC/100089875367055/', label: 'Facebook' },
    { icon: Instagram, href: 'https://www.instagram.com/alrock_burger/', label: 'Instagram' },
  ];

  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-red-600 rounded-full flex items-center justify-center">
                <Utensils className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Provenza</h3>
                <p className="text-sm text-red-600">Restaurante Rockero</p>
              </div>
            </div>
            <p className="text-gray-400 mb-4">
              ¡En Al Rock Burger trabajamos para que vivas la mejor experiencia, lo demás dalo por hecho! Primer restaurante certificado en Quality Managment System
            </p>
            <div className="flex space-x-3">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    aria-label={social.label}
                    className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center hover:bg-amber-600 transition-colors duration-200"
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
                  <p className="text-gray-300">Calle 105 #26 -93</p>
                  <p className="text-gray-300">Bucaramanga - Colombia</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-amber-400 flex-shrink-0" />
                <p className="text-gray-300">+57 607 6989909</p>
                <p className="text-gray-300">+57 3156958555</p>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-amber-400 flex-shrink-0" />
                <p className="text-gray-300">info@alrockburger.com</p>
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
                  <p className="text-gray-300">Dom - Jue</p>
                  <p className="text-gray-400 text-sm">10:30 - 23:30</p>
                  <p className="text-gray-300">Vie - Sáb</p>
                  <p className="text-gray-400 text-sm">10:30 - 00:30</p>
                </div>
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
            © 2025 Alrock Burger.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
import React, { useState } from 'react';
import { Utensils, Download, Menu, X } from 'lucide-react';

interface HeaderProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const Header: React.FC<HeaderProps> = ({ activeSection, onSectionChange }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigationItems = [
    { id: 'home', label: 'Inicio' },
    { id: 'reservations', label: 'Reservas' },
    { id: 'gallery', label: 'Galería' },
    { id: 'about', label: 'Sobre Nosotros' },
    { id: 'contact', label: 'Contacto' }
  ];

  const handleMenuDownload = () => {
    // Simular descarga de PDF del menú
    const link = document.createElement('a');
    link.href = '#';
    link.download = 'menu-alrock-burger.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Mostrar notificación
    alert('¡Menú descargado exitosamente!');
  };

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => onSectionChange('home')}>
            <div className="w-12 h-12 bg-gradient-to-br from-orange-600 to-red-700 rounded-full flex items-center justify-center shadow-lg">
              <Utensils className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Alrock Burger</h1>
              <p className="text-sm text-orange-600 font-medium">Comida Rápida Gourmet</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onSectionChange(item.id)}
                className={`text-sm font-medium transition-all duration-200 hover:text-orange-600 ${
                  activeSection === item.id
                    ? 'text-orange-600 border-b-2 border-orange-600 pb-1'
                    : 'text-gray-700'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Menu Download Button */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={handleMenuDownload}
              className="bg-gradient-to-r from-orange-600 to-red-700 text-white px-6 py-3 rounded-full font-medium hover:from-orange-700 hover:to-red-800 transition-all duration-200 transform hover:scale-105 shadow-lg flex items-center space-x-2"
            >
              <Download className="w-4 h-4" />
              <span>Ver Menú</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    onSectionChange(item.id);
                    setIsMenuOpen(false);
                  }}
                  className={`text-left px-4 py-2 rounded-lg transition-all duration-200 ${
                    activeSection === item.id
                      ? 'bg-orange-50 text-orange-600 font-medium'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <button
                onClick={() => {
                  handleMenuDownload();
                  setIsMenuOpen(false);
                }}
                className="bg-gradient-to-r from-orange-600 to-red-700 text-white px-4 py-3 rounded-lg font-medium hover:from-orange-700 hover:to-red-800 transition-all duration-200 flex items-center space-x-2 mx-4"
              >
                <Download className="w-4 h-4" />
                <span>Ver Menú</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
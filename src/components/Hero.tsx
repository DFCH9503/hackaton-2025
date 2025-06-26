import React from 'react';
import { Star, MapPin, Clock } from 'lucide-react';

interface HeroProps {
  onReservationClick: () => void;
}

const Hero: React.FC<HeroProps> = ({ onReservationClick }) => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(https://images.pexels.com/photos/1633578/pexels-photo-1633578.jpeg)',
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
        <div className="mb-6">
          <div className="flex items-center justify-center space-x-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-orange-400 text-orange-400" />
            ))}
            <span className="ml-2 text-orange-400 font-medium">4.8 • 2,847 reseñas</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Las Mejores
            <span className="block text-orange-400">Hamburguesas</span>
            Gourmet
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-2xl mx-auto leading-relaxed">
            Ingredientes frescos, sabores únicos y la mejor experiencia en comida rápida gourmet. 
            ¡Cada bocado es una explosión de sabor!
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-12">
          <button
            onClick={onReservationClick}
            className="bg-gradient-to-r from-orange-600 to-red-700 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-orange-700 hover:to-red-800 transition-all duration-300 transform hover:scale-105 shadow-2xl"
          >
            Reservar Mesa
          </button>
          <button className="border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-gray-900 transition-all duration-300">
            Ver Menú
          </button>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
          <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-6 border border-white border-opacity-20">
            <MapPin className="w-8 h-8 text-orange-400 mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Ubicación Central</h3>
            <p className="text-sm text-gray-200">En el corazón de la ciudad</p>
          </div>
          <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-6 border border-white border-opacity-20">
            <Clock className="w-8 h-8 text-orange-400 mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Horarios</h3>
            <p className="text-sm text-gray-200">Lun-Dom: 11:00 - 23:00</p>
          </div>
          <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-6 border border-white border-opacity-20">
            <Star className="w-8 h-8 text-orange-400 mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Calidad Premium</h3>
            <p className="text-sm text-gray-200">Ingredientes 100% frescos</p>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
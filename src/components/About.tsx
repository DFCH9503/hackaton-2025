import React from 'react';
import { Award, Users, Clock, Heart } from 'lucide-react';

const About: React.FC = () => {
  const achievements = [
    {
      icon: Award,
      title: 'Mejor Burger 2024',
      description: 'Reconocimiento a la mejor hamburguesa gourmet de la ciudad'
    },
    {
      icon: Users,
      title: '10 Años de Experiencia',
      description: 'Sirviendo las mejores hamburguesas desde 2015'
    },
    {
      icon: Clock,
      title: 'Recetas Artesanales',
      description: 'Cada hamburguesa preparada con técnicas tradicionales'
    },
    {
      icon: Heart,
      title: 'Ingredientes Locales',
      description: 'Productos frescos de proveedores locales de confianza'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            <div className="mb-8">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Sobre Alrock Burger</h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Alrock Burger nació de la pasión por crear la hamburguesa perfecta. Desde 2015, 
                hemos revolucionado el concepto de comida rápida, elevándolo a un nivel gourmet 
                sin perder la esencia y rapidez que nos caracteriza.
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Nuestro chef ejecutivo, (Nombre), combina técnicas culinarias tradicionales 
                con innovación moderna, utilizando únicamente carne de res premium y ingredientes 
                frescos seleccionados cuidadosamente cada día.
              </p>
            </div>

            {/* Achievements Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {achievements.map((achievement, index) => {
                const Icon = achievement.icon;
                return (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-600 to-red-700 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">{achievement.title}</h3>
                      <p className="text-sm text-gray-600">{achievement.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="aspect-w-4 aspect-h-5">
              <img
                src="https://images.pexels.com/photos/1126728/pexels-photo-1126728.jpeg"
                alt="Chef Roberto Alvarado preparando hamburguesas"
                className="w-full h-96 object-cover rounded-2xl shadow-2xl"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-lg border border-gray-100">
              <div className="text-center">
                <p className="text-2xl font-bold text-orange-600">10</p>
                <p className="text-sm text-gray-600">Años de Experiencia</p>
              </div>
            </div>
            <div className="absolute -top-6 -right-6 bg-white p-6 rounded-xl shadow-lg border border-gray-100">
              <div className="text-center">
                <p className="text-2xl font-bold text-orange-600">🏆</p>
                <p className="text-sm text-gray-600">Mejor Burger 2024</p>
              </div>
            </div>
          </div>
        </div>

        {/* Mission Statement */}
        <div className="mt-20 text-center">
          <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl p-12 border border-orange-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Nuestra Misión</h3>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
              "Redefinir la experiencia de la comida rápida, ofreciendo hamburguesas gourmet 
              preparadas con ingredientes premium, en un ambiente moderno y acogedor. Cada 
              hamburguesa que servimos es una promesa de calidad, sabor y satisfacción."
            </p>
            <div className="mt-6">
              <p className="text-orange-700 font-medium">— (Nombre), Chef Ejecutivo</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
import React, { useState } from 'react';
import { ShoppingCart, Star, Leaf, Wheat } from 'lucide-react';
import { MenuItem, OrderItem } from '../types';

interface MenuSectionProps {
  menuItems: MenuItem[];
  onAddToOrder: (item: OrderItem) => void;
}

const MenuSection: React.FC<MenuSectionProps> = ({ menuItems, onAddToOrder }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [cart, setCart] = useState<OrderItem[]>([]);

  const categories = [
    { id: 'all', name: 'Todos', icon: '🍽️' },
    { id: 'appetizer', name: 'Entradas', icon: '🥗' },
    { id: 'main', name: 'Platos Principales', icon: '🍖' },
    { id: 'dessert', name: 'Postres', icon: '🍰' },
    { id: 'beverage', name: 'Bebidas', icon: '🍷' }
  ];

  const filteredItems = selectedCategory === 'all' 
    ? menuItems 
    : menuItems.filter(item => item.category === selectedCategory);

  const getDietaryIcon = (dietary: string) => {
    switch (dietary) {
      case 'vegetarian':
        return <Leaf className="w-4 h-4 text-green-600" />;
      case 'gluten-free':
        return <Wheat className="w-4 h-4 text-amber-600" />;
      default:
        return null;
    }
  };

  const addToCart = (menuItem: MenuItem) => {
    const orderItem: OrderItem = {
      menuItemId: menuItem.id,
      quantity: 1
    };
    setCart(prev => [...prev, orderItem]);
    onAddToOrder(orderItem);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
          <ShoppingCart className="w-5 h-5 text-orange-600" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Menú Disponible</h2>
          <p className="text-sm text-gray-500">Explore nuestras opciones gastronómicas</p>
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map(category => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center space-x-2 ${
              selectedCategory === category.id
                ? 'bg-orange-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <span>{category.icon}</span>
            <span>{category.name}</span>
          </button>
        ))}
      </div>

      {/* Menu Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map(item => (
          <div
            key={item.id}
            className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-200 transform hover:scale-[1.02]"
          >
            <div className="aspect-w-16 aspect-h-9 bg-gray-200">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-48 object-cover"
              />
            </div>
            
            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-gray-900">{item.name}</h3>
                <div className="flex items-center space-x-1">
                  {item.dietary.map(diet => (
                    <div key={diet} title={diet === 'vegetarian' ? 'Vegetariano' : 'Sin Gluten'}>
                      {getDietaryIcon(diet)}
                    </div>
                  ))}
                </div>
              </div>
              
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">{item.description}</p>
              
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-gray-900">${item.price}</span>
                <button
                  onClick={() => addToCart(item)}
                  disabled={!item.isAvailable}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    item.isAvailable
                      ? 'bg-orange-600 text-white hover:bg-orange-700'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {item.isAvailable ? 'Agregar' : 'No Disponible'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">🍽️</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No hay elementos en esta categoría</h3>
          <p className="text-gray-500">Seleccione otra categoría para ver más opciones</p>
        </div>
      )}
    </div>
  );
};

export default MenuSection;
import React from 'react';
import { Users, MapPin, Clock } from 'lucide-react';
import { Table } from '../types';

interface TableMapProps {
  tables: Table[];
  onTableClick: (table: Table) => void;
}

const TableMap: React.FC<TableMapProps> = ({ tables, onTableClick }) => {
  const getStatusColor = (status: Table['status']) => {
    switch (status) {
      case 'available':
        return 'bg-green-100 border-green-300 text-green-800';
      case 'occupied':
        return 'bg-red-100 border-red-300 text-red-800';
      case 'reserved':
        return 'bg-yellow-100 border-yellow-300 text-yellow-800';
      default:
        return 'bg-gray-100 border-gray-300 text-gray-800';
    }
  };

  const getStatusText = (status: Table['status']) => {
    switch (status) {
      case 'available':
        return 'Disponible';
      case 'occupied':
        return 'Ocupada';
      case 'reserved':
        return 'Reservada';
      default:
        return 'Desconocido';
    }
  };

  const getLocationIcon = (location: Table['location']) => {
    switch (location) {
      case 'outdoor':
        return '🌳';
      case 'private':
        return '🚪';
      default:
        return '🏠';
    }
  };

  const groupedTables = {
    indoor: tables.filter(t => t.location === 'indoor'),
    outdoor: tables.filter(t => t.location === 'outdoor'),
    private: tables.filter(t => t.location === 'private')
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
          <MapPin className="w-5 h-5 text-green-600" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Disponibilidad en Tiempo Real</h2>
          <p className="text-sm text-gray-500">Estado actual de todas las mesas</p>
        </div>
      </div>

      <div className="space-y-8">
        {Object.entries(groupedTables).map(([location, locationTables]) => (
          <div key={location}>
            <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center space-x-2">
              <span className="text-2xl">{getLocationIcon(location as Table['location'])}</span>
              <span className="capitalize">
                {location === 'indoor' ? 'Interior' : 
                 location === 'outdoor' ? 'Terraza' : 'Privados'}
              </span>
              <span className="text-sm text-gray-500">({locationTables.length} mesas)</span>
            </h3>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {locationTables.map((table) => (
                <div
                  key={table.id}
                  onClick={() => onTableClick(table)}
                  className={`p-4 rounded-lg border-2 transition-all duration-200 cursor-pointer hover:shadow-md transform hover:scale-105 ${getStatusColor(table.status)}`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-lg font-bold">Mesa {table.number}</span>
                    <Users className="w-4 h-4" />
                  </div>
                  
                  <div className="space-y-1 text-sm">
                    <div className="flex items-center space-x-1">
                      <Users className="w-3 h-3" />
                      <span>{table.capacity} personas</span>
                    </div>
                    
                    <div className="font-medium">
                      {getStatusText(table.status)}
                    </div>
                    
                    {table.reservedUntil && (
                      <div className="flex items-center space-x-1 text-xs">
                        <Clock className="w-3 h-3" />
                        <span>Hasta {table.reservedUntil.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h4 className="font-medium text-gray-900 mb-3">Leyenda</h4>
        <div className="flex flex-wrap gap-4 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-green-100 border border-green-300 rounded"></div>
            <span>Disponible</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-yellow-100 border border-yellow-300 rounded"></div>
            <span>Reservada</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-red-100 border border-red-300 rounded"></div>
            <span>Ocupada</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableMap;
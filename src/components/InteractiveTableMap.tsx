import React, { useState } from 'react';
import { Users, MapPin, Clock, Info, X } from 'lucide-react';
import { Table } from '../types';

interface InteractiveTableMapProps {
  tables: Table[];
  onTableSelect: (table: Table) => void;
  selectedTable?: Table | null;
}

const InteractiveTableMap: React.FC<InteractiveTableMapProps> = ({ 
  tables, 
  onTableSelect, 
  selectedTable 
}) => {
  const [hoveredTable, setHoveredTable] = useState<string | null>(null);

  const getTableStatusColor = (status: Table['status']) => {
    switch (status) {
      case 'available':
        return 'bg-green-500 hover:bg-green-600 border-green-600';
      case 'occupied':
        return 'bg-red-500 hover:bg-red-600 border-red-600 cursor-not-allowed';
      case 'reserved':
        return 'bg-yellow-500 hover:bg-yellow-600 border-yellow-600';
      default:
        return 'bg-gray-500 hover:bg-gray-600 border-gray-600';
    }
  };

  const getTableStatusText = (status: Table['status']) => {
    switch (status) {
      case 'available': return 'Disponible';
      case 'occupied': return 'Ocupada';
      case 'reserved': return 'Reservada';
      default: return 'No disponible';
    }
  };

  // Posiciones específicas basadas en el mapa del PDF
  const getTablePosition = (tableNumber: number) => {
    const positions: { [key: number]: { x: number; y: number; width: number; height: number } } = {
      // Área principal (interior)
      1: { x: 15, y: 20, width: 60, height: 40 },
      2: { x: 15, y: 70, width: 60, height: 40 },
      3: { x: 15, y: 120, width: 60, height: 40 },
      4: { x: 15, y: 170, width: 60, height: 40 },
      5: { x: 15, y: 220, width: 60, height: 40 },
      6: { x: 15, y: 270, width: 60, height: 40 },
      7: { x: 15, y: 320, width: 60, height: 40 },
      
      // Área central
      8: { x: 120, y: 50, width: 50, height: 35 },
      9: { x: 120, y: 100, width: 50, height: 35 },
      10: { x: 120, y: 150, width: 50, height: 35 },
      11: { x: 120, y: 200, width: 50, height: 35 },
      12: { x: 120, y: 250, width: 50, height: 35 },
      13: { x: 120, y: 300, width: 50, height: 35 },
      
      // Área derecha (terraza)
      14: { x: 220, y: 30, width: 55, height: 40 },
      15: { x: 220, y: 80, width: 55, height: 40 },
      16: { x: 220, y: 130, width: 55, height: 40 },
      17: { x: 220, y: 180, width: 55, height: 40 },
      18: { x: 220, y: 230, width: 55, height: 40 },
      
      // Área VIP (privada)
      19: { x: 320, y: 60, width: 70, height: 50 },
      20: { x: 320, y: 140, width: 70, height: 50 },
    };
    
    return positions[tableNumber] ;
  };

  const handleTableClick = (table: Table) => {
    if (table.status === 'occupied') return;
    onTableSelect(table);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-orange-600 to-red-700 rounded-lg flex items-center justify-center">
            <MapPin className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Mapa de Mesas</h2>
            <p className="text-sm text-gray-500">Selecciona una mesa disponible</p>
          </div>
        </div>
        
        {/* Leyenda */}
        <div className="flex items-center space-x-4 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-green-500 rounded border border-green-600"></div>
            <span>Disponible</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-yellow-500 rounded border border-yellow-600"></div>
            <span>Reservada</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-red-500 rounded border border-red-600"></div>
            <span>Ocupada</span>
          </div>
        </div>
      </div>

      {/* Mapa del restaurante */}
      <div className="relative bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-4 border-2 border-orange-200 min-h-[500px]">
        {/* Áreas del restaurante */}
        <div className="absolute top-4 left-4 text-xs font-semibold text-orange-700 bg-white px-2 py-1 rounded">
          Área Principal
        </div>
        <div className="absolute top-4 left-1/3 text-xs font-semibold text-orange-700 bg-white px-2 py-1 rounded">
          Área Central
        </div>
        <div className="absolute top-4 right-1/3 text-xs font-semibold text-orange-700 bg-white px-2 py-1 rounded">
          Terraza
        </div>
        <div className="absolute top-4 right-4 text-xs font-semibold text-orange-700 bg-white px-2 py-1 rounded">
          Área VIP
        </div>

        {/* Líneas divisorias */}
        <div className="absolute top-0 left-1/4 w-px h-full bg-orange-300 opacity-50"></div>
        <div className="absolute top-0 left-1/2 w-px h-full bg-orange-300 opacity-50"></div>
        <div className="absolute top-0 right-1/4 w-px h-full bg-orange-300 opacity-50"></div>

        {/* Mesas */}
        <svg viewBox="0 0 450 400" className="w-full h-full">
          {tables.map((table) => {
            const position = getTablePosition(table.number);
            const isSelected = selectedTable?.id === table.id;
            const isHovered = hoveredTable === table.id;
            
            return (
              <g key={table.id}>
                {/* Mesa */}
                <rect
                  x={position.x}
                  y={position.y}
                  width={position.width}
                  height={position.height}
                  rx="8"
                  className={`
                    ${getTableStatusColor(table.status)}
                    ${isSelected ? 'ring-4 ring-orange-400' : ''}
                    ${isHovered ? 'scale-105' : ''}
                    transition-all duration-200 cursor-pointer stroke-2
                  `}
                  onClick={() => handleTableClick(table)}
                  onMouseEnter={() => setHoveredTable(table.id)}
                  onMouseLeave={() => setHoveredTable(null)}
                />
                
                {/* Número de mesa */}
                <text
                  x={position.x + position.width / 2}
                  y={position.y + position.height / 2 - 5}
                  textAnchor="middle"
                  className="fill-white text-sm font-bold pointer-events-none"
                >
                  {table.number}
                </text>
                
                {/* Capacidad */}
                <text
                  x={position.x + position.width / 2}
                  y={position.y + position.height / 2 + 8}
                  textAnchor="middle"
                  className="fill-white text-xs pointer-events-none"
                >
                  {table.capacity}p
                </text>
              </g>
            );
          })}
        </svg>

        {/* Información de mesa seleccionada */}
        {selectedTable && (
          <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-lg p-4 border border-gray-200 min-w-[250px]">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-gray-900">Mesa {selectedTable.number}</h3>
              <button
                onClick={() => onTableSelect(null as any)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4 text-gray-500" />
                <span>Capacidad: {selectedTable.capacity} personas</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-gray-500" />
                <span>
                  Ubicación: {
                    selectedTable.location === 'indoor' ? 'Interior' :
                    selectedTable.location === 'outdoor' ? 'Terraza' : 'Área VIP'
                  }
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Info className="w-4 h-4 text-gray-500" />
                <span>Estado: {getTableStatusText(selectedTable.status)}</span>
              </div>
              {selectedTable.reservedUntil && (
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <span>
                    Disponible a las: {selectedTable.reservedUntil.toLocaleTimeString('es-ES', { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Información de mesa al hacer hover */}
        {hoveredTable && !selectedTable && (
          <div className="absolute bottom-4 right-4 bg-black bg-opacity-75 text-white rounded-lg p-3 text-sm pointer-events-none">
            {(() => {
              const table = tables.find(t => t.id === hoveredTable);
              return table ? (
                <div>
                  <div className="font-semibold">Mesa {table.number}</div>
                  <div>{table.capacity} personas</div>
                  <div>{getTableStatusText(table.status)}</div>
                </div>
              ) : null;
            })()}
          </div>
        )}
      </div>
    </div>
  );
};

export default InteractiveTableMap;
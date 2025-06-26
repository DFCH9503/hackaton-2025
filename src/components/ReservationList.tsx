import React from 'react';
import { Calendar, Users, Clock, Phone, Mail, MapPin } from 'lucide-react';
import { Reservation, Table } from '../types';

interface ReservationListProps {
  reservations: Reservation[];
  tables: Table[];
  onUpdateStatus: (id: string, status: Reservation['status']) => void;
}

const ReservationList: React.FC<ReservationListProps> = ({ reservations, tables, onUpdateStatus }) => {
  const getStatusColor = (status: Reservation['status']) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'completed':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusText = (status: Reservation['status']) => {
    switch (status) {
      case 'confirmed':
        return 'Confirmada';
      case 'pending':
        return 'Pendiente';
      case 'cancelled':
        return 'Cancelada';
      case 'completed':
        return 'Completada';
      default:
        return 'Desconocido';
    }
  };

  const getTableInfo = (tableId: string) => {
    return tables.find(t => t.id === tableId);
  };

  return (
    <div className="space-y-4">
      {reservations.map((reservation) => {
        const table = getTableInfo(reservation.tableId);
        return (
          <div key={reservation.id} className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{reservation.customerName}</h3>
                  <p className="text-sm text-gray-500">ID: {reservation.id}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(reservation.status)}`}>
                  {getStatusText(reservation.status)}
                </span>
                <select
                  value={reservation.status}
                  onChange={(e) => onUpdateStatus(reservation.id, e.target.value as Reservation['status'])}
                  className="text-sm border border-gray-300 rounded-lg px-3 py-1 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="pending">Pendiente</option>
                  <option value="confirmed">Confirmada</option>
                  <option value="cancelled">Cancelada</option>
                  <option value="completed">Completada</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-700">
                  {reservation.date.toLocaleDateString('es-ES')}
                </span>
              </div>
              
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-700">{reservation.time}</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-700">{reservation.partySize} personas</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-700">
                  Mesa {table?.number} ({table?.location === 'indoor' ? 'Interior' : 
                                       table?.location === 'outdoor' ? 'Terraza' : 'Privado'})
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-700">{reservation.customerPhone}</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-700">{reservation.customerEmail}</span>
              </div>
            </div>

            {reservation.specialRequests && (
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-sm font-medium text-gray-700 mb-1">Solicitudes Especiales:</p>
                <p className="text-sm text-gray-600">{reservation.specialRequests}</p>
              </div>
            )}
          </div>
        );
      })}

      {reservations.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">📅</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No hay reservas</h3>
          <p className="text-gray-500">Las nuevas reservas aparecerán aquí</p>
        </div>
      )}
    </div>
  );
};

export default ReservationList;
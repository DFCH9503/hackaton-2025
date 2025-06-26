import React from 'react';
import { Calendar, Users, Clock, TrendingUp, DollarSign, CheckCircle } from 'lucide-react';
import { Table, Reservation } from '../types';

interface DashboardProps {
  tables: Table[];
  reservations: Reservation[];
}

const Dashboard: React.FC<DashboardProps> = ({ tables, reservations }) => {
  const totalTables = tables.length;
  const availableTables = tables.filter(t => t.status === 'available').length;
  const occupiedTables = tables.filter(t => t.status === 'occupied').length;
  const reservedTables = tables.filter(t => t.status === 'reserved').length;
  
  const todayReservations = reservations.filter(r => 
    r.date.toDateString() === new Date().toDateString()
  ).length;
  
  const confirmedReservations = reservations.filter(r => r.status === 'confirmed').length;
  const pendingReservations = reservations.filter(r => r.status === 'pending').length;

  const occupancyRate = Math.round(((occupiedTables + reservedTables) / totalTables) * 100);

  const stats = [
    {
      title: 'Mesas Disponibles',
      value: availableTables,
      total: totalTables,
      icon: Users,
      color: 'green',
      trend: '+2.5%'
    },
    {
      title: 'Reservas Hoy',
      value: todayReservations,
      icon: Calendar,
      color: 'blue',
      trend: '+12%'
    },
    {
      title: 'Tasa de Ocupación',
      value: `${occupancyRate}%`,
      icon: TrendingUp,
      color: 'purple',
      trend: '+5.2%'
    },
    {
      title: 'Reservas Confirmadas',
      value: confirmedReservations,
      icon: CheckCircle,
      color: 'emerald',
      trend: '+8.1%'
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      green: 'bg-green-100 text-green-600',
      blue: 'bg-blue-100 text-blue-600',
      purple: 'bg-purple-100 text-purple-600',
      emerald: 'bg-emerald-100 text-emerald-600'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-purple-600" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Dashboard</h2>
            <p className="text-sm text-gray-500">Resumen de actividad en tiempo real</p>
          </div>
        </div>
        
        <div className="text-sm text-gray-600">
          Última actualización: {new Date().toLocaleString('es-ES')}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${getColorClasses(stat.color)}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <span className="text-sm text-green-600 font-medium">{stat.trend}</span>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-600 mb-1">{stat.title}</h3>
                <div className="flex items-baseline space-x-2">
                  <span className="text-2xl font-bold text-gray-900">{stat.value}</span>
                  {stat.total && (
                    <span className="text-sm text-gray-500">de {stat.total}</span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Table Status */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Estado de Mesas</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Disponibles</span>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="font-medium">{availableTables}</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Ocupadas</span>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <span className="font-medium">{occupiedTables}</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Reservadas</span>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <span className="font-medium">{reservedTables}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Reservations */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Reservas Recientes</h3>
          <div className="space-y-3">
            {reservations.slice(0, 3).map((reservation, index) => (
              <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                <div>
                  <p className="font-medium text-gray-900">{reservation.customerName}</p>
                  <p className="text-sm text-gray-500">
                    Mesa {tables.find(t => t.id === reservation.tableId)?.number} • {reservation.partySize} personas
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{reservation.time}</p>
                  <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                    reservation.status === 'confirmed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {reservation.status === 'confirmed' ? 'Confirmada' : 'Pendiente'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
import React, { useState } from 'react';
import { Shield, Calendar, Users, Clock, Phone, Mail, MapPin, Filter, Search, Eye, EyeOff } from 'lucide-react';
import { Reservation, Table } from '../types';

interface AdminPanelProps {
  reservations: Reservation[];
  tables: Table[];
  onUpdateReservationStatus: (id: string, status: Reservation['status']) => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ reservations, tables, onUpdateReservationStatus }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulación de autenticación (en producción usar autenticación real)
    if (password === 'admin123') {
      setIsAuthenticated(true);
    } else {
      alert('Contraseña incorrecta');
    }
  };

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
      case 'confirmed': return 'Confirmada';
      case 'pending': return 'Pendiente';
      case 'cancelled': return 'Cancelada';
      case 'completed': return 'Completada';
      default: return 'Desconocido';
    }
  };

  const getTableStatus = (status: Table['status']) => {
    switch (status) {
      case 'available': return { text: 'Disponible', color: 'bg-green-100 text-green-800' };
      case 'occupied': return { text: 'Ocupada', color: 'bg-red-100 text-red-800' };
      case 'reserved': return { text: 'Reservada', color: 'bg-yellow-100 text-yellow-800' };
      default: return { text: 'Desconocido', color: 'bg-gray-100 text-gray-800' };
    }
  };

  const filteredReservations = reservations.filter(reservation => {
    const matchesStatus = filterStatus === 'all' || reservation.status === filterStatus;
    const matchesSearch = reservation.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         reservation.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         reservation.phone.includes(searchTerm);
    return matchesStatus && matchesSearch;
  });

  const todayReservations = reservations.filter(r => r.date === new Date().toISOString().split('T')[0]);
  const pendingReservations = reservations.filter(r => r.status === 'pending');

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-amber-600 to-orange-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Panel de Administración</h2>
            <p className="text-gray-600">Acceso restringido para personal autorizado</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Contraseña de Administrador
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Ingrese la contraseña"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200 pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-amber-600 to-orange-700 text-white py-3 px-6 rounded-xl font-semibold hover:from-amber-700 hover:to-orange-800 transition-all duration-200 transform hover:scale-[1.02]"
            >
              Acceder al Panel
            </button>
          </form>

          <div className="mt-6 p-4 bg-amber-50 rounded-lg border border-amber-200">
            <p className="text-xs text-amber-800 text-center">
              <strong>Demo:</strong> Contraseña: admin123
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-2xl border border-gray-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-600 to-orange-700 text-white p-6 rounded-t-2xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Shield className="w-8 h-8" />
            <div>
              <h2 className="text-2xl font-bold">Panel de Administración</h2>
              <p className="text-amber-100">Gestión de reservas y mesas</p>
            </div>
          </div>
          <button
            onClick={() => setIsAuthenticated(false)}
            className="bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-lg transition-all duration-200"
          >
            Cerrar Sesión
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="p-6 border-b border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-blue-50 rounded-lg p-4">
            <h3 className="text-sm font-medium text-blue-600 mb-1">Total Reservas</h3>
            <p className="text-2xl font-bold text-blue-900">{reservations.length}</p>
          </div>
          <div className="bg-green-50 rounded-lg p-4">
            <h3 className="text-sm font-medium text-green-600 mb-1">Hoy</h3>
            <p className="text-2xl font-bold text-green-900">{todayReservations.length}</p>
          </div>
          <div className="bg-yellow-50 rounded-lg p-4">
            <h3 className="text-sm font-medium text-yellow-600 mb-1">Pendientes</h3>
            <p className="text-2xl font-bold text-yellow-900">{pendingReservations.length}</p>
          </div>
          <div className="bg-purple-50 rounded-lg p-4">
            <h3 className="text-sm font-medium text-purple-600 mb-1">Mesas Disponibles</h3>
            <p className="text-2xl font-bold text-purple-900">
              {tables.filter(t => t.status === 'available').length}
            </p>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1">
            <div className="relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar por nombre, email o teléfono..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
              />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
            >
              <option value="all">Todas</option>
              <option value="pending">Pendientes</option>
              <option value="confirmed">Confirmadas</option>
              <option value="cancelled">Canceladas</option>
              <option value="completed">Completadas</option>
            </select>
          </div>
        </div>

        {/* Reservations List */}
        <div className="space-y-4 mb-8">
          <h3 className="text-lg font-semibold text-gray-900">Reservas ({filteredReservations.length})</h3>
          {filteredReservations.map((reservation) => (
            <div key={reservation.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="font-semibold text-gray-900">{reservation.name}</h4>
                  <p className="text-sm text-gray-600">ID: {reservation.id}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(reservation.status)}`}>
                    {getStatusText(reservation.status)}
                  </span>
                  <select
                    value={reservation.status}
                    onChange={(e) => onUpdateReservationStatus(reservation.id, e.target.value as Reservation['status'])}
                    className="text-xs border border-gray-300 rounded px-2 py-1 focus:ring-1 focus:ring-amber-500"
                  >
                    <option value="pending">Pendiente</option>
                    <option value="confirmed">Confirmada</option>
                    <option value="cancelled">Cancelada</option>
                    <option value="completed">Completada</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <span>{reservation.date}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <span>{reservation.time}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4 text-gray-500" />
                  <span>{reservation.guests} personas</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4 text-gray-500" />
                  <span>{reservation.phone}</span>
                </div>
              </div>

              <div className="mt-2 text-sm">
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4 text-gray-500" />
                  <span>{reservation.email}</span>
                </div>
              </div>

              {reservation.notes && (
                <div className="mt-3 p-2 bg-white rounded border">
                  <p className="text-sm text-gray-600"><strong>Notas:</strong> {reservation.notes}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Tables Status */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Estado de Mesas</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {tables.map((table) => {
              const status = getTableStatus(table.status);
              return (
                <div key={table.id} className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold">Mesa {table.number}</span>
                    <MapPin className="w-4 h-4 text-gray-500" />
                  </div>
                  <div className="text-xs text-gray-600 mb-2">
                    {table.capacity} personas • {table.location === 'indoor' ? 'Interior' : table.location === 'outdoor' ? 'Terraza' : 'Privado'}
                  </div>
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${status.color}`}>
                    {status.text}
                  </span>
                  {table.reservedUntil && (
                    <div className="text-xs text-gray-500 mt-1">
                      Hasta: {table.reservedUntil.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
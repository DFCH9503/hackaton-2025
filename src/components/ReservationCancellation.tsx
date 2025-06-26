import React, { useState } from 'react';
import { Search, Calendar, X, AlertTriangle, CheckCircle, Mail, Phone } from 'lucide-react';
import { Reservation } from '../types';

interface ReservationCancellationProps {
  reservations: Reservation[];
  onCancelReservation: (id: string, reason: string) => void;
  onClose: () => void;
}

const ReservationCancellation: React.FC<ReservationCancellationProps> = ({
  reservations,
  onCancelReservation,
  onClose
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [foundReservation, setFoundReservation] = useState<Reservation | null>(null);
  const [showCancelForm, setShowCancelForm] = useState(false);
  const [cancelReason, setCancelReason] = useState('');
  const [customReason, setCustomReason] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCancelled, setIsCancelled] = useState(false);

  const cancelReasons = [
    'Cambio de planes',
    'Error en la reserva',
    'Prefiero otra fecha/hora',
    'Emergencia personal',
    'Problema de salud',
    'Otro'
  ];

  const handleSearch = () => {
    const reservation = reservations.find(r => 
      r.email.toLowerCase() === searchTerm.toLowerCase() || 
      r.id === searchTerm ||
      r.phone === searchTerm
    );
    
    if (reservation) {
      setFoundReservation(reservation);
    } else {
      setFoundReservation(null);
      alert('No se encontró ninguna reserva con esos datos.');
    }
  };

  const handleCancelReservation = async () => {
    if (!foundReservation || !cancelReason) return;
    
    setIsProcessing(true);
    
    // Simular procesamiento
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const finalReason = cancelReason === 'Otro' ? customReason : cancelReason;
    onCancelReservation(foundReservation.id, finalReason);
    
    setIsProcessing(false);
    setIsCancelled(true);
    
    // Auto cerrar después de 3 segundos
    setTimeout(() => {
      onClose();
    }, 3000);
  };

  if (isCancelled) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">¡Reserva Cancelada!</h3>
          <p className="text-gray-600 mb-4">
            Su reserva ha sido cancelada exitosamente. Recibirá un email de confirmación.
          </p>
          <p className="text-sm text-gray-500">
            Esta ventana se cerrará automáticamente...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-600 to-orange-700 text-white p-6 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Search className="w-8 h-8" />
              <div>
                <h2 className="text-2xl font-bold">Consultar/Cancelar Reserva</h2>
                <p className="text-red-100">Busque su reserva para consultar o cancelar</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="bg-white bg-opacity-20 hover:bg-opacity-30 p-2 rounded-lg transition-all duration-200"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="p-6">
          {!foundReservation ? (
            /* Búsqueda de reserva */
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Buscar reserva por:
                </label>
                <div className="space-y-4">
                  <div className="relative">
                    <Mail className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="email"
                      placeholder="Email de la reserva"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
                    />
                  </div>
                  <div className="text-center text-gray-500 text-sm">o</div>
                  <div className="relative">
                    <Phone className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="tel"
                      placeholder="Teléfono de la reserva"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
                    />
                  </div>
                  <div className="text-center text-gray-500 text-sm">o</div>
                  <div className="relative">
                    <Calendar className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="ID de la reserva"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
                    />
                  </div>
                </div>
              </div>

              <button
                onClick={handleSearch}
                disabled={!searchTerm.trim()}
                className="w-full bg-gradient-to-r from-orange-600 to-red-700 text-white py-4 px-6 rounded-xl font-semibold hover:from-orange-700 hover:to-red-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02]"
              >
                Buscar Reserva
              </button>

              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <p className="text-sm text-orange-800">
                  <strong>Nota:</strong> Puede buscar su reserva usando el email, teléfono o ID de reserva que recibió en la confirmación.
                </p>
              </div>
            </div>
          ) : !showCancelForm ? (
            /* Detalles de la reserva encontrada */
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Reserva Encontrada</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-gray-700">Nombre:</span>
                    <p className="text-gray-900">{foundReservation.name}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Email:</span>
                    <p className="text-gray-900">{foundReservation.email}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Teléfono:</span>
                    <p className="text-gray-900">{foundReservation.phone}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">ID Reserva:</span>
                    <p className="text-gray-900">{foundReservation.id}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Fecha:</span>
                    <p className="text-gray-900">{foundReservation.date}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Hora:</span>
                    <p className="text-gray-900">{foundReservation.time}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Comensales:</span>
                    <p className="text-gray-900">{foundReservation.guests} personas</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Estado:</span>
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                      foundReservation.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                      foundReservation.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {foundReservation.status === 'confirmed' ? 'Confirmada' :
                       foundReservation.status === 'pending' ? 'Pendiente' : 'Cancelada'}
                    </span>
                  </div>
                </div>
                {foundReservation.notes && (
                  <div className="mt-4">
                    <span className="font-medium text-gray-700">Notas:</span>
                    <p className="text-gray-900">{foundReservation.notes}</p>
                  </div>
                )}
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={() => setFoundReservation(null)}
                  className="flex-1 bg-gray-200 text-gray-800 py-3 px-6 rounded-xl font-semibold hover:bg-gray-300 transition-all duration-200"
                >
                  Buscar Otra
                </button>
                {foundReservation.status !== 'cancelled' && (
                  <button
                    onClick={() => setShowCancelForm(true)}
                    className="flex-1 bg-gradient-to-r from-red-600 to-red-700 text-white py-3 px-6 rounded-xl font-semibold hover:from-red-700 hover:to-red-800 transition-all duration-200"
                  >
                    Cancelar Reserva
                  </button>
                )}
              </div>
            </div>
          ) : (
            /* Formulario de cancelación */
            <div className="space-y-6">
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start space-x-3">
                <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-red-800">Cancelar Reserva</h4>
                  <p className="text-sm text-red-700">
                    Esta acción no se puede deshacer. Por favor, seleccione el motivo de la cancelación.
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Motivo de la cancelación:
                </label>
                <div className="space-y-2">
                  {cancelReasons.map((reason) => (
                    <label key={reason} className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="radio"
                        name="cancelReason"
                        value={reason}
                        checked={cancelReason === reason}
                        onChange={(e) => setCancelReason(e.target.value)}
                        className="w-4 h-4 text-orange-600 focus:ring-orange-500"
                      />
                      <span className="text-gray-700">{reason}</span>
                    </label>
                  ))}
                </div>
              </div>

              {cancelReason === 'Otro' && (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Especifique el motivo:
                  </label>
                  <textarea
                    value={customReason}
                    onChange={(e) => setCustomReason(e.target.value)}
                    rows={3}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 resize-none"
                    placeholder="Describa el motivo de la cancelación..."
                  />
                </div>
              )}

              <div className="flex space-x-4">
                <button
                  onClick={() => setShowCancelForm(false)}
                  className="flex-1 bg-gray-200 text-gray-800 py-3 px-6 rounded-xl font-semibold hover:bg-gray-300 transition-all duration-200"
                >
                  Volver
                </button>
                <button
                  onClick={handleCancelReservation}
                  disabled={!cancelReason || (cancelReason === 'Otro' && !customReason.trim()) || isProcessing}
                  className="flex-1 bg-gradient-to-r from-red-600 to-red-700 text-white py-3 px-6 rounded-xl font-semibold hover:from-red-700 hover:to-red-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                >
                  {isProcessing ? 'Procesando...' : 'Confirmar Cancelación'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReservationCancellation;
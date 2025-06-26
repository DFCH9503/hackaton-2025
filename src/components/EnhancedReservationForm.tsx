import React, { useState } from 'react';
import { Calendar, Clock, Users, User, Phone, Mail, MessageSquare, CheckCircle, ArrowLeft } from 'lucide-react';
import { Reservation, Table } from '../types';
import InteractiveTableMap from './InteractiveTableMap';

interface EnhancedReservationFormProps {
  onSubmit: (reservation: Omit<Reservation, 'id' | 'createdAt'> & { tableId?: string }) => void;
  tables: Table[];
}

const EnhancedReservationForm: React.FC<EnhancedReservationFormProps> = ({ onSubmit, tables }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedTable, setSelectedTable] = useState<Table | null>(null);
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    guests: 2,
    name: '',
    phone: '',
    email: '',
    notes: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const timeSlots = [
    '11:00', '12:00', '13:00', '14:00', '15:00', '16:00',
    '17:00', '18:00', '19:00', '20:00', '21:00', '22:00'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      status: 'pending',
      tableId: selectedTable?.id
    });
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setCurrentStep(1);
      setSelectedTable(null);
      setFormData({
        date: '',
        time: '',
        guests: 2,
        name: '',
        phone: '',
        email: '',
        notes: ''
      });
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'guests' ? parseInt(value) : value
    }));
  };

  const getAvailableTables = () => {
    return tables.filter(table => 
      table.status === 'available' && 
      table.capacity >= formData.guests
    );
  };

  const canProceedToStep2 = formData.date && formData.time && formData.guests;
  const canProceedToStep3 = selectedTable !== null;

  if (isSubmitted) {
    return (
      <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-4">¡Reserva Enviada!</h3>
        <p className="text-gray-600 mb-6">
          Hemos recibido tu solicitud de reserva. Te contactaremos pronto para confirmar los detalles.
        </p>
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
          <p className="text-orange-800 text-sm">
            <strong>Tiempo de respuesta:</strong> Máximo 2 horas en horario comercial
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
      {/* Progress Bar */}
      <div className="bg-gradient-to-r from-orange-600 to-red-700 p-4">
        <div className="flex items-center justify-between text-white">
          <div className="flex items-center space-x-4">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  currentStep >= step ? 'bg-white text-orange-600' : 'bg-orange-500 text-white'
                }`}>
                  {step}
                </div>
                {step < 3 && (
                  <div className={`w-8 h-1 mx-2 ${
                    currentStep > step ? 'bg-white' : 'bg-orange-500'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="text-right">
            <div className="text-sm opacity-90">
              {currentStep === 1 && 'Fecha y Hora'}
              {currentStep === 2 && 'Seleccionar Mesa'}
              {currentStep === 3 && 'Datos Personales'}
            </div>
            <div className="text-xs opacity-75">Paso {currentStep} de 3</div>
          </div>
        </div>
      </div>

      <div className="p-8">
        {currentStep === 1 && (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Fecha y Hora</h2>
              <p className="text-gray-600">Seleccione cuándo desea visitarnos</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  <Calendar className="w-4 h-4 inline mr-2 text-orange-600" />
                  Fecha
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  <Clock className="w-4 h-4 inline mr-2 text-orange-600" />
                  Hora
                </label>
                <select
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
                >
                  <option value="">Seleccione hora</option>
                  {timeSlots.map(time => (
                    <option key={time} value={time}>{time}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  <Users className="w-4 h-4 inline mr-2 text-orange-600" />
                  Comensales
                </label>
                <select
                  name="guests"
                  value={formData.guests}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                    <option key={num} value={num}>{num} persona{num > 1 ? 's' : ''}</option>
                  ))}
                </select>
              </div>
            </div>

            <button
              onClick={() => setCurrentStep(2)}
              disabled={!canProceedToStep2}
              className="w-full bg-gradient-to-r from-orange-600 to-red-700 text-white py-4 px-6 rounded-xl text-lg font-semibold hover:from-orange-700 hover:to-red-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02]"
            >
              Continuar - Seleccionar Mesa
            </button>
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Seleccionar Mesa</h2>
              <p className="text-gray-600">
                Elija su mesa preferida para {formData.guests} persona{formData.guests > 1 ? 's' : ''}
              </p>
            </div>

            <InteractiveTableMap
              tables={getAvailableTables()}
              onTableSelect={setSelectedTable}
              selectedTable={selectedTable}
            />

            <div className="flex space-x-4">
              <button
                onClick={() => setCurrentStep(1)}
                className="flex items-center space-x-2 bg-gray-200 text-gray-800 py-3 px-6 rounded-xl font-semibold hover:bg-gray-300 transition-all duration-200"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Volver</span>
              </button>
              <button
                onClick={() => setCurrentStep(3)}
                disabled={!canProceedToStep3}
                className="flex-1 bg-gradient-to-r from-orange-600 to-red-700 text-white py-3 px-6 rounded-xl font-semibold hover:from-orange-700 hover:to-red-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
                Continuar - Datos Personales
              </button>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Datos Personales</h2>
              <p className="text-gray-600">Complete sus datos para confirmar la reserva</p>
            </div>

            {/* Resumen de la reserva */}
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6">
              <h3 className="font-semibold text-orange-800 mb-2">Resumen de su reserva:</h3>
              <div className="text-sm text-orange-700 space-y-1">
                <p><strong>Fecha:</strong> {formData.date}</p>
                <p><strong>Hora:</strong> {formData.time}</p>
                <p><strong>Comensales:</strong> {formData.guests} persona{formData.guests > 1 ? 's' : ''}</p>
                <p><strong>Mesa:</strong> Mesa {selectedTable?.number} ({
                  selectedTable?.location === 'indoor' ? 'Interior' :
                  selectedTable?.location === 'outdoor' ? 'Terraza' : 'Área VIP'
                })</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  <User className="w-4 h-4 inline mr-2 text-orange-600" />
                  Nombre Completo
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Su nombre completo"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  <Phone className="w-4 h-4 inline mr-2 text-orange-600" />
                  Teléfono
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  placeholder="+34 600 000 000"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                <Mail className="w-4 h-4 inline mr-2 text-orange-600" />
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="su.email@ejemplo.com"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                <MessageSquare className="w-4 h-4 inline mr-2 text-orange-600" />
                Notas Especiales (Opcional)
              </label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows={4}
                placeholder="Alergias, preferencias, celebraciones especiales..."
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 resize-none"
              />
            </div>

            <div className="flex space-x-4">
              <button
                type="button"
                onClick={() => setCurrentStep(2)}
                className="flex items-center space-x-2 bg-gray-200 text-gray-800 py-3 px-6 rounded-xl font-semibold hover:bg-gray-300 transition-all duration-200"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Volver</span>
              </button>
              <button
                type="submit"
                className="flex-1 bg-gradient-to-r from-orange-600 to-red-700 text-white py-4 px-6 rounded-xl text-lg font-semibold hover:from-orange-700 hover:to-red-800 transition-all duration-200 transform hover:scale-[1.02]"
              >
                Confirmar Reserva
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default EnhancedReservationForm;
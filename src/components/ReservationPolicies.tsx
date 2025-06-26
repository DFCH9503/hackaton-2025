import React from 'react';
import { Info, Clock, Phone, AlertCircle } from 'lucide-react';

const ReservationPolicies: React.FC = () => {
  return (
    <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-8 border border-amber-200">
      <div className="text-center mb-6">
        <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Info className="w-6 h-6 text-amber-600" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Política de Reservas</h3>
        <p className="text-gray-600">Información importante para su reserva</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <Clock className="w-5 h-5 text-amber-600 mt-1 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-gray-900 mb-1">Confirmación</h4>
              <p className="text-sm text-gray-600">
                Las reservas se confirman en un máximo de 2 horas durante horario comercial.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <Phone className="w-5 h-5 text-amber-600 mt-1 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-gray-900 mb-1">Contacto</h4>
              <p className="text-sm text-gray-600">
                Para reservas de más de 8 personas, contacte directamente al +57 3156958555 o al +57 607 6989909.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <AlertCircle className="w-5 h-5 text-amber-600 mt-1 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-gray-900 mb-1">Puntualidad</h4>
              <p className="text-sm text-gray-600">
                Las mesas se mantienen reservadas durante 15 minutos después de la hora acordada.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-white rounded-lg p-4 border border-amber-200">
            <h4 className="font-semibold text-gray-900 mb-2">Cancelaciones</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Cancelación gratuita hasta 4 horas antes</li>
            </ul>
          </div>

          <div className="bg-white rounded-lg p-4 border border-amber-200">
            <h4 className="font-semibold text-gray-900 mb-2">Horarios Especiales</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Dom - Jue 10:30 - 23:30</li>
              <li>• Vie - Sáb 10:30 - 00:30</li>
              <li>• Festivos: Consultar disponibilidad</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-6 p-4 bg-amber-100 rounded-lg border border-amber-300">
        <p className="text-sm text-amber-800 text-center">
          <strong>Nota:</strong> Para garantizar la mejor experiencia, recomendamos realizar reservas con al menos 24 horas de antelación.
        </p>
      </div>
    </div>
  );
};

export default ReservationPolicies;
import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import EnhancedReservationForm from './components/EnhancedReservationForm';
import ReservationPolicies from './components/ReservationPolicies';
import ReservationCancellation from './components/ReservationCancellation';
import AdminPanel from './components/AdminPanel';
import Gallery from './components/Gallery';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { mockReservations, mockTables, mockGalleryImages } from './data/mockData';
import { Reservation, Table } from './types';
import { ArrowLeft, Search } from 'lucide-react';

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [reservations, setReservations] = useState<Reservation[]>(mockReservations);
  const [tables, setTables] = useState<Table[]>(mockTables);
  const [showAdmin, setShowAdmin] = useState(false);
  const [showCancellation, setShowCancellation] = useState(false);

  const handleNewReservation = (newReservation: Omit<Reservation, 'id' | 'createdAt'> & { tableId?: string }) => {
    const reservation: Reservation = {
      ...newReservation,
      id: Date.now().toString(),
      createdAt: new Date()
    };
    
    setReservations(prev => [...prev, reservation]);

    // Actualizar estado de la mesa si se seleccionó una
    if (newReservation.tableId) {
      setTables(prev => prev.map(table =>
        table.id === newReservation.tableId 
          ? { ...table, status: 'reserved', reservedUntil: new Date(Date.now() + 2 * 60 * 60 * 1000) }
          : table
      ));
    }
  };

  const handleUpdateReservationStatus = (id: string, status: Reservation['status']) => {
    setReservations(prev => prev.map(reservation =>
      reservation.id === id ? { ...reservation, status } : reservation
    ));
  };

  const handleCancelReservation = (id: string, reason: string) => {
    setReservations(prev => prev.map(reservation =>
      reservation.id === id 
        ? { ...reservation, status: 'cancelled', notes: `${reservation.notes || ''}\nMotivo de cancelación: ${reason}` }
        : reservation
    ));
    
    // Liberar la mesa si estaba reservada
    const cancelledReservation = reservations.find(r => r.id === id);
    if (cancelledReservation) {
      setTables(prev => prev.map(table =>
        table.status === 'reserved' ? { ...table, status: 'available', reservedUntil: undefined } : table
      ));
    }
  };

  const renderContent = () => {
    if (showAdmin) {
      return (
        <AdminPanel
          reservations={reservations}
          tables={tables}
          onUpdateReservationStatus={handleUpdateReservationStatus}
        />
      );
    }

    switch (activeSection) {
      case 'home':
        return <Hero onReservationClick={() => setActiveSection('reservations')} />;
      
      case 'reservations':
        return (
          <section className="py-20 bg-gray-50">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">Reservas</h2>
                <p className="text-xl text-gray-600">
                  Reserve su mesa y disfrute de nuestras deliciosas hamburguesas gourmet
                </p>
              </div>
              
              <div className="space-y-12">
                <EnhancedReservationForm 
                  onSubmit={handleNewReservation} 
                  tables={tables}
                />
                <ReservationPolicies />
              </div>

              {/* Botones de acción */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
                <button
                  onClick={() => setShowCancellation(true)}
                  className="flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-200 transform hover:scale-[1.02]"
                >
                  <Search className="w-5 h-5" />
                  <span>Consultar/Cancelar Reserva</span>
                </button>
                
                <button
                  onClick={() => setShowAdmin(true)}
                  className="text-sm text-gray-500 hover:text-orange-600 transition-colors duration-200 px-4 py-2"
                >
                  Acceso Administración
                </button>
              </div>
            </div>

            {/* Modal de cancelación */}
            {showCancellation && (
              <ReservationCancellation
                reservations={reservations}
                onCancelReservation={handleCancelReservation}
                onClose={() => setShowCancellation(false)}
              />
            )}
          </section>
        );
      
      case 'gallery':
        return <Gallery images={mockGalleryImages} />;
      
      case 'about':
        return <About />;
      
      case 'contact':
        return <Contact />;
      
      default:
        return <Hero onReservationClick={() => setActiveSection('reservations')} />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {!showAdmin && (
        <Header 
          activeSection={activeSection} 
          onSectionChange={(section) => {
            setActiveSection(section);
            setShowAdmin(false);
          }} 
        />
      )}
      
      {showAdmin && (
        <div className="bg-gradient-to-r from-orange-600 to-red-700 text-white p-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <button
              onClick={() => {
                setShowAdmin(false);
                setActiveSection('reservations');
              }}
              className="flex items-center space-x-2 bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-lg transition-all duration-200"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Salir del Panel de Administración</span>
            </button>
            <h1 className="text-xl font-bold">Panel de Administración - Alrock Burger</h1>
          </div>
        </div>
      )}
      
      <main>
        {renderContent()}
      </main>
      
      {!showAdmin && <Footer />}
    </div>
  );
}

export default App;
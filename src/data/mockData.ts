import { Reservation, Table, MenuItem, GalleryImage } from '../types';

export const mockReservations: Reservation[] = [
  {
    id: '1',
    date: '2025-01-15',
    time: '19:00',
    guests: 4,
    name: 'Carlos Mendoza',
    phone: '+34 612 345 678',
    email: 'carlos@example.com',
    notes: 'Mesa junto a la ventana si es posible',
    status: 'confirmed',
    createdAt: new Date('2025-01-10T14:30:00')
  },
  {
    id: '2',
    date: '2025-01-15',
    time: '20:30',
    guests: 2,
    name: 'Ana García',
    phone: '+34 687 654 321',
    email: 'ana@example.com',
    status: 'pending',
    createdAt: new Date('2025-01-11T10:15:00')
  },
  {
    id: '3',
    date: '2025-01-16',
    time: '18:30',
    guests: 6,
    name: 'Miguel Torres',
    phone: '+34 654 987 321',
    email: 'miguel@example.com',
    notes: 'Celebración de aniversario',
    status: 'confirmed',
    createdAt: new Date('2025-01-09T16:45:00')
  }
];

export const mockTables: Table[] = [
  // Área principal (interior)
  { id: '1', number: 1, capacity: 2, status: 'available', location: 'indoor' },
  { id: '2', number: 2, capacity: 2, status: 'reserved', location: 'indoor', reservedUntil: new Date('2025-01-15T21:00:00') },
  { id: '3', number: 3, capacity: 2, status: 'occupied', location: 'indoor' },
  { id: '4', number: 4, capacity: 2, status: 'available', location: 'indoor' },
  { id: '5', number: 5, capacity: 2, status: 'available', location: 'indoor' },
  { id: '6', number: 6, capacity: 2, status: 'occupied', location: 'indoor' },
  { id: '7', number: 7, capacity: 2, status: 'available', location: 'indoor' },
  
  // Área central
  { id: '8', number: 8, capacity: 4, status: 'available', location: 'indoor' },
  { id: '9', number: 9, capacity: 4, status: 'reserved', location: 'indoor', reservedUntil: new Date('2025-01-15T19:30:00') },
  { id: '10', number: 10, capacity: 4, status: 'available', location: 'indoor' },
  { id: '11', number: 11, capacity: 4, status: 'available', location: 'indoor' },
  { id: '12', number: 12, capacity: 4, status: 'occupied', location: 'indoor' },
  { id: '13', number: 13, capacity: 4, status: 'available', location: 'indoor' },
  
  // Terraza
  { id: '14', number: 14, capacity: 4, status: 'available', location: 'outdoor' },
  { id: '15', number: 15, capacity: 4, status: 'available', location: 'outdoor' },
  { id: '16', number: 16, capacity: 4, status: 'reserved', location: 'outdoor', reservedUntil: new Date('2025-01-15T20:00:00') },
  { id: '17', number: 17, capacity: 4, status: 'available', location: 'outdoor' },
  { id: '18', number: 18, capacity: 4, status: 'available', location: 'outdoor' },
  
  // Área VIP (privada)
  { id: '19', number: 19, capacity: 8, status: 'available', location: 'private' },
  { id: '20', number: 20, capacity: 8, status: 'available', location: 'private' }
];

export const mockMenuItems: MenuItem[] = [
  {
    id: '1',
    name: 'Alrock Burger Clásica',
    description: 'Carne de res 200g, queso cheddar, lechuga, tomate, cebolla y salsa especial',
    price: 12.90,
    category: 'Hamburguesas',
    image: 'https://images.pexels.com/photos/1633578/pexels-photo-1633578.jpeg',
    isAvailable: true
  },
  {
    id: '2',
    name: 'Papas Fritas Crujientes',
    description: 'Papas cortadas a mano, fritas hasta la perfección con sal marina',
    price: 4.50,
    category: 'Acompañamientos',
    image: 'https://images.pexels.com/photos/1553783/pexels-photo-1553783.jpeg',
    isAvailable: true
  },
  {
    id: '3',
    name: 'Milkshake de Vainilla',
    description: 'Cremoso batido de vainilla con crema batida y cereza',
    price: 5.90,
    category: 'Bebidas',
    image: 'https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg',
    isAvailable: true
  }
];

export const mockGalleryImages: GalleryImage[] = [
  {
    id: '1',
    url: 'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg',
    alt: 'Interior moderno del restaurante Alrock Burger',
    category: 'interior'
  },
  {
    id: '2',
    url: 'https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg',
    alt: 'Hamburguesa gourmet especialidad de la casa',
    category: 'food'
  },
  {
    id: '3',
    url: 'https://images.pexels.com/photos/1581384/pexels-photo-1581384.jpeg',
    alt: 'Terraza exterior con ambiente relajado',
    category: 'exterior'
  },
  {
    id: '4',
    url: 'https://images.pexels.com/photos/1395967/pexels-photo-1395967.jpeg',
    alt: 'Variedad de bebidas y batidos',
    category: 'food'
  },
  {
    id: '5',
    url: 'https://images.pexels.com/photos/1307698/pexels-photo-1307698.jpeg',
    alt: 'Área privada para eventos especiales',
    category: 'events'
  },
  {
    id: '6',
    url: 'https://images.pexels.com/photos/1126728/pexels-photo-1126728.jpeg',
    alt: 'Chef preparando hamburguesas frescas',
    category: 'food'
  }
];
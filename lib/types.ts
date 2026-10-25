export interface PropertyData {
  title: string;
  price: string;
  image: string;
  location?: string;
  type?: string; // Villa, Apartment, Penthouse, Plot, Farmhouse, Commercial
  bhk?: string; // 1 BHK, 2 BHK, 3 BHK, 4+ BHK, Studio
  bathrooms?: string;
  area?: string; // e.g., 2,400 sq.ft
  furnishing?: string; // Furnished, Semi-Furnished, Unfurnished
  facing?: string; // East, North, Sea Facing, etc.
  status?: string; // Ready to Move, Under Construction, Resale, Urgent Sale
  amenities?: string[]; // Swimming Pool, Parking, Gym, etc.
  description?: string;
  sellerName?: string;
  sellerPhone?: string; // WhatsApp number
  sellerRole?: string; // Owner, Verified Broker, Builder
  timestamp?: number;
}

export const PROPERTY_TYPES = [
  'Independent Villa',
  'Luxury Apartment',
  'Penthouse',
  'Farmhouse / Estate',
  'Commercial Office',
  'Residential Plot',
  'Duplex / Builder Floor',
  'Studio Apartment',
] as const;

export const BHK_OPTIONS = ['1 RK', '1 BHK', '2 BHK', '3 BHK', '4 BHK', '5+ BHK', 'Commercial Space', 'Plot'] as const;

export const FURNISHING_OPTIONS = ['Fully Furnished', 'Semi-Furnished', 'Unfurnished'] as const;

export const STATUS_OPTIONS = ['Ready to Move', 'Urgent Sale', 'New Launch', 'Resale', 'For Rent', 'Under Construction'] as const;

export const COMMON_AMENITIES = [
  'Swimming Pool',
  'Covered Parking',
  'Gym & Fitness',
  '24/7 Security & CCTV',
  'Private Balcony / Terrace',
  'Modular Kitchen',
  'Lift / Elevator',
  'Power Backup',
  'Children Play Area',
  'Club House',
  'Vaastu Compliant',
  'Sea / Skyline View',
  'Lush Green Garden',
  'Gated Community',
];

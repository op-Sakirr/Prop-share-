import { PropertyData } from './types';

export interface PresetProperty {
  id: string;
  name: string;
  category: string;
  image: string;
  defaultData: PropertyData;
}

export const PRESET_PROPERTIES: PresetProperty[] = [
  {
    id: 'modern-villa',
    name: 'Sunset Bay Luxury Villa',
    category: 'Independent Villa',
    image: '/presets/luxury_modern_villa_1792955666247.jpg',
    defaultData: {
      title: 'Sunset Bay Modern Infinity Villa',
      price: '₹ 4.85 Crore',
      image: '/presets/luxury_modern_villa_1792955666247.jpg',
      location: 'Palm Beach Road, Seawoods / Goa Coastline',
      type: 'Independent Villa',
      bhk: '4 BHK',
      bathrooms: '5 Baths',
      area: '4,200 sq.ft',
      furnishing: 'Fully Furnished',
      facing: 'West (Sunset Ocean Facing)',
      status: 'Ready to Move',
      amenities: [
        'Swimming Pool',
        'Private Balcony / Terrace',
        'Covered Parking',
        '24/7 Security & CCTV',
        'Modular Kitchen',
        'Power Backup',
        'Sea / Skyline View',
      ],
      description:
        'Architectural masterpiece featuring double-height ceiling glass facades, a private infinity pool overlooking the horizon, Italian marble flooring, and smart home automation.',
      sellerName: 'Vikramaditya Singhania',
      sellerPhone: '+91 98765 43210',
      sellerRole: 'Owner',
    },
  },
  {
    id: 'skyline-penthouse',
    name: 'The Crown Skyline Penthouse',
    category: 'Penthouse',
    image: '/presets/luxury_penthouse_skyline_1792955666167.jpg',
    defaultData: {
      title: 'The Crown Panoramic 42nd Floor Penthouse',
      price: '₹ 7.20 Crore',
      image: '/presets/luxury_penthouse_skyline_1792955666167.jpg',
      location: 'Worli Sea Face / Bandra West, Mumbai',
      type: 'Penthouse',
      bhk: '5+ BHK',
      bathrooms: '6 Baths',
      area: '5,600 sq.ft',
      furnishing: 'Fully Furnished',
      facing: 'North-East',
      status: 'Ready to Move',
      amenities: [
        'Lift / Elevator',
        'Covered Parking',
        'Gym & Fitness',
        '24/7 Security & CCTV',
        'Sea / Skyline View',
        'Club House',
        'Power Backup',
      ],
      description:
        'Ultra-exclusive duplex penthouse boasting 360-degree city skyline views, private access elevator, bespoke bar lounge, and wrap-around viewing deck.',
      sellerName: 'Aarav Mehta & Associates',
      sellerPhone: '+91 99887 76655',
      sellerRole: 'Verified Broker',
    },
  },
  {
    id: 'designer-apartment',
    name: 'Serene Haven 3BHK Residence',
    category: 'Luxury Apartment',
    image: '/presets/contemporary_apartment_1792955667675.jpg',
    defaultData: {
      title: 'Serene Haven Modern 3BHK Sunlit Residence',
      price: '₹ 1.65 Crore',
      image: '/presets/contemporary_apartment_1792955667675.jpg',
      location: 'Sector 62, Golf Course Ext Road, Gurgaon',
      type: 'Luxury Apartment',
      bhk: '3 BHK',
      bathrooms: '3 Baths',
      area: '2,150 sq.ft',
      furnishing: 'Semi-Furnished',
      facing: 'East (Morning Sunlight)',
      status: 'Ready to Move',
      amenities: [
        'Covered Parking',
        'Modular Kitchen',
        'Private Balcony / Terrace',
        'Gym & Fitness',
        'Children Play Area',
        '24/7 Security & CCTV',
        'Vaastu Compliant',
      ],
      description:
        'Tastefully crafted contemporary family home with acoustic double-glazed windows, Scandinavian oak finishes, premium German sanitary fittings, and cross-ventilation.',
      sellerName: 'Rajesh Sharma',
      sellerPhone: '+91 98111 22334',
      sellerRole: 'Owner',
    },
  },
  {
    id: 'country-farmhouse',
    name: 'Emerald Pines Country Estate',
    category: 'Farmhouse / Estate',
    image: '/presets/green_farmhouse_estate_1792955666773.jpg',
    defaultData: {
      title: 'Emerald Pines Heritage Farmhouse & Orchard',
      price: '₹ 3.40 Crore',
      image: '/presets/green_farmhouse_estate_1792955666773.jpg',
      location: 'Chattarpur / Sohna Greens, NCR',
      type: 'Farmhouse / Estate',
      bhk: '4 BHK',
      bathrooms: '4 Baths',
      area: '1.25 Acres (4,000 sq.ft built-up)',
      furnishing: 'Fully Furnished',
      facing: 'North',
      status: 'Urgent Sale',
      amenities: [
        'Lush Green Garden',
        'Swimming Pool',
        'Covered Parking',
        '24/7 Security & CCTV',
        'Power Backup',
        'Gated Community',
      ],
      description:
        'Peaceful organic countryside living with a sprawling stone porch, private pool, fruit orchard, gazebo, solar power backup, and gated private driveway.',
      sellerName: 'Capt. R. S. Chauhan',
      sellerPhone: '+91 97123 45678',
      sellerRole: 'Owner',
    },
  },
];

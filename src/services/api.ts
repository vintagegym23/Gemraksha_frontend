import { Product, Category } from '../types';

const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Royal Blue Sapphire',
    slug: 'royal-blue-sapphire',
    description: 'A stunning 5-carat royal blue sapphire with exceptional clarity and brilliance.',
    price: 12500,
    images: ['https://picsum.photos/seed/sapphire/800/1000'],
    category: 'Sapphires',
    details: {
      origin: 'Ceylon',
      weight: '5.2 Carats',
      treatment: 'Unheated',
      shape: 'Oval',
    },
    stock: 5,
  },
  {
    id: '2',
    name: 'Pigeon Blood Ruby',
    slug: 'pigeon-blood-ruby',
    description: 'Rare 3-carat pigeon blood ruby from Burma, certified for its intense red color.',
    price: 25000,
    images: ['https://picsum.photos/seed/ruby/800/1000'],
    category: 'Rubies',
    details: {
      origin: 'Burma',
      weight: '3.1 Carats',
      treatment: 'Unheated',
      shape: 'Cushion',
    },
    stock: 2,
  },
  {
    id: '3',
    name: 'Colombian Emerald',
    slug: 'colombian-emerald',
    description: 'Vibrant green Colombian emerald with minimal inclusions and a classic emerald cut.',
    price: 8900,
    images: ['https://picsum.photos/seed/emerald/800/1000'],
    category: 'Emeralds',
    details: {
      origin: 'Colombia',
      weight: '4.5 Carats',
      treatment: 'Minor Oil',
      shape: 'Emerald Cut',
    },
    stock: 8,
  },
  {
    id: '4',
    name: 'Padparadscha Sapphire',
    slug: 'padparadscha-sapphire',
    description: 'Exquisite pink-orange Padparadscha sapphire, a true collector\'s piece.',
    price: 18000,
    images: ['https://picsum.photos/seed/padparadscha/800/1000'],
    category: 'Sapphires',
    details: {
      origin: 'Sri Lanka',
      weight: '2.8 Carats',
      treatment: 'Unheated',
      shape: 'Pear',
    },
    stock: 1,
  },
];

const MOCK_CATEGORIES: Category[] = [
  { id: '1', name: 'Sapphires', slug: 'sapphires', image: 'https://picsum.photos/seed/cat-sapphire/400/400' },
  { id: '2', name: 'Rubies', slug: 'rubies', image: 'https://picsum.photos/seed/cat-ruby/400/400' },
  { id: '3', name: 'Emeralds', slug: 'emeralds', image: 'https://picsum.photos/seed/cat-emerald/400/400' },
  { id: '4', name: 'Diamonds', slug: 'diamonds', image: 'https://picsum.photos/seed/cat-diamond/400/400' },
];

export const api = {
  getProducts: async (): Promise<Product[]> => {
    return new Promise((resolve) => setTimeout(() => resolve(MOCK_PRODUCTS), 500));
  },
  getProductBySlug: async (slug: string): Promise<Product | undefined> => {
    return new Promise((resolve) => setTimeout(() => resolve(MOCK_PRODUCTS.find(p => p.slug === slug)), 300));
  },
  getCategories: async (): Promise<Category[]> => {
    return new Promise((resolve) => setTimeout(() => resolve(MOCK_CATEGORIES), 300));
  },
};

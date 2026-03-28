export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  details: {
    origin: string;
    weight: string;
    treatment: string;
    shape: string;
  };
  stock: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
}

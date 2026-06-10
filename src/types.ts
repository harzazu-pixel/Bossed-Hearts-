export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  images: string[];
  sizes: number[];
  features: { title: string; desc: string }[];
}

export interface CartItem {
  cartItemId: string; // Unique ID for the cart line item
  product: Product;
  size: number;
  quantity: number;
}

export interface Order {
  id: string;
  date: string;
  customerName: string;
  phone: string;
  address: string;
  city: string;
  items: CartItem[];
  total: number;
  status: 'Pending' | 'Shipped' | 'Delivered' | 'Cancelled';
}

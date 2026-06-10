import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product, CartItem, Order } from './types';

const defaultFeaturedProduct: Product = {
  id: 'bossed-hearts-slide-01',
  name: 'كلاكات الـ Bossed Hearts الصيفية',
  price: 49.00,
  description: 'عيشي متعة الراحة لي ما توفاش. الكلاكات متاعنا مخدومة بـ Premium EVA Foam باش تمتص الصدمات، تنحي الضغط على المفاصل وتخلي كل خطوة تبان خفيفة ريشة. بتصميمها المزيان والـ Minimalist، تواتيك في الدار، في قديانك، ولا وين ما تحبي تحسي بروحك مزيانة ومرتاحة.',
  images: [
    '/slide-1.jpg',
    '/slide-2.jpg',
    '/slide-3.jpg',
    '/slide-4.jpg',
    '/slide-5.jpg'
  ],
  sizes: [36, 37, 38, 39, 40, 41],
  features: [
    { title: 'خفة كي السحاب', desc: 'Semelle Orthopédique خشينة ورطبة تعطي ساقك الدلال والراحة نهار كامل.' },
    { title: 'مضادة للتزحلق', desc: 'ثبات كامل وضد الزلقان، مريحة وآمنة في الدوش، في الدار ولا لبرة.' },
    { title: 'مقاومة للماء وسهلة التنظيف', desc: 'صحيحة، تتغسل في ثواني وما تفقدش شكلها المزيان والمنفوخ بالوقت.' },
    { title: 'تصميم مريح', desc: 'ما تعملش حساسية، ما تجرحش الصوابع، وتتحرك مع ساقك بكل خفة وسلاسة.' }
  ]
};

interface StoreState {
  products: Product[];
  orders: Order[];
  cart: CartItem[];
  isCartOpen: boolean;
  
  // Actions
  setCartOpen: (isOpen: boolean) => void;
  addToCart: (product: Product, size: number, quantity: number) => void;
  removeFromCart: (cartItemId: string) => void;
  clearCart: () => void;
  
  updateProduct: (product: Product) => void;
  placeOrder: (orderData: Omit<Order, 'id' | 'date' | 'status' | 'items' | 'total'>) => Order;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
}

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      products: [defaultFeaturedProduct],
      orders: [],
      cart: [],
      isCartOpen: false,

      setCartOpen: (isOpen) => set({ isCartOpen: isOpen }),

      addToCart: (product, size, quantity) => set((state) => {
        const existingItemIndex = state.cart.findIndex(
          item => item.product.id === product.id && item.size === size
        );

        if (existingItemIndex >= 0) {
          const newCart = [...state.cart];
          newCart[existingItemIndex].quantity += quantity;
          return { cart: newCart, isCartOpen: true };
        }

        return {
          cart: [...state.cart, { cartItemId: crypto.randomUUID(), product, size, quantity }],
          isCartOpen: true
        };
      }),

      removeFromCart: (cartItemId) => set((state) => ({
        cart: state.cart.filter(item => item.cartItemId !== cartItemId)
      })),

      clearCart: () => set({ cart: [] }),

      updateProduct: (updatedProduct) => set((state) => ({
        products: state.products.map(p => p.id === updatedProduct.id ? updatedProduct : p)
      })),

      placeOrder: (orderData) => {
        const state = get();
        const total = state.cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
        
        const newOrder: Order = {
          ...orderData,
          id: `ORD-${Math.random().toString(36).substring(2, 9).toUpperCase()}`,
          date: new Date().toISOString(),
          items: [...state.cart],
          total,
          status: 'Pending'
        };

        set({ orders: [newOrder, ...state.orders], cart: [], isCartOpen: false });
        return newOrder;
      },

      updateOrderStatus: (orderId, status) => set((state) => ({
        orders: state.orders.map(o => o.id === orderId ? { ...o, status } : o)
      })),
    }),
    {
      name: 'bossed-hearts-store-storage-v4'
    }
  )
);

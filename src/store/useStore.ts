import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem, Product } from '../types';

interface CartStore {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: () => number;
  totalPrice: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product) => {
        const items = get().items;
        const existingItem = items.find((item) => item.id === product.id);

        if (existingItem) {
          set({
            items: items.map((item) =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          });
        } else {
          set({ items: [...items, { ...product, quantity: 1 }] });
        }
      },
      removeItem: (productId) => {
        set({ items: get().items.filter((item) => item.id !== productId) });
      },
      updateQuantity: (productId, quantity) => {
        set({
          items: get().items.map((item) =>
            item.id === productId ? { ...item, quantity: Math.max(0, quantity) } : item
          ).filter(item => item.quantity > 0),
        });
      },
      clearCart: () => set({ items: [] }),
      totalItems: () => get().items.reduce((acc, item) => acc + item.quantity, 0),
      totalPrice: () => get().items.reduce((acc, item) => acc + item.price * item.quantity, 0),
    }),
    {
      name: 'gemraksha-cart',
    }
  )
);



interface Toast {
  id: number;
  message: string;
  type: 'success' | 'error';
}

interface UIStore {
  isCartOpen: boolean;
  isMenuOpen: boolean;
  isMetalRatesOpen: boolean;
  isSearchOpen: boolean;
  cartConfetti: boolean;
  toasts: Toast[];
  setCartOpen: (open: boolean) => void;
  setMenuOpen: (open: boolean) => void;
  setMetalRatesOpen: (open: boolean) => void;
  setSearchOpen: (open: boolean) => void;
  setCartConfetti: (val: boolean) => void;
  addToast: (message: string, type?: 'success' | 'error') => void;
  removeToast: (id: number) => void;
}

export const useUIStore = create<UIStore>((set) => ({
  isCartOpen: false,
  isMenuOpen: false,
  isMetalRatesOpen: false,
  toasts: [],
  isSearchOpen: false,
  cartConfetti: false,
  setCartOpen: (open) => set({ isCartOpen: open }),
  setMenuOpen: (open) => set({ isMenuOpen: open }),
  setMetalRatesOpen: (open) => set({ isMetalRatesOpen: open }),
  setSearchOpen: (open) => set({ isSearchOpen: open }),
  setCartConfetti: (val) => set({ cartConfetti: val }),
  addToast: (message, type = 'success') => {
    const id = Date.now();
    set((state) => ({
      toasts: [...state.toasts, { id, message, type }],
    }));
    setTimeout(() => {
      set((state) => ({
        toasts: state.toasts.filter((t) => t.id !== id),
      }));
    }, 3000);
  },
  removeToast: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    })),
}));


import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, User } from './types';

interface Coupon {
  code: string;
  discount: number; // percentage
  type: 'all' | 'rent';
}

interface StoreContextType {
  cart: CartItem[];
  wishlist: Product[];
  user: User | null;
  coupon: Coupon | null;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  addToCart: (product: Product, quantity: number, type: 'Buy' | 'Rent') => void;
  removeFromCart: (productId: string, type: 'Buy' | 'Rent') => void;
  updateCartQuantity: (productId: string, type: 'Buy' | 'Rent', quantity: number) => void;
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
  login: (user: User) => void;
  logout: () => void;
  clearCart: () => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const VALID_COUPONS: Coupon[] = [
  { code: 'ZARIYAA10', discount: 10, type: 'all' },
  { code: 'FESTIVE20', discount: 20, type: 'all' },
  { code: 'RENT15', discount: 15, type: 'rent' },
];

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('zariyaa_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [wishlist, setWishlist] = useState<Product[]>(() => {
    const saved = localStorage.getItem('zariyaa_wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('zariyaa_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [coupon, setCoupon] = useState<Coupon | null>(() => {
    const saved = sessionStorage.getItem('zariyaa_coupon');
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    localStorage.setItem('zariyaa_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('zariyaa_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('zariyaa_user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    if (coupon) {
      sessionStorage.setItem('zariyaa_coupon', JSON.stringify(coupon));
    } else {
      sessionStorage.removeItem('zariyaa_coupon');
    }
  }, [coupon]);

  const applyCoupon = (code: string) => {
    const found = VALID_COUPONS.find(c => c.code.toUpperCase() === code.toUpperCase());
    if (found) {
      setCoupon(found);
      return { success: true, message: `Royal discount of ${found.discount}% applied!` };
    }
    return { success: false, message: 'Invalid coupon code.' };
  };

  const removeCoupon = () => setCoupon(null);

  const addToCart = (product: Product, quantity: number, type: 'Buy' | 'Rent') => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id && item.transactionType === type);
      if (existing) {
        return prev.map(item => 
          (item.product.id === product.id && item.transactionType === type)
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity, transactionType: type }];
    });
  };

  const removeFromCart = (productId: string, type: 'Buy' | 'Rent') => {
    setCart(prev => prev.filter(item => !(item.product.id === productId && item.transactionType === type)));
  };

  const updateCartQuantity = (productId: string, type: 'Buy' | 'Rent', quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId, type);
      return;
    }
    setCart(prev => prev.map(item => 
      (item.product.id === productId && item.transactionType === type)
        ? { ...item, quantity }
        : item
    ));
  };

  const toggleWishlist = (product: Product) => {
    setWishlist(prev => {
      const exists = prev.find(p => p.id === product.id);
      if (exists) {
        return prev.filter(p => p.id !== product.id);
      }
      return [...prev, product];
    });
  };

  const isInWishlist = (productId: string) => wishlist.some(p => p.id === productId);

  const login = (userData: User) => setUser(userData);
  const logout = () => {
    setUser(null);
    localStorage.removeItem('zariyaa_user');
  };

  const clearCart = () => setCart([]);

  return (
    <StoreContext.Provider value={{ 
      cart, wishlist, user, coupon,
      applyCoupon, removeCoupon,
      addToCart, removeFromCart, updateCartQuantity, 
      toggleWishlist, isInWishlist,
      login, logout, clearCart
    }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};


import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type Product = {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
  features: string[];
  inStock: boolean;
};

type CartItem = {
  product: Product;
  quantity: number;
};

type User = {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  isSeller?: boolean;
};

type StoreContextType = {
  products: Product[];
  cartItems: CartItem[];
  wishlist: Product[];
  user: User | null;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateCartItemQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: number) => void;
  login: (user: User) => void;
  logout: () => void;
  cartTotal: number;
  getCartItemQuantity: (productId: number) => number;
  isInWishlist: (productId: number) => boolean;
};

const defaultStoreContext: StoreContextType = {
  products: [],
  cartItems: [],
  wishlist: [],
  user: null,
  addToCart: () => {},
  removeFromCart: () => {},
  updateCartItemQuantity: () => {},
  clearCart: () => {},
  addToWishlist: () => {},
  removeFromWishlist: () => {},
  login: () => {},
  logout: () => {},
  cartTotal: 0,
  getCartItemQuantity: () => 0,
  isInWishlist: () => false,
};

export const StoreContext = createContext<StoreContextType>(defaultStoreContext);

export const useStore = () => useContext(StoreContext);

export const StoreProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Load demo products
    setProducts([
      {
        id: 1,
        name: "Pro Basketball",
        price: 89.99,
        category: "Basketball",
        image: "/basketball.jpg",
        description: "Professional grade basketball with superior grip and durability. Perfect for indoor and outdoor courts.",
        features: ["Official size and weight", "Superior grip", "Durable composite leather", "Suitable for indoor and outdoor use"],
        inStock: true,
      },
      {
        id: 2,
        name: "Running Shoes Elite",
        price: 129.99,
        category: "Footwear",
        image: "/running-shoes.jpg",
        description: "Lightweight running shoes with responsive cushioning for maximum comfort during long runs.",
        features: ["Breathable mesh upper", "Responsive cushioning", "Durable rubber outsole", "Reflective details"],
        inStock: true,
      },
      {
        id: 3,
        name: "Tennis Racket Pro",
        price: 159.99,
        category: "Tennis",
        image: "/tennis-racket.jpg",
        description: "Professional tennis racket with optimal balance of power and control.",
        features: ["Lightweight frame", "Large sweet spot", "Vibration dampening", "Includes protective cover"],
        inStock: true,
      },
      {
        id: 4,
        name: "Fitness Tracker Plus",
        price: 79.99,
        category: "Electronics",
        image: "/fitness-tracker.jpg",
        description: "Advanced fitness tracker with heart rate monitoring and GPS tracking.",
        features: ["Heart rate monitor", "GPS tracking", "Sleep analysis", "Waterproof design", "7-day battery life"],
        inStock: true,
      },
      {
        id: 5,
        name: "Premium Yoga Mat",
        price: 45.99,
        category: "Yoga",
        image: "/yoga-mat.jpg",
        description: "Extra thick yoga mat with non-slip surface for stability and comfort during practice.",
        features: ["6mm thickness", "Non-slip texture", "Eco-friendly materials", "Includes carrying strap"],
        inStock: true,
      },
      {
        id: 6,
        name: "Mountain Bike Pro",
        price: 899.99,
        category: "Cycling",
        image: "/mountain-bike.jpg",
        description: "High-performance mountain bike with front suspension and premium components.",
        features: ["Aluminum frame", "Front suspension", "21 speeds", "Disc brakes", "All-terrain tires"],
        inStock: false,
      },
      {
        id: 7,
        name: "Soccer Ball Elite",
        price: 49.99,
        category: "Soccer",
        image: "/soccer-ball.jpg",
        description: "Professional soccer ball with excellent flight stability and durability.",
        features: ["Size 5 official", "Hand-stitched panels", "Water-resistant surface", "Enhanced visibility design"],
        inStock: true,
      },
      {
        id: 8,
        name: "Weightlifting Gloves",
        price: 34.99,
        category: "Fitness",
        image: "/weightlifting-gloves.jpg",
        description: "Premium weightlifting gloves with wrist support for maximum protection and grip.",
        features: ["Reinforced palm", "Adjustable wrist support", "Breathable material", "Anti-slip grip"],
        inStock: true,
      },
    ]);

    // Load cart items from localStorage if available
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }

    // Load wishlist from localStorage if available
    const storedWishlist = localStorage.getItem("wishlist");
    if (storedWishlist) {
      setWishlist(JSON.parse(storedWishlist));
    }

    // Check for logged in user in localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Save cart items to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  // Save user to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  const addToCart = (product: Product) => {
    const existingItem = cartItems.find((item) => item.product.id === product.id);
    if (existingItem) {
      updateCartItemQuantity(product.id, existingItem.quantity + 1);
    } else {
      setCartItems([...cartItems, { product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId: number) => {
    setCartItems(cartItems.filter((item) => item.product.id !== productId));
  };

  const updateCartItemQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems(
      cartItems.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const addToWishlist = (product: Product) => {
    if (!wishlist.some((item) => item.id === product.id)) {
      setWishlist([...wishlist, product]);
    }
  };

  const removeFromWishlist = (productId: number) => {
    setWishlist(wishlist.filter((product) => product.id !== productId));
  };

  const login = (user: User) => {
    setUser(user);
  };

  const logout = () => {
    setUser(null);
  };

  const cartTotal = cartItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  const getCartItemQuantity = (productId: number) => {
    const item = cartItems.find((item) => item.product.id === productId);
    return item ? item.quantity : 0;
  };

  const isInWishlist = (productId: number) => {
    return wishlist.some((product) => product.id === productId);
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        cartItems,
        wishlist,
        user,
        addToCart,
        removeFromCart,
        updateCartItemQuantity,
        clearCart,
        addToWishlist,
        removeFromWishlist,
        login,
        logout,
        cartTotal,
        getCartItemQuantity,
        isInWishlist,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

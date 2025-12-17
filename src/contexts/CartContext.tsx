import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

/* =====================
   TYPES
===================== */

export interface CartItem {
  cartItemId: string;
  productId: string;
  productName: string;
  productImage: string;
  price: number;
  quantity: number;
  totalPrice: number;
}

interface CartContextType {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  fetchCart: () => Promise<void>;
  addToCart: (productId: string, quantity?: number) => Promise<void>;
  updateQuantity: (cartItemId: string, quantity: number) => Promise<void>;
  removeFromCart: (cartItemId: string) => Promise<void>;
  clearCart: () => Promise<void>;
}

/* =====================
   CONTEXT
===================== */

const CartContext = createContext<CartContextType | undefined>(
  undefined
);

const token = localStorage.getItem("token");

const headers: HeadersInit = {
  "Content-Type": "application/json",
};

if (token) {
  headers.Authorization = `Bearer ${token}`;
}


/* =====================
   PROVIDER
===================== */

export const CartProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const token = localStorage.getItem("token");

  /* =====================
     HEADERS (GIỐNG LOGIN)
  ===================== */

  const authHeaders =
     {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      }

  /* =====================
     FETCH CART
  ===================== */

  const fetchCart = async () => {
    const res = await fetch("/api/cart", {
      headers: authHeaders,
    });

    if (!res.ok) {
      setItems([]);
      return;
    }

    const data = await res.json();
    setItems(data);
  };

  /* =====================
     ADD TO CART
  ===================== */

  const addToCart = async (
    productId: string,
    quantity = 1
  ) => {
    const res = await fetch("/api/cart/add", {
      method: "POST",
      headers,
      body: JSON.stringify({
        productId,
        quantity,
      }),
    });

    if (!res.ok) {
      throw new Error("Add to cart failed");
    }

    await fetchCart();
  };

  /* =====================
     UPDATE QUANTITY
  ===================== */

  const updateQuantity = async (
    cartItemId: string,
    quantity: number
  ) => {
    if (quantity <= 0) {
      await removeFromCart(cartItemId);
      return;
    }

    const res = await fetch(`/api/cart/${cartItemId}`, {
      method: "PUT",
      headers: authHeaders,
      body: JSON.stringify({ quantity }),
    });

    if (!res.ok) {
      throw new Error("Update quantity failed");
    }

    await fetchCart();
  };

  /* =====================
     REMOVE ITEM
  ===================== */

  const removeFromCart = async (cartItemId: string) => {
    const res = await fetch(`/api/cart/${cartItemId}`, {
      method: "DELETE",
      headers: authHeaders,
    });

    if (!res.ok) {
      throw new Error("Remove item failed");
    }

    await fetchCart();
  };

  /* =====================
     CLEAR CART
  ===================== */

  const clearCart = async () => {
    const res = await fetch("/api/cart/clear", {
      method: "DELETE",
      headers: authHeaders,
    });

    if (!res.ok) {
      throw new Error("Clear cart failed");
    }

    setItems([]);
  };

  /* =====================
     TOTALS
  ===================== */

  const totalItems = items.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const totalPrice = items.reduce(
    (sum, item) => sum + item.totalPrice,
    0
  );

  /* =====================
     AUTO LOAD CART
  ===================== */

  useEffect(() => {
    if (token) {
      fetchCart();
    }
  }, [token]);

  return (
    <CartContext.Provider
      value={{
        items,
        totalItems,
        totalPrice,
        fetchCart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

/* =====================
   HOOK
===================== */

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error(
      "useCart must be used inside CartProvider"
    );
  }
  return context;
};

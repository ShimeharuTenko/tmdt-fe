import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../contexts/CartContext";
import { Header } from "../../layouts/AppHeader";
import { Footer } from "../../layouts/AppFooter";

export const CartPage: React.FC = () => {
  const {
    items,
    totalItems,
    totalPrice,
    updateQuantity,
    removeFromCart,
  } = useCart();

  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-[#f2f0ec] text-[#111]">
      <Header />

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-10 mt-20">
        <h1 className="text-2xl font-semibold mb-6">Your cart</h1>

        {/* EMPTY CART */}
        {items.length === 0 && (
          <p className="text-gray-600">Your cart is empty.</p>
        )}

        {/* CART ITEMS */}
        {items.length > 0 && (
          <>
            <div className="space-y-6 mb-10">
              {items.map((item) => (
                <div
                  key={item.cartItemId}
                  className="flex items-center gap-4 bg-white rounded-lg p-4 shadow-sm"
                >
                  {/* IMAGE */}
                  <img
                    src={item.productImage || "/placeholder.png"}
                    alt={item.productName}
                    className="w-20 h-20 object-contain bg-[#f9f7f3] rounded-md"
                  />

                  {/* INFO */}
                  <div className="flex-1">
                    <p className="font-medium">{item.productName}</p>
                    <p className="mt-1 text-sm">
                      {item.price.toLocaleString("vi-VN")} đ
                    </p>
                  </div>

                  {/* QUANTITY */}
                  <div className="flex items-center gap-2">
                    <button
                      className="px-2 py-1 border rounded cursor-pointer"
                      onClick={() =>
                        updateQuantity(
                          item.cartItemId,
                          item.quantity - 1
                        )
                      }
                    >
                      -
                    </button>

                    <span className="min-w-[24px] text-center">
                      {item.quantity}
                    </span>

                    <button
                      className="px-2 py-1 border rounded cursor-pointer"
                      onClick={() =>
                        updateQuantity(
                          item.cartItemId,
                          item.quantity + 1
                        )
                      }
                    >
                      +
                    </button>
                  </div>

                  {/* TOTAL */}
                  <div className="w-24 text-right text-sm font-medium">
                    {item.totalPrice.toLocaleString("vi-VN")} đ
                  </div>

                  {/* REMOVE */}
                  <button
                    className="text-xs text-red-500 ml-4 hover:underline cursor-pointer"
                    onClick={() => removeFromCart(item.cartItemId)}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            {/* SUMMARY */}
            <div className="flex items-center justify-between border-t pt-4">
              <div>
                <p className="text-sm text-gray-600">
                  Total items:{" "}
                  <span className="font-medium">{totalItems}</span>
                </p>
                <p className="text-lg font-semibold">
                  Total: {totalPrice.toLocaleString("vi-VN")} đ
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  className="px-5 py-2 bg-black text-white rounded text-sm"
                  onClick={() => navigate("/checkout")}
                  disabled={items.length === 0}
                  style={{
                    opacity: items.length === 0 ? 0.6 : 1,
                    cursor:
                      items.length === 0 ? "not-allowed" : "pointer",
                  }}
                >
                  Checkout
                </button>
              </div>
            </div>
          </>
        )}
      </main>

      <Footer />
    </div>
  );
};

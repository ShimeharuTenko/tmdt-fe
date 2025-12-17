import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../contexts/CartContext";
import { Header } from "../../layouts/AppHeader";
import { Footer } from "../../layouts/AppFooter";

type CheckoutPayload = {
  customer: {
    fullName: string;
    email?: string;
    phone: string;
    address: string;
    note?: string;
  };
  paymentMethod: "cod" | "card";
  items: {
    productId: string;
    name: string;
    sku?: string | null;
    price: number;
    quantity: number;
  }[];
  shipping: {
    method: string;
    cost: number;
  };
  total: number;
};

export const CheckoutPage: React.FC = () => {
  const { items, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [note, setNote] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"cod" | "card">("cod");
  const [shippingMethod, setShippingMethod] = useState<
    "standard" | "express"
  >("standard");
  const [loading, setLoading] = useState(false);

  const shippingCost = shippingMethod === "express" ? 20000 : 0;

  const totalWithShipping = useMemo(
    () => Number(totalPrice) + Number(shippingCost),
    [totalPrice, shippingCost]
  );

  const formatPrice = (v: number) =>
    v.toLocaleString("vi-VN", { maximumFractionDigits: 0 });

  const validate = () => {
    if (!fullName.trim()) {
      alert("Please enter your full name");
      return false;
    }
    if (!phone.trim()) {
      alert("Please enter your phone number");
      return false;
    }
    if (!address.trim()) {
      alert("Please enter shipping address");
      return false;
    }
    if (items.length === 0) {
      alert("Your cart is empty");
      return false;
    }
    return true;
  };

  const handlePlaceOrder = async () => {
    if (!validate()) return;

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login first");
      navigate("/login");
      return;
    }

    const payload: CheckoutPayload = {
      customer: {
        fullName,
        email,
        phone,
        address,
        note,
      },
      paymentMethod,
      items: items.map((i) => ({
        productId: i.productId,
        name: i.productName,
        price: i.price,
        quantity: i.quantity,
      })),
      shipping: {
        method: shippingMethod,
        cost: shippingCost,
      },
      total: totalWithShipping,
    };

    try {
      setLoading(true);

      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.message || "Checkout failed");
      }

      const orderId = data.orderId || data.id;

      clearCart();
      navigate(`/order-confirmation/${orderId}`);
    } catch (err: any) {
      console.error(err);
      alert(err?.message || "Failed to place order");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f2f0ec] text-[#111]">
      <Header />

      <main className="flex-1 max-w-6xl mx-auto w-full px-4 py-12 mt-20">
        <h1 className="text-2xl font-semibold mb-6">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT */}
          <div className="lg:col-span-2 bg-white rounded-lg p-6 shadow-sm">
            <h2 className="font-medium mb-4">Shipping information</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <input
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Full name *"
                className="border p-3 rounded"
              />
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Phone number *"
                className="border p-3 rounded"
              />
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email (optional)"
                className="border p-3 rounded"
              />
              <select
                value={shippingMethod}
                onChange={(e) =>
                  setShippingMethod(
                    e.target.value as "standard" | "express"
                  )
                }
                className="border p-3 rounded"
              >
                <option value="standard">Standard shipping (Free)</option>
                <option value="express">Express (20.000 đ)</option>
              </select>
            </div>

            <div className="mt-4">
              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Shipping address *"
                rows={3}
                className="w-full border p-3 rounded"
              />
            </div>

            <div className="mt-4">
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Order note (optional)"
                rows={2}
                className="w-full border p-3 rounded"
              />
            </div>

            <div className="mt-6">
              <h3 className="font-medium mb-2">Payment</h3>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    checked={paymentMethod === "cod"}
                    onChange={() => setPaymentMethod("cod")}
                  />
                  <span>Cash on delivery</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    checked={paymentMethod === "card"}
                    onChange={() => setPaymentMethod("card")}
                  />
                  <span>Card (mock)</span>
                </label>
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <button
                disabled={loading}
                onClick={handlePlaceOrder}
                className="bg-black text-white px-6 py-3 rounded uppercase tracking-wider hover:bg-gray-800 disabled:opacity-60 cursor-pointer"
              >
                {loading ? "Placing order..." : "Place order"}
              </button>

              <button
                onClick={() => navigate("/cart")}
                className="px-4 py-3 border rounded cursor-pointer"
              >
                Back to cart
              </button>
            </div>
          </div>

          {/* RIGHT */}
          <aside className="bg-white rounded-lg p-6 shadow-sm">
            <h2 className="font-medium mb-4">Order summary</h2>

            <div className="space-y-4">
              {items.map((it) => (
                <div key={it.productId} className="flex gap-3">
                  <img
                    src={it.productImage || "/placeholder.png"}
                    alt={it.productName}
                    className="w-16 h-16 object-contain bg-[#f9f7f3] rounded"
                  />
                  <div className="flex-1">
                    <div className="font-medium">{it.productName}</div>
                    <div className="text-xs text-gray-500">
                      Qty: {it.quantity}
                    </div>
                  </div>
                  <div className="text-sm">
                    {(it.price * it.quantity).toLocaleString("vi-VN")} đ
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t mt-4 pt-4 space-y-2">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Subtotal</span>
                <span>{formatPrice(totalPrice)} đ</span>
              </div>

              <div className="flex justify-between text-sm text-gray-600">
                <span>Shipping</span>
                <span>
                  {shippingCost
                    ? `${formatPrice(shippingCost)} đ`
                    : "Free"}
                </span>
              </div>

              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>{formatPrice(totalWithShipping)} đ</span>
              </div>
            </div>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
};

// src/pages/order-confirmation/OrderConfirmationPage.tsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Header } from "../../layouts/AppHeader";
import { Footer } from "../../layouts/AppFooter";

type Order = {
  id: string;
  userId: string;
  totalAmount: number;
  status: string;
  createdAt: string;
};

export const OrderConfirmationPage: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();

  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!orderId) return;

    const fetchOrder = async () => {
      try {
        setLoading(true);
        setError("");

        const token = localStorage.getItem("token");
        if (!token) throw new Error("Not authenticated");

        const res = await fetch(`/api/orders/${orderId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          const text = await res.text();
          throw new Error(text || "Failed to load order");
        }

        const data: Order = await res.json();
        setOrder(data);
      } catch (err: any) {
        console.error(err);
        setError(err.message || "Failed to load order");
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  const formatPrice = (v?: number | null) =>
    typeof v === "number"
      ? v.toLocaleString("vi-VN") + " đ"
      : "0 đ";

  return (
    <div className="min-h-screen flex flex-col bg-[#f2f0ec] text-[#111]">
      <Header />

      <main className="flex-1 max-w-3xl mx-auto w-full px-4 py-12 mt-20">
        {loading && <p>Loading order...</p>}

        {!loading && error && (
          <div className="bg-red-100 text-red-700 p-4 rounded">
            {error}
          </div>
        )}

        {!loading && order && (
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h1 className="text-2xl font-semibold mb-2">
              Order placed successfully 🎉
            </h1>

            <p className="text-sm text-gray-600 mb-6">
              Order ID: <span className="font-medium">{order.id}</span>
            </p>

            {/* ORDER INFO */}
            <div className="space-y-3 text-sm">
              <p>
                <span className="text-gray-500">Status:</span>{" "}
                <span className="font-medium">{order.status}</span>
              </p>

              <p>
                <span className="text-gray-500">Total amount:</span>{" "}
                <span className="font-semibold">
                  {formatPrice(order.totalAmount)}
                </span>
              </p>

              <p>
                <span className="text-gray-500">Created at:</span>{" "}
                {new Date(order.createdAt).toLocaleString("vi-VN")}
              </p>
            </div>

            {/* ACTIONS */}
            <div className="flex gap-3 mt-8">
              <button
                onClick={() => navigate("/")}
                className="px-4 py-2 border rounded cursor-pointer"
              >
                Continue shopping
              </button>

              <button
                onClick={() => navigate("/orders")}
                className="px-4 py-2 bg-black text-white rounded cursor-pointer"
              >
                View my orders
              </button>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

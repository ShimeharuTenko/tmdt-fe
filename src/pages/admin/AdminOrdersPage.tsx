// src/pages/admin/AdminOrdersPage.tsx
import React, { useEffect, useState } from "react";
import { Header } from "../../layouts/AppHeader";
import { Footer } from "../../layouts/AppFooter";
import type { Order } from "../../types/order";

export const AdminOrdersPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const token = localStorage.getItem("token");

  const formatPrice = (v?: number) =>
    typeof v === "number"
      ? v.toLocaleString("vi-VN") + " đ"
      : "-";

  const formatDate = (v?: string) =>
    v ? new Date(v).toLocaleString("vi-VN") : "-";

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch("/api/admin/orders", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error("Failed to load orders");
        }

        const data = await res.json();
        setOrders(data);
      } catch (err: any) {
        console.error(err);
        setError(err?.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [token]);

  return (
    <div className="min-h-screen flex flex-col bg-[#f2f0ec] text-[#111]">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-10 mt-20">
        <h1 className="text-2xl font-semibold mb-6">
          Admin – Orders View
        </h1>

        {loading && <p>Loading orders...</p>}

        {error && <p className="text-red-500">{error}</p>}

        {!loading && !error && (
          <div className="bg-white rounded-lg shadow overflow-x-auto">
            <table className="w-full border-collapse">
              <thead className="bg-gray-100 text-sm">
                <tr>
                  <th className="text-left p-3 border">Order ID</th>
                  <th className="text-left p-3 border">User ID</th>
                  <th className="text-right p-3 border">Total</th>
                  <th className="text-center p-3 border">Status</th>
                  <th className="text-left p-3 border">Created At</th>
                </tr>
              </thead>

              <tbody>
                {orders.length === 0 && (
                  <tr>
                    <td
                      colSpan={5}
                      className="p-6 text-center text-gray-500"
                    >
                      No orders found
                    </td>
                  </tr>
                )}

                {orders.map((o) => (
                  <tr key={o.id} className="hover:bg-gray-50">
                    <td className="p-3 border text-xs break-all">
                      {o.id}
                    </td>

                    <td className="p-3 border text-xs break-all">
                      {o.userId}
                    </td>

                    <td className="p-3 border text-right font-medium">
                      {formatPrice(o.totalAmount)}
                    </td>

                    <td className="p-3 border text-center">
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium
                          ${
                            o.status === "PENDING"
                              ? "bg-yellow-100 text-yellow-700"
                              : o.status === "PAID"
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                      >
                        {o.status}
                      </span>
                    </td>

                    <td className="p-3 border text-sm">
                      {formatDate(o.createdAt)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

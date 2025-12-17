import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../../layouts/AppHeader";
import { Footer } from "../../layouts/AppFooter";

type Order = {
  id: string;
  userId: string;
  totalAmount: number;
  status: "PENDING" | "PAID" | "CANCELLED";
  createdAt: string;
};

export const MyOrdersPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const formatPrice = (v: number) =>
    v.toLocaleString("vi-VN", { maximumFractionDigits: 0 }) + " đ";

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleString("vi-VN");

  const getStatusBadge = (status: Order["status"]) => {
    switch (status) {
      case "PAID":
        return "bg-green-100 text-green-700";
      case "CANCELLED":
        return "bg-red-100 text-red-700";
      default:
        return "bg-yellow-100 text-yellow-700";
    }
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }

        const res = await fetch("/api/orders", {
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
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col bg-[#f2f0ec] text-[#111]">
      <Header />

      <main className="flex-1 max-w-6xl mx-auto w-full px-4 py-12 mt-20">
        <h1 className="text-2xl font-semibold mb-6">My Orders</h1>

        {loading && <div>Loading orders...</div>}

        {error && (
          <div className="text-red-600 mb-4">{error}</div>
        )}

        {!loading && orders.length === 0 && (
          <div className="text-gray-500">
            You have no orders yet.
          </div>
        )}

        {!loading && orders.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 text-sm text-gray-600">
                <tr>
                  <th className="text-left p-4">Order ID</th>
                  <th className="text-left p-4">Date</th>
                  <th className="text-right p-4">Total</th>
                  <th className="text-center p-4">Status</th>
                  <th className="p-4"></th>
                </tr>
              </thead>

              <tbody>
                {orders.map((order) => (
                  <tr
                    key={order.id}
                    className="border-t hover:bg-gray-50"
                  >
                    <td className="p-4 text-sm font-mono">
                      {order.id}
                    </td>

                    <td className="p-4 text-sm">
                      {formatDate(order.createdAt)}
                    </td>

                    <td className="p-4 text-right font-medium">
                      {formatPrice(order.totalAmount)}
                    </td>

                    <td className="p-4 text-center">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(
                          order.status
                        )}`}
                      >
                        {order.status}
                      </span>
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

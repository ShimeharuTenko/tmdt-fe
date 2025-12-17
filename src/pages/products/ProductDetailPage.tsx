// src/pages/products/ProductDetailPage.tsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Spin, Alert } from "antd";
import type { Product } from "../../types/product";
import { Header } from "../../layouts/AppHeader";
import { Footer } from "../../layouts/AppFooter";
import { useCart } from "../../contexts/CartContext";

export const ProductDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { addToCart } = useCart();
//   const [recommended, setRecommended] = useState<Product[]>([]);

  useEffect(() => {
    if (!slug) return;

    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(`/api/products/${slug}`);

        if (!res.ok) {
          throw new Error("Failed to load product");
        }

        const data = await res.json();
        setProduct(data);
      } catch (err: any) {
        console.error(err);
        setError(err?.message || "Failed to load product");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [slug]);

  const formatPrice = (price?: number) =>
    typeof price === "number"
      ? `${price.toLocaleString("vi-VN")} đ`
      : "";

return (
  <div className="min-h-screen flex flex-col bg-[#f2f0ec] text-[#111]">
    <header className="w-full bg-white">
      <Header />
    </header>

    <main className="flex-1 flex justify-center">
      <div className="w-full max-w-6xl px-4 lg:px-0">
        {loading && (
          <div className="flex justify-center py-20">
            <Spin size="large" />
          </div>
        )}

        {error && !loading && (
          <Alert type="error" message={error} showIcon />
        )}

        {!loading && !error && product && (
          <section className="h-[calc(100vh-140px)] flex items-center">
            <div
              className="
                grid grid-cols-1 lg:grid-cols-2
                bg-white rounded-xl shadow-sm
                overflow-hidden w-full
              "
            >
                {/* LEFT: IMAGE */}
                <div className="bg-[#f9f7f3] flex items-center justify-center p-10 h-full">
                    <img
                    src={product.thumbnail || '/placeholder.png'}
                    alt={product.name}
                    className="w-full max-w-[520px] max-h-[80vh] h-auto object-contain"
                    />
                </div>

                {/* RIGHT: INFO */}
                <div className="px-10 py-10 lg:py-14 flex flex-col justify-center h-full">
                {/* category small text */}
                <p className="text-[11px] tracking-[0.24em] text-gray-500 uppercase mb-6">
                    {product.sku?.split('-')[1] ? 'Jewelry' : 'JEWELRY'}
                </p>

                {/* name */}
                <h1 className="text-3xl lg:text-5xl font-semibold mb-4 leading-tight">
                    {product.name}
                </h1>

                {/* price */}
                <p className="text-xl lg:text-2xl mb-8">
                    {formatPrice(product.price)}
                </p>

                {/* SKU */}
                <div className="mb-6">
                    <p className="text-[11px] tracking-[0.18em] text-gray-500 uppercase mb-1">
                    SKU
                    </p>
                    <p className="text-sm text-gray-700">{product.sku}</p>
                </div>

                {/* description */}
                <div className="text-sm leading-relaxed text-gray-700 max-w-md mb-10">
                    <p>{product.shortDescription || product.description || "No description."}</p>
                </div>

                {/* ADD TO CART BUTTON */}
                <button
                  className="
                    w-full bg-black text-white py-4 rounded-md
                    text-sm tracking-wider uppercase font-medium
                    hover:bg-gray-800 transition cursor-pointer
                  "
                  onClick={() => {
                    if (product) {
                      addToCart(product.id, 1);
                      alert("Added to cart!");
                    }
                  }}
                >
                  Add to cart
                </button>

                {/* SHIPPING TEXT */}
                <p className="text-xs text-gray-500 mt-4 tracking-wide">
                    Free shipping on US orders $100+ & Free returns for all VN orders
                </p>
                </div>
            </div>
          </section>
        )}
      </div>
    </main>

    <footer className="w-full mt-auto">
      <Footer />
    </footer>
  </div>
);
};
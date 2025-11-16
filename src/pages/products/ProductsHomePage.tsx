// src/pages/products/ProductsHomePage.tsx
import React, { useEffect, useState } from "react";
import { Row, Col, Spin, Alert, Dropdown, type MenuProps, Button } from "antd";
import { DownOutlined } from "@ant-design/icons";
import type { Product } from "../../types/product";
import { ProductCard } from "../../components/ProductCard";
import { Header } from "../../layouts/AppHeader";
import { Footer } from "../../layouts/AppFooter";

const categories = [
  "All",
  "Bracelets",
  "Necklaces",
  "Earrings",
  "Rings",
  "Anklets",
];

export const ProductsHomePage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch("/api/products", { method: "GET" });

        if (!res.ok) {
          throw new Error("Failed to load products");
        }

        const data = await res.json();
        setProducts(data);
      } catch (err: any) {
        console.error(err);
        setError(err?.message || "Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter(
    (p) => p.published && p.thumbnail
  );

  const filterMenu: MenuProps["items"] = [
    { key: "all", label: "All" },
    { key: "bestseller", label: "Best seller" },
  ];

  const sortMenu: MenuProps["items"] = [
    { key: "newest", label: "Newest" },
    { key: "price-asc", label: "Price: Low to High" },
    { key: "price-desc", label: "Price: High to Low" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#f2f0ec] text-[#111]">
      <header className="w-full bg-white">
        <Header />
      </header>

      <main className="flex-1 flex justify-center mt-12">
        <div className="w-full max-w-6xl pt-10 pb-16 px-4 lg:px-0">
          <div className="flex items-center justify-between mb-8 text-sm">
            <div className="flex items-center gap-6">
              {/* <Dropdown
                menu={{ items: filterMenu }}
                trigger={["click"]}
                placement="bottomLeft"
              >
                <Button type="text" className="px-0">
                  Filter <DownOutlined style={{ fontSize: 10 }} />
                </Button>
              </Dropdown> */}

              {/* <div className="flex items-center gap-4 text-xs uppercase tracking-[0.14em] text-gray-500">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={
                      "pb-1 border-b border-transparent hover:text-black" +
                      (activeCategory === cat
                        ? " text-black border-black"
                        : "")
                    }
                  >
                    {cat}
                  </button>
                ))}
              </div> */}
            </div>

            {/* <Dropdown
              menu={{ items: sortMenu }}
              trigger={["click"]}
              placement="bottomRight"
            >
              <Button type="text" className="px-0">
                Sort <DownOutlined style={{ fontSize: 10 }} />
              </Button>
            </Dropdown> */}
          </div>

          {loading && (
            <div className="flex justify-center py-20">
              <Spin size="large" />
            </div>
          )}

          {error && !loading && (
            <div className="max-w-lg mx-auto mb-8">
              <Alert type="error" message={error} showIcon />
            </div>
          )}

          {!loading && !error && (
            <Row gutter={[32, 56]} justify="center" className="mt-12">
              {filteredProducts.map((p, index) => (
                <Col key={p.id} xs={24} sm={12} md={12} lg={6}>
                  <ProductCard
                    name={p.name}
                    price={p.price}
                    thumbnail={p.thumbnail || "/placeholder.png"}
                    variantLabel={
                      p.shortDescription ? "WHITE CITRINE" : undefined
                    }
                    isBestSeller={index < 6}
                  />
                </Col>
              ))}
            </Row>
          )}

          {!loading && !error && filteredProducts.length === 0 && (
            <div className="text-center text-gray-500 mt-12">
              No products available.
            </div>
          )}
        </div>
      </main>

      <footer className="w-full mt-auto">
        <Footer />
      </footer>
    </div>
  );
};

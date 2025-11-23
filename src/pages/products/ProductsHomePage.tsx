// src/pages/products/ProductsHomePage.tsx
import React, { useEffect, useState } from "react";
import { Row, Col, Spin, Alert, Dropdown, type MenuProps, Button, Input } from "antd";
import { DownOutlined } from "@ant-design/icons";
import type { Product } from "../../types/product";
import { ProductCard } from "../../components/ProductCard";
import { Header } from "../../layouts/AppHeader";
import { Footer } from "../../layouts/AppFooter";
import { Link } from "react-router-dom";

const { Search } = Input;

export const ProductsHomePage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortType, setSortType] = useState<string | null>(null);

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

  let filteredProducts = products
    .filter((p) => p.published && p.thumbnail)
    .filter((p) => {
      if (!searchTerm.trim()) return true;

      const query = searchTerm.toLowerCase();

      return (
        p.name.toLowerCase().includes(query) ||
        p.sku.toLowerCase().includes(query) ||
        p.slug.toLowerCase().includes(query) ||
        (p.shortDescription || "").toLowerCase().includes(query)
      );
    });

  if (sortType === "price-asc") {
    filteredProducts = [...filteredProducts].sort(
      (a, b) => Number(a.price) - Number(b.price)
    );
  }

  if (sortType === "price-desc") {
    filteredProducts = [...filteredProducts].sort(
      (a, b) => Number(b.price) - Number(a.price)
    );
  }

  if (sortType === "newest") {
    filteredProducts = [...filteredProducts].sort(
      (a, b) => a.name.localeCompare(b.name)
    );
  }

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

          {/* Filter / Category / Sort bar */}
          <div className="flex items-center justify-content mb-8 text-sm">
            <div className="flex items-center gap-20 w-[100%]">
              <Search
                allowClear
                placeholder="Search by name, SKU..."
                className="w-64"
                onChange={(e) => setSearchTerm(e.target.value)}
                value={searchTerm}
              />

              <Dropdown
              menu={{
                items: sortMenu,
                onClick: ({ key }) => setSortType(key) 
              }}
                trigger={["click"]}
                placement="bottomRight"
              >
                <Button type="text" className="px-0">
                  Sort <DownOutlined style={{ fontSize: 10 }} />
                </Button>
              </Dropdown>
            </div>
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
                <Link
                  to={`/products/${p.slug}`}
                  className="block no-underline text-inherit"
                >
                  <ProductCard
                    name={p.name}
                    price={p.price}
                    thumbnail={p.thumbnail || "/placeholder.png"}
                    variantLabel="WHITE CITRINE"
                    isBestSeller={index < 6}
                  />
                </Link>
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

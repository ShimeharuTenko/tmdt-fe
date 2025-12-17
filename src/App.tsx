// src/App.tsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import { LuniaPage } from "./pages/lunia/LuniaPage";
import { Register } from "./pages/auth/register";
import { Login } from "./pages/auth/login";
import { ProductsHomePage } from "./pages/products/ProductsHomePage";
import { ProductDetailPage } from "./pages/products/ProductDetailPage";
import { CartPage } from "./pages/cart/CartPage";
import { CheckoutPage } from "./pages/checkout/CheckoutPage";
import { OrderConfirmationPage } from "./pages/order/OrderConfirmationPage";
import { MyOrdersPage } from "./pages/order/MyOrdersPage";
import { AdminOrdersPage } from "./pages/admin/AdminOrdersPage";
import "./App.css";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<LuniaPage />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/products" element={<ProductsHomePage />} />
      <Route path="/products/:slug" element={<ProductDetailPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/order-confirmation/:orderId" element={<OrderConfirmationPage />} />
      <Route path="/orders" element={<MyOrdersPage />} />
      <Route path="/admin/orders" element={<AdminOrdersPage />} />
    </Routes>
  );
};

export default App;

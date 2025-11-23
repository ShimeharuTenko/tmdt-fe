// src/App.tsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import { LuniaPage } from "./pages/lunia/LuniaPage";
import { Register } from "./pages/auth/register";
import { Login } from "./pages/auth/login";
import { ProductsHomePage } from "./pages/products/ProductsHomePage";
import { ProductDetailPage } from "./pages/products/ProductDetailPage";
import "./App.css";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<LuniaPage />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/products" element={<ProductsHomePage />} />
      <Route path="/products/:slug" element={<ProductDetailPage />} />
    </Routes>
  );
};

export default App;

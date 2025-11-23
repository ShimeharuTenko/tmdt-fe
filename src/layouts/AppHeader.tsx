// src/components/Header.tsx
import React from "react";

import logoImg from "../assets/img/logo.svg";
// import searchImg from "../assets/img/Search.svg";
import cartImg from "../assets/img/Cart.svg";
import userImg from "../assets/img/User.svg";
import { Link } from "react-router-dom";


export const Header: React.FC = () => {
  return (
    <header className="header">
      <img className="logo" src={logoImg} alt="logo" />

      <nav className="nav-menu">
        <Link to="/">Home</Link>
        <Link to="/products">Collection</Link>
        <a href="#">Meaning</a>
        <a href="#">Discovery</a>
        <a href="#">Custom</a>
      </nav>

      <div className="nav-icons">
        {/* <img src={searchImg} alt="search" /> */}
        <img src={cartImg} alt="cart" />
        <Link to="/register">
        <img
            src={userImg}
            alt="user"
            style={{ cursor: "pointer" }}
        />
        </Link>
      </div>
    </header>
  );
};

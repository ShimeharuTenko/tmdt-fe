// src/components/Footer.tsx
import React from "react";
import { FloatingInput } from "../components/FloatingInput";

import footerImg from "../assets/img/Footer.png";

export const Footer: React.FC = () => {
  return (
    <div className="section5" style={{ position: "relative" }}>
      <img src={footerImg} alt="footer" />

      <button className="footer-btn" style={{ top: 119, left: 100 }}>
        Lunia Care
      </button>
      <button className="footer-btn" style={{ top: 162, left: 100 }}>
        FAQS
      </button>
      <button className="footer-btn" style={{ top: 205, left: 100 }}>
        Rewards Circle
      </button>
      <button className="footer-btn" style={{ top: 248, left: 100 }}>
        Catalog
      </button>

      <button className="footer-btn" style={{ top: 119, left: 319 }}>
        Contact Us
      </button>
      <button className="footer-btn" style={{ top: 162, left: 319 }}>
        Start a Return
      </button>
      <button className="footer-btn" style={{ top: 205, left: 319 }}>
        Retail Stores
      </button>
      <button className="footer-btn" style={{ top: 248, left: 319 }}>
        Archive
      </button>

      <button className="footer-btn" style={{ top: 119, left: 538 }}>
        Facebook
      </button>
      <button className="footer-btn" style={{ top: 162, left: 538 }}>
        Instagram
      </button>
      <button className="footer-btn" style={{ top: 205, left: 538 }}>
        Youtube
      </button>

      <FloatingInput
        id="footer_email"
        name="footer_email"
        label="*Your Email"
        type="email"
        wrapperStyle={{
          top: 150,
          left: 1292,
          position: "absolute",
          zIndex: 5,
        }}
        inputStyle={{ color: "black" }}
      />

      <button
        type="submit"
        className="join-submit-btn"
        style={{
          top: 168,
          left: 1740,
          color: "rgba(172, 172, 172, 0.8)",
          fontSize: 18,
          position: "absolute",
        }}
      >
        SUBMIT
      </button>

      <div className="footer-text">
        By entering your email address below, you consent to receiving our
        newsletter with access to our latest collections, events and
        initiatives. More details on this are provided in our{" "}
        <a
          href="https://www.gucci.com/us/en/st/privacy-landing"
          className="privacy-btn"
          target="_blank"
          rel="noreferrer"
        >
          Privacy Policy
        </a>
        .
      </div>
    </div>
  );
};

// src/components/QuestionFormSection.tsx
import React from "react";
import { FloatingInput } from "./FloatingInput";

import questionFormImg from "../assets/img/Question-form.png";

export const QuestionFormSection: React.FC = () => {
  return (
    <div className="section3" style={{ position: "relative" }}>
      <img src={questionFormImg} alt="questionform" />

      <FloatingInput
        id="firstname"
        name="firstname"
        label="*First name"
        wrapperStyle={{ top: 390, left: 540, position: "absolute", zIndex: 5 }}
      />

      <FloatingInput
        id="lastname"
        name="lastname"
        label="*Last name"
        wrapperStyle={{ top: 390, left: 970, position: "absolute", zIndex: 5 }}
      />

      <FloatingInput
        id="email"
        name="email"
        label="*Email"
        type="email"
        wrapperStyle={{ top: 490, left: 540, position: "absolute", zIndex: 5 }}
      />

      <div
        className="email-label"
        style={{
          top: 490,
          left: 1240,
          position: "absolute",
          zIndex: 5,
        }}
      >
        @gmail.com
      </div>

      <FloatingInput
        id="phone"
        name="phone"
        label="*Phone number"
        type="tel"
        wrapperStyle={{ top: 590, left: 540, position: "absolute", zIndex: 5 }}
      />

      <FloatingInput
        id="note"
        name="note"
        label="*Leave us some note"
        wrapperStyle={{ top: 700, left: 540, position: "absolute", zIndex: 5 }}
      />

      <div style={{ position: "absolute", top: 800, left: 840, zIndex: 5 }}>
        <button type="submit" className="submit-btn">
          Submit form
        </button>
      </div>
    </div>
  );
};

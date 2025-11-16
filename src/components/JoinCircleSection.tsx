// src/components/JoinCircleSection.tsx
import React from "react";
import { FloatingInput } from "./FloatingInput";

export const JoinCircleSection: React.FC = () => {
  return (
    <div className="section4">
      <div id="join-our-circle" style={{ position: "relative" }}>
        <img src="/image/Group 865.png" alt="join our circle" />
        <FloatingInput
          id="join_phone"
          name="join_phone"
          label="*Mobile Phone"
          type="tel"
          wrapperStyle={{
            top: 210,
            left: 1000,
            position: "absolute",
            zIndex: 5,
          }}
          inputStyle={{ color: "black" }}
        />
        <button
          type="submit"
          className="join-submit-btn"
          style={{
            top: 228,
            left: 1450,
            position: "absolute",
          }}
        >
          SUBMIT
        </button>
      </div>
    </div>
  );
};

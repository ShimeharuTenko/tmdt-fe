// src/components/FloatingInput.tsx
import React, { useState } from "react";

export interface FloatingInputProps {
  id: string;
  name: string;
  label: string;
  type?: string;
  wrapperStyle?: React.CSSProperties;
  inputStyle?: React.CSSProperties;
  suffix?: React.ReactNode;
}

export const FloatingInput: React.FC<FloatingInputProps> = ({
  id,
  name,
  label,
  type = "text",
  wrapperStyle,
  inputStyle,
  suffix,
}) => {
  const [value, setValue] = useState("");

  const isFilled = value.trim() !== "";

  return (
    <div className="floating-input" style={wrapperStyle}>
      <input
        id={id}
        name={name}
        type={type}
        required
        style={inputStyle}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className={isFilled ? "filled" : ""}
      />
      <span>{label}</span>
      {suffix && <div className="email-label">{suffix}</div>}
    </div>
  );
};

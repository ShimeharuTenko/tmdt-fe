// src/components/HighlightSection.tsx
import React, { useState } from "react";

import img1 from "../assets/img/1.png";
import img2 from "../assets/img/2.png";
import img3 from "../assets/img/3.png";

const highlightImages = [img1, img2, img3];

export const HighlightSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const numberDisplay = (currentIndex + 1).toString().padStart(2, "0");

  const handleChangeImage = () => {
    setCurrentIndex((prev) => (prev + 1) % highlightImages.length);
  };

  return (
    <div className="section2">
      <img src="/image/HIGHLIGHT.svg" id="HIGHLIGHT" alt="background" />

      <div className="image-display-box">
        {highlightImages.map((src, index) => (
          <img
            key={src}
            src={src}
            alt={`Ảnh ${index + 1}`}
            className={`cycle-image ${
              index === currentIndex ? "active" : ""
            }`}
          />
        ))}
      </div>

      <button className="action-button" onClick={handleChangeImage}>
        DRAG TO SLIDE
      </button>

      <div id="text2">
        <img src="/image/text-2.svg" alt="text 2" />
      </div>
      <div id="text1">
        <img src="/image/QUARTZNIA.svg" alt="QUARTZNIA" />
      </div>
      <div id="number">{numberDisplay}</div>
    </div>
  );
};

// src/components/TestimonialsSection.tsx
import React, { useRef, useState } from "react";

import text4Img from "../assets/img/text-4.svg";
import cmt1 from "../assets/img/comment1.png";
import cmt2 from "../assets/img/comment2.png";
import cmt3 from "../assets/img/comment3.png";
import cmt4 from "../assets/img/comment4.png";
import cmt5 from "../assets/img/comment5.png";
import cmt6 from "../assets/img/comment6.png";

const comments = [cmt1, cmt2, cmt3, cmt4, cmt5, cmt6];

export const TestimonialsSection: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!scrollRef.current) return;
    setIsDown(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDown(false);
  };

  const handleMouseUp = () => {
    setIsDown(false);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDown || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <div className="section4">
      <img src={text4Img} id="text4" alt="text 4" />
      <div style={{ marginTop: 60, marginLeft: 1630 }}>ROLL TO SLIDE</div>
      <div
        className="scroll-container"
        ref={scrollRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        {comments.map((src, index) => (
          <div className="card" key={index}>
            <img src={src} alt={`comment ${index + 1}`} />
          </div>
        ))}
      </div>
    </div>
  );
};

// src/components/LuniaHeroAndSections.tsx
import React from "react";

import backImg from "../assets/img/Back.png";
import modelImg from "../assets/img/Model.png";
import bgTextImg from "../assets/img/Background.png";
import slide2Img from "../assets/img/silde2.png";

import text0Svg from "../assets/img/text-0.svg";
import image0 from "../assets/img/image-0.png";
import image1 from "../assets/img/image-1.png";
import image2 from "../assets/img/image-2.png";

import founderImg from "../assets/img/Founder.png";
import text3Img from "../assets/img/text-3.png";

import image5 from "../assets/img/image-5.png";
import image6 from "../assets/img/image-6.png";
import image7 from "../assets/img/image-7.png";
import image8 from "../assets/img/image-8.png";

export const LuniaHeroAndSections: React.FC = () => {
  return (
    <>
      <div className="section">
        <img src={backImg} className="back" alt="background" />
        <img src={modelImg} className="model" alt="model" />
        <img src={bgTextImg} className="text" alt="text bg" />
      </div>

      <div className="section">
        <img src={slide2Img} id="slide2" alt="background" />
      </div>

      <div className="section1">
        <div>
          <img src={text0Svg} id="text-0" alt="text 0" />
        </div>
        <img src={image0} className="image" id="image-0" alt="0" />
        <div id="content">
          <div id="content1">
            Each gemstone is a timeless gift from nature, formed over millions
            of years, absorbing the essence of the earth and sky. Within its
            sparkling core lies pure energy - a silent guardian that be
            coharmonizes the spirit.
          </div>
          <div id="content2">
            These gemstones carry stories of ancient lands, whispers of the to
            be universe, and the power to awaken clarity, strengh, and inner
            peace in those who wear them. With every shimmer light.
          </div>
        </div>
        <div className="button">
          <button className="discover-btn" id="btn0"></button>
        </div>
      </div>

      <div className="section1">
        <img src={image1} className="image" id="image-1" alt="1" />
        <img src={image2} className="image" id="image-2" alt="2" />
        <div id="content3">
          Each piece in Lunia&apos;s Winter Collection is thoughtfully crafted
          to capture the calm strength and quiet elegance of the season.
          Inspired by frosted mornings, shimmering snowflakes, and the soft glow
          of winter skies.
        </div>
      </div>

      <div className="section3">
        <img src={founderImg} alt="Founder" />
        <div className="button">
          <button className="discover-btn" id="btn1"></button>
        </div>
      </div>

      <div className="section3">
        <div id="text3">
          <img src={text3Img} alt="text 3" />
        </div>
        <div className="button">
          <button className="create-btn" id="btn2"></button>
        </div>
        <img src={image5} className="image" id="image-5" alt="5" />
        <img src={image6} className="image" id="image-6" alt="6" />
        <img src={image7} className="image" id="image-7" alt="7" />
        <img src={image8} className="image" id="image-8" alt="8" />
      </div>
    </>
  );
};

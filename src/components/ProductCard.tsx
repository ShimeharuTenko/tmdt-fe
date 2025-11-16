// src/components/ProductCard.tsx
import React from "react";

interface ProductCardProps {
  name: string;
  price: number;
  thumbnail: string;
  variantLabel?: string;
  isBestSeller?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  name,
  price,
  thumbnail,
  variantLabel = "WHITE CITRINE",
  isBestSeller = false,
}) => {
  return (
    <div
      className="
        max-w-[260px] mx-auto
        bg-white
        rounded-xl
        shadow-[0_10px_24px_rgba(0,0,0,0.08)]
        border border-[#f1ede7]
        overflow-hidden
      "
    >
      {/* PHẦN ẢNH FULL BOX */}
      <div className="relative w-full h-[260px] overflow-hidden">
        {isBestSeller && (
          <div
            className="
              absolute top-3 left-3 
              bg-[#F7F7F7]
              border border-[#E3E3E3]
              text-[10px] text-[#555]
              px-2 py-[2px]
              rounded-md
              tracking-wide
              z-10
            "
          >
            Best seller
          </div>
        )}

        <img
          src={thumbnail}
          alt={name}
          className="
            w-full h-full object-cover
            transition-transform duration-300
            hover:scale-105
          "
        />
      </div>

      {/* PHẦN TEXT */}
      <div className="px-6 py-4 text-center">
        <div className="text-[16px] font-semibold tracking-wide mb-1">
          {name}
        </div>

        <div className="text-[11px] tracking-[0.18em] text-gray-500 mb-2 uppercase">
          {`{ ${variantLabel} }`}
        </div>

        <div className="text-[12px] font-medium text-gray-900">
          {price.toLocaleString("vi-VN")} đ
        </div>
      </div>
    </div>
  );
};

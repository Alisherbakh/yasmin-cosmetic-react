import React, { useEffect, useState } from "react";
import {
  getProductRating,
  setProductRating,
  PRODUCT_RATING_EVENT,
} from "../../../lib/productRatings";

interface StarRatingProps {
  productId: string;
  interactive?: boolean;
  className?: string;
}

export default function StarRating(props: StarRatingProps) {
  const { productId, interactive = false, className } = props;
  const [rating, setRating] = useState<number>(0);

  useEffect(() => {
    setRating(getProductRating(productId));
  }, [productId]);

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (detail?.productId === productId) setRating(detail.value);
    };
    window.addEventListener(PRODUCT_RATING_EVENT, handler);
    return () => window.removeEventListener(PRODUCT_RATING_EVENT, handler);
  }, [productId]);

  const starClickHandler = (value: number, e: React.MouseEvent) => {
    if (!interactive) return;
    e.stopPropagation();
    setProductRating(productId, value);
    setRating(value);
  };

  return (
    <div className={`stars${className ? ` ${className}` : ""}`}>
      {[1, 2, 3, 4, 5].map((value) => (
        <span
          key={value}
          className={`star ${value <= rating ? "filled" : ""}`}
          onClick={(e) => starClickHandler(value, e)}
        >
          &#9733;
        </span>
      ))}
    </div>
  );
}

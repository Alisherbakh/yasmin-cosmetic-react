import { SyntheticEvent } from "react";

export const FALLBACK_IMAGE = "/icons/noimage-list.svg";

/** Swap a broken image for the placeholder (only once, to avoid an error loop) */
export const handleImageError = (e: SyntheticEvent<HTMLImageElement>) => {
  const img = e.currentTarget;
  if (img.src.endsWith(FALLBACK_IMAGE)) return;
  img.src = FALLBACK_IMAGE;
};

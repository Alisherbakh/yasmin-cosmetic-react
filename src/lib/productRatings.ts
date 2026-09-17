/**
 * Front-end-only product star ratings.
 * There is no rating field in the backend data model, so ratings are kept
 * in the browser's localStorage, keyed by product id. This lets a rating
 * given on the Product Detail page show up consistently on the product's
 * cards on the Home and Products pages (same browser/device only).
 */

const STORAGE_KEY = "yasmin_product_ratings";
export const PRODUCT_RATING_EVENT = "yasmin-product-rating-changed";

const readAll = (): Record<string, number> => {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
};

export const getProductRating = (productId: string | undefined): number => {
  if (!productId) return 0;
  const all = readAll();
  return all[productId] ?? 0;
};

export const setProductRating = (productId: string, value: number): void => {
  const all = readAll();
  all[productId] = value;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
  } catch {
    // ignore storage quota/availability errors
  }
  window.dispatchEvent(
    new CustomEvent(PRODUCT_RATING_EVENT, { detail: { productId, value } })
  );
};

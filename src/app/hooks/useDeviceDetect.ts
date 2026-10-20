import { useState } from "react";

export type Device = "mobile" | "desktop";

const MOBILE_UA = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;

/** autore-next'dagi useDeviceDetect bilan bir xil: user-agent bo'yicha "mobile" yoki "desktop".
 *  Farqi: bu loyiha faqat brauzerda ishlaydi (server rendering yo'q), shuning uchun qiymat
 *  BIRINCHI render'dayoq aniqlanadi — telefonda desktop ko'rinishi bir lahza "miltillab" ketmaydi. */
const detect = (): Device =>
  typeof navigator !== "undefined" && MOBILE_UA.test(navigator.userAgent) ? "mobile" : "desktop";

export default function useDeviceDetect(): Device {
  const [device] = useState<Device>(detect);
  return device;
}

import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}


export const wait = (cb, ...rest) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(cb(...rest));
    }, 4000);
  });
};

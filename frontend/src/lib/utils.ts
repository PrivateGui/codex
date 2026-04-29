import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
export const cn = (...v: Parameters<typeof clsx>) => twMerge(clsx(v));

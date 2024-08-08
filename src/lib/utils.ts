import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function colorLast3Words(word: string, index: number, color: string) {
  if (index == word.split(' ').length - 1) return ``
  if (index > 2) return `text-[${color}]`
  return ``
}
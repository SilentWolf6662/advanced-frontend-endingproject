import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

// Combines class names using clsx and merges them using tailwind-merge
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

// Returns a color class for the last 3 words in a string
export function colorLast3Words(word: string, index: number, color: string) {
    if (index == word.split(' ').length - 1) return ``
    if (index > 2) return `text-[${color}]`
    return ``
}
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

// Combines class names using clsx and merges them using tailwind-merge
export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

// Returns a color class for the last x words in a string
export function colorLastWords(
	word: string,
	amount: number,
	index: number,
	color: string
) {
	if (index == word.split(' ').length - 1) return ``
	if (index > amount) return `text-[${color}]`
	return ``
}

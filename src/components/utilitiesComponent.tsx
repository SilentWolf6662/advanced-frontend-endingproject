import { cn, colorLastWords } from "@/lib/utils";
export function TitleWithColoredWords({
    title,
    color,
    amount
}: {
    title: string
    color: string
    amount: number
}) {
    return (
        <h1 className='text-5xl font-semibold text-black tracking-tighter'>
            {title.split(' ').map((word: string, index: number) => (
                <span
                    key={index}
                    className={colorLastWords(title, amount, index, color)}>
                    {word}{' '}
                </span>
            ))}
        </h1>
    )
}

export function DescriptionWithLineBreaks({ className, description }: DescriptionWithLineBreaksProps) {
    return (
        <p className={cn("text-xl font-medium text-black tracking-tighter", className)}>
            {description.slice(0, 378).split('\n').map((line: string, index: number) => (
                <span key={`description-line-${index}`}><br />{line}</span>
            ))}
        </p>
    )
}
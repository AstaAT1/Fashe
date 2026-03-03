import { Star } from 'lucide-react'

export default function RatingStars({ rating = 0, count = 0, size = 'sm' }) {
    const s = size === 'sm' ? 12 : 14
    return (
        <div className="flex items-center gap-1">
            <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((i) => (
                    <Star
                        key={i}
                        size={s}
                        className={i <= Math.round(rating) ? 'fill-amber-400 text-amber-400' : 'text-neutral-300 dark:text-neutral-600'}
                    />
                ))}
            </div>
            {count > 0 && <span className="text-[11px] text-[var(--text-muted)] ml-0.5">({count})</span>}
        </div>
    )
}

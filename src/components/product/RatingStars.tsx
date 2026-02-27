import { HiStar } from 'react-icons/hi';
import { cn } from '@/utils';

interface RatingStarsProps {
    rating: number;
    count?: number;
    size?: 'sm' | 'md';
    showCount?: boolean;
}

export default function RatingStars({ rating, count, size = 'sm', showCount = true }: RatingStarsProps) {
    const starSize = size === 'sm' ? 'w-3.5 h-3.5' : 'w-4.5 h-4.5';

    return (
        <div className="flex items-center gap-1">
            <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                    <HiStar
                        key={star}
                        className={cn(
                            starSize,
                            star <= Math.floor(rating)
                                ? 'text-accent-400'
                                : star - 0.5 <= rating
                                    ? 'text-accent-300'
                                    : 'text-surface-300 dark:text-surface-600'
                        )}
                    />
                ))}
            </div>
            {showCount && count != null && (
                <span className="text-xs text-[var(--text-muted)] ml-0.5">({count})</span>
            )}
        </div>
    );
}

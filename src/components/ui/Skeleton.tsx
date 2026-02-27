import { cn } from '@/utils';

interface SkeletonProps {
    className?: string;
    variant?: 'text' | 'circle' | 'rect';
    count?: number;
}

export default function Skeleton({ className, variant = 'rect', count = 1 }: SkeletonProps) {
    const base = {
        text: 'h-4 rounded',
        circle: 'rounded-full',
        rect: 'rounded-lg',
    };

    return (
        <>
            {Array.from({ length: count }).map((_, i) => (
                <div
                    key={i}
                    className={cn('skeleton', base[variant], className)}
                    aria-hidden="true"
                />
            ))}
        </>
    );
}

export function ProductCardSkeleton() {
    return (
        <div className="space-y-3">
            <Skeleton className="aspect-[3/4] w-full" />
            <Skeleton className="h-4 w-3/4" variant="text" />
            <Skeleton className="h-4 w-1/3" variant="text" />
        </div>
    );
}

export function ProductGridSkeleton({ count = 8 }: { count?: number }) {
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: count }).map((_, i) => (
                <ProductCardSkeleton key={i} />
            ))}
        </div>
    );
}

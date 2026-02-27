import { Link, useLocation } from 'react-router-dom';
import { HiChevronRight } from 'react-icons/hi';

interface Crumb {
    label: string;
    href?: string;
}

interface BreadcrumbsProps {
    items?: Crumb[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
    const location = useLocation();

    const crumbs: Crumb[] = items || generateFromPath(location.pathname);

    if (crumbs.length <= 1) return null;

    return (
        <nav aria-label="Breadcrumb" className="py-4">
            <ol className="flex items-center gap-1.5 text-sm text-[var(--text-secondary)]">
                {crumbs.map((crumb, i) => (
                    <li key={i} className="flex items-center gap-1.5">
                        {i > 0 && <HiChevronRight className="w-3.5 h-3.5 text-[var(--text-muted)]" />}
                        {i === crumbs.length - 1 ? (
                            <span className="text-[var(--text-primary)] font-medium" aria-current="page">
                                {crumb.label}
                            </span>
                        ) : (
                            <Link to={crumb.href || '/'} className="hover:text-[var(--text-primary)] transition-colors">
                                {crumb.label}
                            </Link>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    );
}

function generateFromPath(path: string): Crumb[] {
    const segments = path.split('/').filter(Boolean);
    const crumbs: Crumb[] = [{ label: 'Home', href: '/' }];

    segments.forEach((segment, i) => {
        const href = '/' + segments.slice(0, i + 1).join('/');
        crumbs.push({
            label: segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' '),
            href: i < segments.length - 1 ? href : undefined,
        });
    });

    return crumbs;
}

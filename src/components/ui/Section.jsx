export default function Section({ children, className = '', bg = '' }) {
    return (
        <section className={`py-16 md:py-20 lg:py-24 ${bg} ${className}`}>
            {children}
        </section>
    );
}

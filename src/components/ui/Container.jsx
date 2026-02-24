export default function Container({ children, className = '', as: Tag = 'div' }) {
  return (
    <Tag className={`w-full max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8 ${className}`}>
      {children}
    </Tag>
  );
}

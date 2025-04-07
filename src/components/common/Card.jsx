export default function Card({ 
  children, 
  title, 
  icon, 
  className = '' 
}) {
  return (
    <div className={`bg-white rounded-xl shadow-lg p-6 ${className}`}>
      {(title || icon) && (
        <div className="flex items-center gap-2 mb-4">
          {icon && <span className="text-blue-600">{icon}</span>}
          {title && <h3 className="text-xl font-semibold">{title}</h3>}
        </div>
      )}
      {children}
    </div>
  );
}
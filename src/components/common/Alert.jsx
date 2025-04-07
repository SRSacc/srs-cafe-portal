export default function Alert({ 
  type = 'info', 
  message, 
  onClose 
}) {
  const types = {
    success: 'bg-green-100 text-green-800 border-green-200',
    error: 'bg-red-100 text-red-800 border-red-200',
    warning: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    info: 'bg-blue-100 text-blue-800 border-blue-200'
  };

  if (!message) return null;

  return (
    <div className={`p-4 rounded-lg border ${types[type]} relative`}>
      <p>{message}</p>
      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-2 right-2 hover:opacity-75"
        >
          ×
        </button>
      )}
    </div>
  );
}
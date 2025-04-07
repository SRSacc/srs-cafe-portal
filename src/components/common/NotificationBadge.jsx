export default function NotificationBadge({ count }) {
  if (!count || count <= 0) return null;

  return (
    <span className="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold px-1.5 py-0.5 rounded-full min-w-[20px] text-center">
      {count > 99 ? '99+' : count}
    </span>
  );
}
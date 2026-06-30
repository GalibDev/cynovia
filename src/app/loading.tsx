export default function Loading() {
  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto max-w-7xl animate-pulse space-y-6">
        <div className="h-16 rounded-xl bg-white" />
        <div className="h-80 rounded-2xl bg-white" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="h-44 rounded-xl bg-white" />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Topbar() {
  return (
    <header className="sticky top-0 z-10 border-b bg-white/80 backdrop-blur">
      <div className="flex items-center gap-3 px-6 py-3">
        <div className="flex flex-1 items-center">
          <div className="w-full max-w-xl">
            <input
              placeholder="Search..."
              className="w-full rounded-full border border-slate-200 bg-white px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <button className="rounded-full border border-slate-200 bg-white px-3 py-2 text-sm">
          🔔
        </button>

        <div className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium">
          Đỗ Thị Quỳnh Nhung <span className="ml-2 text-xs text-slate-500">Admin</span>
        </div>
      </div>
    </header>
  );
}
  import { useMemo, useState } from "react";

type NotaryJob = {
  id: string;
  customerName: string;
  service: string;
  status: "Mới" | "Đang xử lý" | "Hoàn tất" | "Hủy";
  createdAt: string; // dd/mm/yyyy
  appointmentAt: string; // dd/mm/yyyy HH:mm
  feeVnd: number;
  phone: string;
  address: string;
};

const STATUS_BADGE: Record<NotaryJob["status"], string> = {
  "Mới": "bg-blue-50 text-blue-700 ring-blue-200",
  "Đang xử lý": "bg-amber-50 text-amber-700 ring-amber-200",
  "Hoàn tất": "bg-emerald-50 text-emerald-700 ring-emerald-200",
  "Hủy": "bg-rose-50 text-rose-700 ring-rose-200",
};

function formatVnd(v: number) {
  return new Intl.NumberFormat("vi-VN").format(v) + " ₫";
}

export default function HomeDashboard() {
  const [q, setQ] = useState("");

  const jobs: NotaryJob[] = [
    {
      id: "CN-000124",
      customerName: "Nguyễn Văn A",
      service: "Công chứng Hợp đồng mua bán",
      status: "Đang xử lý",
      createdAt: "18/03/2026",
      appointmentAt: "20/03/2026 09:30",
      feeVnd: 350000,
      phone: "0901 234 567",
      address: "Q.1, TP.HCM",
    },
    {
      id: "CN-000125",
      customerName: "Trần Thị B",
      service: "Sao y bản chính (CMND/CCCD)",
      status: "Mới",
      createdAt: "19/03/2026",
      appointmentAt: "19/03/2026 15:00",
      feeVnd: 80000,
      phone: "0932 111 222",
      address: "Q.3, TP.HCM",
    },
    {
      id: "CN-000126",
      customerName: "Lê Minh C",
      service: "Chứng thực chữ ký",
      status: "Hoàn tất",
      createdAt: "16/03/2026",
      appointmentAt: "17/03/2026 10:00",
      feeVnd: 60000,
      phone: "0988 456 999",
      address: "TP. Thủ Đức, TP.HCM",
    },
    {
      id: "CN-000127",
      customerName: "Phạm D",
      service: "Công chứng Ủy quyền",
      status: "Hủy",
      createdAt: "15/03/2026",
      appointmentAt: "16/03/2026 14:00",
      feeVnd: 120000,
      phone: "0912 555 666",
      address: "Q.Bình Thạnh, TP.HCM",
    },
  ];

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (!needle) return jobs;
    return jobs.filter((x) =>
      [
        x.id,
        x.customerName,
        x.service,
        x.status,
        x.phone,
        x.address,
        x.createdAt,
        x.appointmentAt,
      ]
        .join(" ")
        .toLowerCase()
        .includes(needle)
    );
  }, [q]);

  const stats = useMemo(() => {
    const total = jobs.length;
    const pending = jobs.filter((j) => j.status === "Mới" || j.status === "Đang xử lý").length;
    const done = jobs.filter((j) => j.status === "Hoàn tất").length;
    const cancelled = jobs.filter((j) => j.status === "Hủy").length;
    return { total, pending, done, cancelled };
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="flex min-h-screen w-full">
        {/* Sidebar */}
        <aside className="hidden w-72 flex-col border-r border-slate-200 bg-white md:flex">
          <div className="flex items-center gap-3 border-b border-slate-200 px-5 py-4">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-blue-600 text-white font-bold">
              CN
            </div>
            <div>
              <div className="text-sm font-semibold">Công chứng Online</div>
              <div className="text-xs text-slate-500">Demo dashboard</div>
            </div>
          </div>

          <nav className="px-3 py-4">
            <div className="px-2 pb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
              Menu
            </div>

            <a
              className="flex items-center gap-3 rounded-lg bg-blue-50 px-3 py-2 text-sm font-semibold text-blue-700"
              href="#"
            >
              <span className="grid h-8 w-8 place-items-center rounded-md bg-blue-600 text-white">
                ⌂
              </span>
              Trang chủ
            </a>

            <a
              className="mt-1 flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
              href="#"
            >
              <span className="grid h-8 w-8 place-items-center rounded-md bg-slate-100 text-slate-700">
                🧾
              </span>
              Hồ sơ công chứng
            </a>

            <a
              className="mt-1 flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
              href="#"
            >
              <span className="grid h-8 w-8 place-items-center rounded-md bg-slate-100 text-slate-700">
                👥
              </span>
              Khách hàng
            </a>

            <a
              className="mt-1 flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
              href="#"
            >
              <span className="grid h-8 w-8 place-items-center rounded-md bg-slate-100 text-slate-700">
                ⚙
              </span>
              Cài đặt
            </a>
          </nav>

          <div className="mt-auto border-t border-slate-200 px-5 py-4">
            <div className="text-xs text-slate-500">Đăng nhập với</div>
            <div className="mt-1 text-sm font-semibold">MinhNhat (demo)</div>
          </div>
        </aside>

        {/* Main */}
        <main className="flex-1">
          {/* Topbar */}
          <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/90 backdrop-blur">
            <div className="flex flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center md:px-6">
              {/* Mobile menu placeholder */}
              <div className="md:hidden">
                <button
                  type="button"
                  className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm hover:bg-slate-50"
                  onClick={() => alert("Demo: cần làm drawer menu cho mobile")}
                >
                  Menu
                </button>
              </div>

              <div className="flex-1">
                <div className="relative">
                  <input
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                    placeholder="Tìm theo mã hồ sơ, tên khách hàng, dịch vụ, trạng thái..."
                    className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-3 text-sm outline-none focus:border-blue-300 focus:ring-4 focus:ring-blue-100"
                  />
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                    🔎
                  </div>
                </div>
              </div>

              <button
                type="button"
                className="hidden rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:brightness-95 md:inline-flex"
                onClick={() => alert("Demo: tạo hồ sơ công chứng")}
              >
                + Tạo hồ sơ
              </button>
            </div>
          </header>

          <div className="px-4 py-6 md:px-6">
            {/* Title */}
            <div className="flex flex-col gap-1">
              <h1 className="text-xl font-semibold text-slate-900 md:text-2xl">
                Trang chủ
              </h1>
              <p className="text-sm text-slate-500">
                Tổng quan hồ sơ “làm giấy công chứng” (demo dữ liệu)
              </p>
            </div>

            {/* Stats */}
            <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-4">
              <StatCard label="Tổng hồ sơ" value={stats.total} />
              <StatCard label="Đang xử lý" value={stats.pending} accent="blue" />
              <StatCard label="Hoàn tất" value={stats.done} accent="emerald" />
              <StatCard label="Đã hủy" value={stats.cancelled} accent="rose" />
            </div>

            {/* Content grid */}
            <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
              {/* Left: table */}
              <section className="lg:col-span-2 rounded-2xl border border-slate-200 bg-white">
                <div className="flex flex-col gap-3 border-b border-slate-200 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
                  <div>
                    <div className="text-sm font-semibold">Danh sách hồ sơ</div>
                    <div className="text-xs text-slate-500">
                      {filtered.length} kết quả
                    </div>
                  </div>
                  <button
                    type="button"
                    className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm hover:bg-slate-50"
                    onClick={() => setQ("")}
                  >
                    Xóa lọc
                  </button>
                </div>

                {/* Mobile list (avoids horizontal scrolling) */}
                <div className="md:hidden">
                  {filtered.length > 0 ? (
                    <div className="divide-y divide-slate-100">
                      {filtered.map((j) => (
                        <div key={j.id} className="px-4 py-4 sm:px-5">
                          <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0">
                              <div className="truncate text-sm font-semibold text-slate-900">
                                {j.id}
                              </div>
                              <div className="mt-1 text-xs text-slate-500">Tạo: {j.createdAt}</div>
                            </div>
                            <span
                              className={[
                                "shrink-0 inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ring-1",
                                STATUS_BADGE[j.status],
                              ].join(" ")}
                            >
                              {j.status}
                            </span>
                          </div>

                          <div className="mt-3">
                            <div className="text-sm font-medium text-slate-900">{j.customerName}</div>
                            <div className="mt-1 text-xs text-slate-500">
                              {j.phone} • {j.address}
                            </div>
                          </div>

                          <div className="mt-3 grid grid-cols-1 gap-2 text-sm sm:grid-cols-2">
                            <div className="rounded-xl bg-slate-50 px-3 py-2">
                              <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                                Dịch vụ
                              </div>
                              <div className="mt-1 text-sm text-slate-900">{j.service}</div>
                            </div>
                            <div className="rounded-xl bg-slate-50 px-3 py-2">
                              <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                                Hẹn
                              </div>
                              <div className="mt-1 text-sm text-slate-900">{j.appointmentAt}</div>
                            </div>
                          </div>

                          <div className="mt-3 flex items-center justify-between gap-3">
                            <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                              Phí
                            </div>
                            <div className="text-sm font-semibold text-slate-900">{formatVnd(j.feeVnd)}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="px-4 py-10 text-center text-sm text-slate-500 sm:px-5">
                      Không có kết quả phù hợp.
                    </div>
                  )}
                </div>

                {/* Desktop/tablet table */}
                <div className="hidden overflow-x-auto md:block">
                  <table className="w-full min-w-[760px] text-left text-sm">
                    <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                      <tr>
                        <th className="px-4 py-3 sm:px-5">Mã</th>
                        <th className="px-4 py-3 sm:px-5">Khách hàng</th>
                        <th className="px-4 py-3 sm:px-5">Dịch vụ</th>
                        <th className="px-4 py-3 sm:px-5">Hẹn</th>
                        <th className="px-4 py-3 sm:px-5">Phí</th>
                        <th className="px-4 py-3 sm:px-5">Trạng thái</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filtered.map((j) => (
                        <tr
                          key={j.id}
                          className="border-t border-slate-100 hover:bg-slate-50"
                        >
                          <td className="px-4 py-4 font-semibold text-slate-900 sm:px-5">
                            {j.id}
                            <div className="mt-1 text-xs font-normal text-slate-500">
                              Tạo: {j.createdAt}
                            </div>
                          </td>
                          <td className="px-4 py-4 sm:px-5">
                            <div className="font-medium">{j.customerName}</div>
                            <div className="mt-1 text-xs text-slate-500">
                              {j.phone} • {j.address}
                            </div>
                          </td>
                          <td className="px-4 py-4 sm:px-5">{j.service}</td>
                          <td className="px-4 py-4 sm:px-5">{j.appointmentAt}</td>
                          <td className="px-4 py-4 font-medium sm:px-5">
                            {formatVnd(j.feeVnd)}
                          </td>
                          <td className="px-4 py-4 sm:px-5">
                            <span
                              className={[
                                "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ring-1",
                                STATUS_BADGE[j.status],
                              ].join(" ")}
                            >
                              {j.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                      {filtered.length === 0 && (
                        <tr>
                          <td className="px-5 py-10 text-center text-slate-500" colSpan={6}>
                            Không có kết quả phù hợp.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </section>

              {/* Right: detail card */}
              <section className="rounded-2xl border border-slate-200 bg-white">
                <div className="border-b border-slate-200 px-4 py-4 sm:px-5">
                  <div className="text-sm font-semibold">Thông tin hướng dẫn</div>
                  <div className="text-xs text-slate-500">
                    Quy trình làm giấy công chứng (demo)
                  </div>
                </div>

                <div className="space-y-4 px-4 py-4 text-sm sm:px-5">
                  <InfoItem title="Bước 1" desc="Tiếp nhận hồ sơ & kiểm tra giấy tờ." />
                  <InfoItem title="Bước 2" desc="Xác minh thông tin, đối chiếu bản gốc." />
                  <InfoItem title="Bước 3" desc="Soạn thảo/đính kèm nội dung công chứng." />
                  <InfoItem title="Bước 4" desc="Ký – đóng dấu – trả kết quả." />

                  <div className="rounded-xl bg-blue-50 p-4 text-blue-700 ring-1 ring-blue-100">
                    <div className="font-semibold">Gợi ý giấy tờ thường cần</div>
                    <ul className="mt-2 list-disc space-y-1 pl-5 text-blue-700/90">
                      <li>CCCD/CMND (bản gốc)</li>
                      <li>Sổ hộ khẩu/giấy tờ cư trú (nếu cần)</li>
                      <li>Giấy tờ liên quan hợp đồng/ủy quyền</li>
                      <li>Bản sao để sao y/chứng thực</li>
                    </ul>
                  </div>

                  <button
                    type="button"
                    className="w-full rounded-xl bg-blue-600 px-4 py-2.5 font-semibold text-white hover:brightness-95"
                    onClick={() => alert("Demo: xem chi tiết quy trình")}
                  >
                    Xem chi tiết quy trình
                  </button>
                </div>
              </section>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  accent,
}: {
  label: string;
  value: number;
  accent?: "blue" | "emerald" | "rose";
}) {
  const map = {
    blue: "bg-blue-50 text-blue-700 ring-blue-100",
    emerald: "bg-emerald-50 text-emerald-700 ring-emerald-100",
    rose: "bg-rose-50 text-rose-700 ring-rose-100",
  } as const;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4">
      <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
        {label}
      </div>
      <div className="mt-2 flex items-end justify-between">
        <div className="text-2xl font-semibold text-slate-900">{value}</div>
        {accent && (
          <span className={["rounded-full px-2.5 py-1 text-xs font-semibold ring-1", map[accent]].join(" ")}>
            {accent === "blue" ? "Active" : accent === "emerald" ? "Done" : "Cancelled"}
          </span>
        )}
      </div>
    </div>
  );
}

function InfoItem({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="rounded-xl border border-slate-200 p-4">
      <div className="text-sm font-semibold text-slate-900">{title}</div>
      <div className="mt-1 text-sm text-slate-600">{desc}</div>
    </div>
  );
}
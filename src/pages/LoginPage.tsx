import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log({ email, password });
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Top banner */}
      <div className="relative h-[220px] w-full overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=2000&q=80)",
          }}
        />
        <div className="absolute inset-0 bg-black/55" />

        <div className="relative z-10 mx-auto flex h-full max-w-6xl flex-col items-center justify-center px-4 text-center text-white">
          <h1 className="text-3xl font-semibold md:text-4xl">Đăng nhập tài khoản</h1>
          <p className="mt-2 text-sm font-medium text-white/90">
            Trang chủ <span className="mx-2 opacity-70">/</span> Đăng nhập tài khoản
          </p>
        </div>
      </div>

      {/* Body */}
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="flex justify-center">
          <div className="w-full max-w-[720px] rounded-md border border-slate-200 bg-white p-6 shadow-sm md:p-10">
            <h2 className="text-center text-2xl font-semibold text-slate-800">
              Đăng nhập
            </h2>

            <form onSubmit={onSubmit} className="mt-6 space-y-5">
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Email<span className="text-red-500">*</span>
                </label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder="Nhập Địa chỉ Email"
                  className="h-11 w-full rounded-md border border-slate-200 px-3 text-sm outline-none focus:border-slate-400"
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Mật khẩu<span className="text-red-500">*</span>
                </label>
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  placeholder="Nhập Mật khẩu"
                  className="h-11 w-full rounded-md border border-slate-200 px-3 text-sm outline-none focus:border-slate-400"
                  required
                />
              </div>

              <div className="flex items-center justify-between text-sm">
                <a href="#" className="text-amber-700 hover:underline">
                  Quên mật khẩu?
                </a>
                <a href="#" className="text-amber-700 hover:underline">
                  Đăng ký tài khoản
                </a>
              </div>

              <button
                type="submit"
                className="h-11 w-full rounded-md bg-[#c7a57b] font-semibold uppercase tracking-wide text-white hover:brightness-95 active:brightness-90"
              >
                Đăng nhập
              </button>

              <p className="text-center text-sm text-slate-600">
                Mock cam kết bảo mật và sẽ không bao giờ đăng <br />
                hay chia sẻ thông tin mà chưa có được sự đồng ý của bạn.
              </p>

              <div className="pt-2 text-center">
                <p className="text-base font-medium text-slate-700">Hoặc đăng nhập qua</p>

                <div className="mt-3 flex justify-center gap-2">
                  <button
                    type="button"
                    className="flex h-10 w-[140px] items-center justify-center gap-2 rounded-sm bg-[#3b5998] text-sm font-semibold text-white hover:brightness-95"
                  >
                    <span className="inline-flex h-6 w-6 items-center justify-center rounded bg-white/15 font-bold">
                      f
                    </span>
                    Facebook
                  </button>

                  <button
                    type="button"
                    className="flex h-10 w-[140px] items-center justify-center gap-2 rounded-sm bg-[#db4437] text-sm font-semibold text-white hover:brightness-95"
                  >
                    <span className="inline-flex h-6 w-6 items-center justify-center rounded bg-white/15 font-bold">
                      G+
                    </span>
                    Google
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
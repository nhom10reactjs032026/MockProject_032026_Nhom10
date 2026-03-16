import React, { useState } from "react";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ email, password });
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-md p-6 sm:p-8 bg-white rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-gray-100">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-10">
          Đăng nhập
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col items-start gap-1.5">
            <label className="text-sm font-bold text-gray-700">
              Email<span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="email"
              placeholder="Nhập Địa chỉ Email"
              className="w-full px-4 py-3 rounded border border-gray-300 focus:border-[#c6a67e] focus:ring-1 focus:ring-[#c6a67e] outline-none transition-all placeholder:text-gray-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col items-start gap-1.5">
            <label className="text-sm font-bold text-gray-700">
              Mật khẩu<span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="password"
              placeholder="Nhập Mật khẩu"
              className="w-full px-4 py-3 rounded border border-gray-300 focus:border-[#c6a67e] focus:ring-1 focus:ring-[#c6a67e] outline-none transition-all placeholder:text-gray-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="flex justify-between text-sm font-medium">
            <a
              href="#"
              className="text-[#c6a67e] hover:text-[#b5956d] transition-colors"
            >
              Quên mật khẩu?
            </a>
            <a
              href="#"
              className="text-[#c6a67e] hover:text-[#b5956d] transition-colors"
            >
              Đăng ký tài khoản
            </a>
          </div>

          <button
            type="submit"
            className="w-full bg-[#c6a67e] hover:bg-[#b5956d] text-white font-bold py-4 rounded shadow-sm transition-all uppercase tracking-widest active:scale-[0.99]"
          >
            ĐĂNG NHẬP
          </button>
        </form>

        <p className="mt-8 text-center text-gray-500 text-[13px] leading-relaxed px-2">
          Wolf Arch cam kết bảo mật và sẽ không bao giờ đăng hay chia sẻ thông
          tin mà chưa có được sự đồng ý của bạn.
        </p>

        <div className="mt-8">
          <div className="relative flex items-center mb-6">
            <div className="flex-grow border-t border-gray-100"></div>
            <span className="flex-shrink mx-4 text-gray-400 text-sm font-medium">
              Hoặc đăng nhập qua
            </span>
            <div className="flex-grow border-t border-gray-100"></div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button className="flex items-center justify-center gap-2 bg-[#3b5998] text-white py-2.5 rounded text-sm font-semibold hover:bg-opacity-90 transition">
              Facebook
            </button>
            <button className="flex items-center justify-center gap-2 bg-[#ea4335] text-white py-2.5 rounded text-sm font-semibold hover:bg-opacity-90 transition">
              Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

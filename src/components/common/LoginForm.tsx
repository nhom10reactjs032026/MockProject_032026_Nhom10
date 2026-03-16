export default function LoginForm() {
  return (
    <div className="w-full max-w-2xl bg-white border rounded-md p-8">

      <h2 className="text-2xl text-center font-semibold mb-6">
        Đăng nhập
      </h2>

      <form className="space-y-5">

        <div>
          <label className="block mb-1 font-medium text-gray-700">
            Email<span className="text-red-500">*</span>
          </label>

          <input
            type="email"
            placeholder="Nhập Địa chỉ Email"
            className="w-full border rounded-md px-4 py-3"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700">
            Mật khẩu<span className="text-red-500">*</span>
          </label>

          <input
            type="password"
            placeholder="Nhập Mật khẩu"
            className="w-full border rounded-md px-4 py-3"
          />
        </div>

        <div className="flex justify-between text-sm text-[#c4a07a]">

          <a href="#">
            Quên mật khẩu?
          </a>

          <a href="#">
            Đăng ký tài khoản
          </a>

        </div>

        <button className="w-full bg-[#c4a07a] text-white py-3 rounded-md font-semibold">
          ĐĂNG NHẬP
        </button>

      </form>

      <p className="text-center text-gray-600 text-sm mt-6">
        Wolf Arch cam kết bảo mật và sẽ không bao giờ đăng 
        <br />
        hay chia sẻ thông tin mà chưa có được sự đồng ý của bạn.
      </p>

      <div className="text-center mt-6">

        <p className="mb-4 text-lg">
          Hoặc đăng nhập qua
        </p>

        <div className="flex justify-center">

          <button className="bg-blue-700 text-white px-6 py-2 rounded-l">
            Facebook
          </button>

          <button className="bg-red-500 text-white px-6 py-2 rounded-r">
            Google
          </button>

        </div>

      </div>

    </div>
  )
}
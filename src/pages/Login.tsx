import LoginForm from "@/components/common/LoginForm"
import hero from "@/assets/hero.png"

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col">

      {/* FORM */}
      <div className="flex justify-center py-16 bg-gray-100">
        <LoginForm />
      </div>

      {/* FOOTER */}
      <footer className="bg-[#0f1f22] text-white pt-14 pb-6">

        <div className="max-w-6xl mx-auto grid grid-cols-4 gap-10">

          <div>
            <h2 className="text-2xl font-bold mb-4">
              WolfArch
            </h2>

            <p className="text-sm text-gray-300">
              support@sapo.vn
            </p>

            <p className="text-sm text-gray-300">
              70 Lữ Gia, Quận 11, TP HCM
            </p>

            <p className="text-sm text-gray-300">
              1900 6750
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-3">
              Về chúng tôi
            </h3>

            <ul className="text-sm space-y-2 text-gray-300">
              <li>Giới thiệu Wolf Arch</li>
              <li>Tuyển dụng</li>
              <li>Dự án đã thực hiện</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-3">
              Portfolio
            </h3>

            <ul className="text-sm space-y-2 text-gray-300">
              <li>Thiết kế nội thất nhà ở</li>
              <li>Thiết kế nhà sang trọng</li>
              <li>Thiết kế thương mại</li>
              <li>Thiết kế cải tạo</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-3">
              Phong cách nội thất
            </h3>

            <ul className="text-sm space-y-2 text-gray-300">
              <li>Minimalist tối giản</li>
              <li>Modern hiện đại</li>
              <li>Cổ điển</li>
              <li>Thô mộc</li>
            </ul>
          </div>

        </div>

        <p className="text-center text-sm text-gray-400 mt-10">
          © Bản quyền thuộc về Wolf Themes
        </p>

      </footer>

    </div>
  )
}
import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Mail, MapPin, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-secondary/20 text-foreground pt-32 pb-16 px-6 sm:px-12 border-t border-border/10">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-12 pb-20 border-b border-border/20">
          <div className="space-y-4">
            <Link
              to="/"
              className="text-4xl font-bold text-foreground uppercase block mb-2 hover:text-primary transition-colors cursor-default"
            >
              WolfArch
            </Link>
            <span className="text-[10px] font-bold text-primary tracking-[0.5em] block uppercase opacity-70">
              Premium Notary Services USA
            </span>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-12">
            <span className="text-xs font-bold uppercase tracking-widest opacity-40">
              Kết nối cộng đồng
            </span>
            <div className="flex gap-4">
              <SocialIcon icon={<Facebook className="w-5 h-5" />} />
              <SocialIcon icon={<Instagram className="w-5 h-5" />} />
              <SocialIcon icon={<Twitter className="w-5 h-5" />} />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-16 py-20">
          <FooterColumn title="Tư vấn 24/7">
            <ContactItem icon={<Mail className="w-4 h-4 text-primary" />} text="support@wolfarch.us" />
            <ContactItem icon={<MapPin className="w-4 h-4 text-primary" />} text="70 Lữ Gia, P.15, Q.11, Sài Gòn" />
            <ContactItem icon={<Phone className="w-4 h-4 text-primary" />} text="+1 555-0199-WOLF" />
          </FooterColumn>

          <FooterColumn title="Về chúng tôi">
            <FooterLink label="Bản sắc Wolf Arch" />
            <FooterLink label="Đội ngũ Luật sư" />
            <FooterLink label="Dự án Tiêu biểu" />
            <FooterLink label="Chính sách Bảo mật" />
          </FooterColumn>

          <FooterColumn title="Lĩnh vực">
            <FooterLink label="Công chứng Real Estate" />
            <FooterLink label="Di chúc & Thừa kế" />
            <FooterLink label="Giấy ủy quyền đại diện" />
            <FooterLink label="Hợp pháp hóa Apostille" />
          </FooterColumn>

          <FooterColumn title="Dịch vụ số">
            <FooterLink label="Cổng đăng ký Online" />
            <FooterLink label="Tra cứu mã QR hồ sơ" />
            <FooterLink label="Xác thực Blockchain" />
            <FooterLink label="Lưu trữ chữ ký số" />
          </FooterColumn>
        </div>

        <div className="pt-12 flex flex-col sm:flex-row justify-between items-center gap-6 text-[9px] uppercase font-bold tracking-widest opacity-40">
          <p>© 2026 Wolf Notary Services USA - Legal Excellence Guaranteed.</p>
          <div className="flex gap-10">
            <a href="#" className="hover:text-primary transition-colors">Privacy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms</a>
            <a href="#" className="hover:text-primary transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

const FooterColumn = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="space-y-8">
    <h3 className="text-xs font-bold uppercase tracking-[0.4em] text-primary/80">{title}</h3>
    <div className="flex flex-col gap-4">{children}</div>
  </div>
);

const FooterLink = ({ label }: { label: string }) => (
  <a
    href="#"
    className="text-xs font-bold text-muted-foreground hover:text-primary transition-all tracking-wider uppercase opacity-80 hover:opacity-100"
  >
    {label}
  </a>
);

const ContactItem = ({ icon, text }: { icon: React.ReactNode; text: string }) => (
  <div className="flex items-center gap-4 group cursor-pointer">
    <div className="flex items-center justify-center w-10 h-10 rounded-2xl bg-secondary/70 group-hover:bg-primary/20 transition-all shadow-sm">
      {icon}
    </div>
    <span className="text-[11px] font-bold text-muted-foreground group-hover:text-foreground transition-colors">
      {text}
    </span>
  </div>
);

const SocialIcon = ({ icon }: { icon: React.ReactNode }) => (
  <a
    href="#"
    className="w-12 h-12 rounded-full bg-secondary hover:bg-white text-muted-foreground hover:text-primary flex items-center justify-center transition-all shadow-sm hover:shadow-xl transform hover:scale-110 active:scale-95"
  >
    {icon}
  </a>
);
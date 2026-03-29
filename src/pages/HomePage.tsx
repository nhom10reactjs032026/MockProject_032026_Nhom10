import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";
import { ArrowRight, Shield, FileText, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export const HomePage = () => {
  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-500">
      <Header />

      {/* Hero Section - Strict Tailwind classes */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden pt-48 pb-20">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-background z-10" />
          <img
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2301"
            alt="Notary Office"
            className="w-full h-full object-cover animate-pulse-slow"
          />
        </div>

        <div className="relative z-20 container mx-auto px-10 py-12 sm:px-20">
          <div className="max-w-4xl space-y-8">
            <h1 className="text-5xl sm:text-8xl md:text-9xl font-bold text-white uppercase drop-shadow-2xl animate-in fade-in slide-in-from-bottom-8 duration-1000">
              Pháp lý <br />
              <span className="text-white/60">Tin cậy.</span>
            </h1>

            <p className="text-base sm:text-lg text-white/80 font-medium max-w-xl leading-relaxed animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-300">
              Giải pháp công chứng số hoá hàng đầu tại Hoa Kỳ. Chúng tôi kết hợp
              công nghệ hiện đại với sự tận tâm để bảo vệ giá trị pháp lý cho
              mọi giao dịch.
            </p>

            <div className="pt-8 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-500">
              <Button className="h-14 px-10 bg-primary hover:bg-primary/90 text-primary-foreground font-bold uppercase tracking-widest text-xs rounded-full shadow-xl group transition-all duration-300">
                Tư vấn miễn phí
                <ArrowRight className="ml-3 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* About Section - No arbitrary px values */}
      <section className="py-24 lg:py-40 container mx-auto px-6 sm:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div className="grid grid-cols-2 gap-6 relative">
            <div className="space-y-6 pt-16">
              <img
                src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=800"
                alt="Notary 1"
                className="w-full aspect-[4/5] object-cover rounded-3xl shadow-2xl hover:scale-105 transition-transform duration-500"
              />
              <img
                src="https://images.unsplash.com/photo-1521791136064-7986c295944b?auto=format&fit=crop&q=80&w=800"
                alt="Notary 2"
                className="w-full aspect-square object-cover rounded-3xl shadow-xl hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="space-y-6">
              <img
                src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=800"
                alt="Notary 3"
                className="w-full aspect-square object-cover rounded-3xl shadow-xl hover:scale-105 transition-transform duration-500"
              />
              <img
                src="https://images.unsplash.com/photo-1554469384-e58fac16e23a?auto=format&fit=crop&q=80&w=800"
                alt="Notary 4"
                className="w-full aspect-[4/5] object-cover rounded-3xl shadow-2xl hover:scale-105 transition-transform duration-500"
              />
            </div>
            {/* Soft accent using standard Tailwind blur */}
            <div className="absolute inset-0 -z-10 m-auto w-3/4 h-3/4 bg-primary/5 rounded-full blur-3xl" />
          </div>

          <div className="space-y-12">
            <div className="space-y-6 text-left">
              <div className="inline-block py-2 px-4 bg-primary/10 rounded-full">
                <span className="text-primary font-bold uppercase tracking-widest text-[10px]">
                  Since 2011
                </span>
              </div>
              <h2 className="text-5xl sm:text-7xl font-bold text-foreground uppercase tracking-tight">
                Kiến tạo{" "}
                <span className="text-primary opacity-80">niềm tin</span> <br />{" "}
                qua từng hồ sơ
              </h2>
              <p className="text-muted-foreground font-medium text-base leading-relaxed max-w-lg">
                Wolf Arch không chỉ là một văn phòng công chứng, mà là người bảo
                vệ pháp lý tận tâm. Mỗi quy trình được thiết kế nhằm mang lại sự
                nhẹ nhàng nhất.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-10">
              <StatItem value="1500+" label="Hồ sơ/Tháng" />
              <StatItem value="50+" label="Tiểu bang" />
              <StatItem value="24/7" label="Hỗ trợ" />
            </div>

            <div className="pt-4">
              <Button
                variant="outline"
                className="h-14 px-10 border-primary text-primary hover:bg-primary hover:text-white rounded-full font-black uppercase tracking-widest text-xs group transition-all duration-300"
              >
                Tìm hiểu thêm
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid - Softer design with standard utility classes */}
      <section className="py-24 lg:py-40 bg-secondary/30">
        <div className="container mx-auto px-6 sm:px-12 space-y-20">
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <span className="text-primary font-bold uppercase tracking-[0.4em] text-[10px]">
              Ưu thế của chúng tôi
            </span>
            <h2 className="text-5xl sm:text-7xl font-bold text-foreground uppercase tracking-tight">
              Tại sao chọn <span className="text-primary">Wolf Arch</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ServiceCard
              icon={<Shield className="w-10 h-10" />}
              title="Bảo mật NIST"
              desc="Hệ thống lưu trữ tài liệu mã hóa chuẩn liên bang Hoa Kỳ, đảm bảo an toàn tuyệt đối."
            />
            <ServiceCard
              icon={<Globe className="w-10 h-10" />}
              title="Công chứng RON"
              desc="Dịch vụ công chứng trực tuyến giúp quý khách hàng tiết kiệm thời gian tối đa."
            />
            <ServiceCard
              icon={<FileText className="w-10 h-10" />}
              title="Xác thực hồ sơ"
              desc="Chứng nhận Apostille và hợp pháp hóa lãnh sự cho mọi loại giấy tờ quốc tế."
            />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

const StatItem = ({ value, label }: { value: string; label: string }) => (
  <div className="space-y-1">
    <div className="text-4xl font-black text-foreground tracking-tight">
      {value}
    </div>
    <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground opacity-60 leading-none">
      {label}
    </div>
  </div>
);

const ServiceCard = ({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) => (
  <Card className="bg-background/40 backdrop-blur-sm border-none shadow-sm hover:shadow-2xl transition-all duration-500 group rounded-[2.5rem]">
    <CardContent className="p-12 space-y-8 text-left">
      <div className="text-primary bg-primary/5 w-20 h-20 flex items-center justify-center rounded-3xl group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-500">
        {icon}
      </div>
      <div className="space-y-4">
        <h3 className="text-2xl font-bold uppercase tracking-tight text-foreground leading-tight">
          {title}
        </h3>
        <p className="text-muted-foreground font-medium text-sm leading-relaxed opacity-80">
          {desc}
        </p>
      </div>
      <div className="flex items-center gap-2 text-[10px] font-bold text-primary uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
        Xem chi tiết <ArrowRight className="w-3 h-3" />
      </div>
    </CardContent>
  </Card>
);

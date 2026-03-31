import React from 'react';
import  Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Facebook } from 'lucide-react';
import { Link } from 'react-router-dom';

export const LoginPage = () => {
  return (
    <div className="min-h-screen bg-[#f8f8f8] flex flex-col pt-20 transition-colors duration-500 font-['Plus_Jakarta_Sans']">
      <Header />
      <Footer />
      {/* Hero Banner Section */}
      <section className="relative h-96 flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/60 z-10" />
          <img 
            src="https://images.unsplash.com/photo-1497366858526-0766cadbe8fa?auto=format&fit=crop&q=80&w=2301" 
            alt="Banner"
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="relative z-20 text-center space-y-4 px-6 md:container mx-auto">
          <h1 className="text-4xl sm:text-5xl font-bold text-white uppercase tracking-tight">
            Đăng nhập tài khoản
          </h1>
          <nav className="flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest text-white">
            <Link to="/" className="hover:text-[#c4a484] transition-colors">Trang chủ</Link>
            <span className="opacity-60 text-sm">/</span>
            <span className="opacity-80">Đăng nhập tài khoản</span>
          </nav>
        </div>
      </section>

      {/* Login Form Section */}
      <section className="py-16 px-6">
        <Card className="max-w-xl mx-auto border border-border/50 shadow-sm rounded-none bg-white p-8 sm:p-12 transition-all">
          <CardContent className="p-0 space-y-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-foreground mb-6">Đăng nhập</h2>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-semibold text-foreground">
                  Email <span className="text-red-500">*</span>
                </Label>
                <Input 
                  id="email"
                  type="email" 
                  placeholder="Nhập Địa chỉ Email" 
                  className="h-12 border-[#ebebeb] bg-white focus-visible:ring-1 focus-visible:ring-[#c4a484] rounded-none transition-all text-sm"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-semibold text-foreground">
                  Mật khẩu <span className="text-red-500">*</span>
                </Label>
                <Input 
                  id="password"
                  type="password" 
                  placeholder="Nhập Mật khẩu" 
                  className="h-12 border-[#ebebeb] bg-white focus-visible:ring-1 focus-visible:ring-[#c4a484] rounded-none transition-all text-sm"
                />
              </div>
            </div>

            <div className="flex justify-between items-center text-[12px] font-medium text-[#c4a484]">
              <a href="#" className="hover:opacity-80 transition-opacity">Quên mật khẩu?</a>
              <Link to="/account/register" className="hover:opacity-80 transition-opacity">Đăng ký tài khoản</Link>
            </div>

            <Button 
              type="submit" 
              className="w-full h-11 bg-[#c4a484] hover:bg-[#b08e6d] text-white font-bold uppercase tracking-[0.2em] text-xs rounded-none transition-all shadow-md"
            >
              ĐĂNG NHẬP
            </Button>

            <div className="text-center space-y-6">
              <p className="text-[12px] text-muted-foreground leading-relaxed max-w-sm mx-auto">
                Wolf Arch cam kết bảo mật và sẽ không bao giờ đăng hay chia sẻ thông tin mà chưa có được sự đồng ý của bạn.
              </p>

              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="h-[1px] flex-1 bg-border/50" />
                  <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-widest">
                    Hoặc đăng nhập qua
                  </p>
                  <div className="h-[1px] flex-1 bg-border/50" />
                </div>

                <div className="flex gap-3">
                  <Button type="button" className="flex-1 h-10 bg-[#3b5998] hover:bg-[#3b5998]/90 text-white rounded-none flex items-center justify-center gap-2 transition-all font-bold text-[10px] uppercase tracking-widest">
                    <Facebook className="fill-current w-4 h-4" />
                    Facebook
                  </Button>
                  <Button type="button" className="flex-1 h-10 bg-[#e34133] hover:bg-[#e34133]/90 text-white rounded-none flex items-center justify-center gap-2 transition-all font-bold text-[10px] uppercase tracking-widest">
                    <div className="bg-white text-[#e34133] px-1 font-black rounded-sm">G+</div>
                    Google
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      <Footer />
    </div>
  );
};


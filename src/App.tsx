import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import './App.css';

export default function App() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50/50">
      <Card className="w-full max-w-lg border-none shadow-lg rounded-3xl bg-white overflow-hidden p-6 sm:p-10">
        <CardHeader className="pt-8 pb-10">
          <CardTitle className="text-4xl font-extrabold text-center text-foreground tracking-tight">
            Đăng nhập
          </CardTitle>
        </CardHeader>
        
        <CardContent className="px-2 pb-6 space-y-8">
          <form className="space-y-8">
            <div className="space-y-3">
              <Label htmlFor="email" className="text-foreground/80 font-bold text-sm flex items-center uppercase tracking-wider">
                Email <span className="text-destructive ml-1">*</span>
              </Label>
              <Input 
                id="email"
                type="email" 
                placeholder="duy1" 
                className="h-14 px-6 bg-blue-50/50 border-none focus-visible:ring-1 focus-visible:ring-primary/20 placeholder:text-muted-foreground text-lg rounded-2xl transition-all"
              />
            </div>

            <div className="space-y-3">
              <Label htmlFor="password" className="text-foreground/80 font-bold text-sm flex items-center uppercase tracking-wider">
                Mật khẩu <span className="text-destructive ml-1">*</span>
              </Label>
              <Input 
                id="password"
                type="password" 
                placeholder="...." 
                className="h-14 px-6 bg-blue-50/50 border-none focus-visible:ring-1 focus-visible:ring-primary/20 placeholder:text-muted-foreground text-lg rounded-2xl transition-all"
              />
            </div>

            <div className="flex justify-between items-center px-1">
              <a href="#" className="text-muted-foreground/40 hover:text-foreground text-xs font-semibold uppercase tracking-widest transition-colors">
                Quên mật khẩu?
              </a>
              <a href="#" className="text-muted-foreground/40 hover:text-foreground text-xs font-semibold uppercase tracking-widest transition-colors">
                Đăng ký tài khoản
              </a>
            </div>

            <Button 
              type="submit" 
              className="w-full h-14 bg-primary hover:opacity-90 text-primary-foreground font-bold rounded-2xl uppercase tracking-[0.2em] text-sm transition-all shadow-md border-none"
            >
              ĐĂNG NHẬP
            </Button>
          </form>
        </CardContent>

        <CardFooter className="flex flex-col px-2 pb-6">
          <div className="text-center w-full space-y-10">
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs mx-auto font-medium">
              Wolf Arch cam kết bảo mật và sẽ không bao giờ đăng hay chia sẻ thông tin mà chưa có được sự đồng ý của bạn.
            </p>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border/50"></div>
              </div>
              <div className="relative flex justify-center text-[10px] tracking-[0.3em] font-black uppercase">
                <span className="px-6 bg-white text-muted-foreground/30">HOẶC ĐĂNG NHẬP QUA</span>
              </div>
            </div>

            <div className="flex space-x-2 justify-center">
              <Button type="button" className="flex-1 h-11 p-0 bg-[#3b5998] hover:opacity-90 hover:bg-[#3b5998] text-white rounded-none border-none flex  overflow-hidden transition-all">
                <div className="flex items-center justify-center w-12 bg-black/10 font-bold text-xl h-full">f</div>
                <div className="flex-1 flex items-center justify-center font-normal text-sm">Facebook</div>
              </Button>
              <Button type="button" className="flex-1 h-11 p-0 bg-[#ea4335] hover:opacity-90 hover:bg-[#ea4335] text-white rounded-none border-none flex  overflow-hidden transition-all">
                <div className="flex items-center justify-center w-12 bg-black/10 font-bold text-xl h-full">G+</div>
                <div className="flex-1 flex items-center justify-center font-normal text-sm">Google</div>
              </Button>
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

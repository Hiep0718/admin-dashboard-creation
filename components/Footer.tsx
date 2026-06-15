'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Facebook, Linkedin, Twitter, Instagram, Mail, Send } from 'lucide-react';

export function Footer() {
  return (
    <footer className="relative bg-gradient-to-b from-slate-900 to-slate-950 pt-20 pb-8 overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-[120px]" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* CTA Banner */}
        <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-3xl p-8 sm:p-12 mb-16 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl shadow-blue-600/20">
          <div>
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">Sẵn sàng tham quan?</h3>
            <p className="text-blue-100 text-sm sm:text-base">Đăng ký ngay để không bỏ lỡ sự kiện triển lãm ảo lớn nhất năm 2026</p>
          </div>
          <Button className="bg-white text-blue-600 hover:bg-blue-50 font-semibold px-8 py-6 rounded-xl text-base shadow-lg flex-shrink-0">
            Đăng ký miễn phí <Send className="ml-2 w-4 h-4" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="space-y-5">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-blue-500/20">
                <span className="font-bold text-white text-xl">FC</span>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-base leading-tight tracking-tight text-white">
                  FUTURE CONSUMER
                </span>
                <span className="font-bold text-base leading-tight text-blue-400">
                  EXPO 2026
                </span>
              </div>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
              Sự kiện triển lãm trực tuyến hàng đầu về công nghệ 
              và trải nghiệm tiêu dùng tương lai.
            </p>
          </div>

          {/* Links 1 */}
          <div>
            <h4 className="text-white font-semibold mb-5 uppercase text-sm tracking-wider">VỀ SỰ KIỆN</h4>
            <ul className="space-y-3.5">
              {['Giới thiệu', 'Ban tổ chức', 'Đối tác', 'Liên hệ'].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-slate-400 hover:text-white text-sm transition-colors flex items-center gap-2 group">
                    <span className="w-0 group-hover:w-2 h-px bg-blue-500 transition-all" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Links 2 */}
          <div>
            <h4 className="text-white font-semibold mb-5 uppercase text-sm tracking-wider">THÔNG TIN</h4>
            <ul className="space-y-3.5">
              {['Hướng dẫn tham quan', 'Câu hỏi thường gặp', 'Hỗ trợ kỹ thuật', 'Chính sách bảo mật'].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-slate-400 hover:text-white text-sm transition-colors flex items-center gap-2 group">
                    <span className="w-0 group-hover:w-2 h-px bg-blue-500 transition-all" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social & Newsletter */}
          <div className="space-y-7">
            <div>
              <h4 className="text-white font-semibold mb-5 uppercase text-sm tracking-wider">THEO DÕI CHÚNG TÔI</h4>
              <div className="flex space-x-3">
                {[
                  { Icon: Facebook, hoverBg: 'hover:bg-blue-600' },
                  { Icon: Twitter, hoverBg: 'hover:bg-sky-500' },
                  { Icon: Linkedin, hoverBg: 'hover:bg-blue-700' },
                  { Icon: Instagram, hoverBg: 'hover:bg-pink-600' },
                ].map(({ Icon, hoverBg }, i) => (
                  <a key={i} href="#" className={`w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-slate-400 ${hoverBg} hover:text-white transition-all border border-white/5 hover:border-transparent hover:scale-110`}>
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4 uppercase text-sm tracking-wider flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-400" /> ĐĂNG KÝ NHẬN TIN
              </h4>
              <div className="flex gap-2">
                <Input 
                  type="email" 
                  placeholder="Nhập email của bạn" 
                  className="bg-white/5 border-white/10 text-white placeholder:text-slate-500 rounded-xl focus:border-blue-500 focus:ring-blue-500/20" 
                />
                <Button className="bg-blue-600 hover:bg-blue-500 text-white rounded-xl px-4 shadow-lg shadow-blue-600/20">
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm text-center md:text-left">
            &copy; 2026 Future Consumer Expo. All rights reserved.
          </p>
          <div className="flex items-center space-x-6">
            <Link href="#" className="text-slate-500 hover:text-white text-sm transition-colors">Điều khoản sử dụng</Link>
            <span className="text-slate-700">·</span>
            <Link href="#" className="text-slate-500 hover:text-white text-sm transition-colors">Chính sách bảo mật</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

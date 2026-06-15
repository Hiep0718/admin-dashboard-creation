'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Facebook, Linkedin, Twitter, Instagram, Mail, Send } from 'lucide-react';

export function Footer() {
  return (
    <footer className="relative bg-[#070b14] pt-24 pb-8 overflow-hidden">
      {/* Top line accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />

      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        {/* CTA Banner */}
        <div className="p-[1px] rounded-2xl bg-gradient-to-r from-blue-500/30 via-blue-600/40 to-cyan-500/30 mb-16">
          <div className="bg-gradient-to-r from-blue-600/90 to-blue-700/90 rounded-[calc(1rem-1px)] p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-1">Sẵn sàng tham quan?</h3>
              <p className="text-blue-100/60 text-sm">Đăng ký ngay để không bỏ lỡ sự kiện lớn nhất năm 2026</p>
            </div>
            <Button className="bg-white text-blue-600 hover:bg-blue-50 font-medium h-11 px-7 rounded-lg text-sm flex-shrink-0 transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98]">
              Đăng ký miễn phí <Send className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="font-bold text-white text-sm">FC</span>
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-semibold text-[13px] text-white/90 tracking-tight">FUTURE CONSUMER</span>
                <span className="font-semibold text-[13px] text-blue-400 tracking-tight">EXPO 2026</span>
              </div>
            </Link>
            <p className="text-white/25 text-xs leading-relaxed max-w-xs">
              Sự kiện triển lãm trực tuyến hàng đầu về công nghệ 
              và trải nghiệm tiêu dùng tương lai.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white/60 font-semibold mb-4 text-xs tracking-wider">VỀ SỰ KIỆN</h4>
            <ul className="space-y-3">
              {['Giới thiệu', 'Ban tổ chức', 'Đối tác', 'Liên hệ'].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-white/25 hover:text-white/60 text-xs transition-colors duration-300">{item}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white/60 font-semibold mb-4 text-xs tracking-wider">THÔNG TIN</h4>
            <ul className="space-y-3">
              {['Hướng dẫn tham quan', 'Câu hỏi thường gặp', 'Hỗ trợ kỹ thuật', 'Chính sách bảo mật'].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-white/25 hover:text-white/60 text-xs transition-colors duration-300">{item}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social + Newsletter */}
          <div className="space-y-6">
            <div>
              <h4 className="text-white/60 font-semibold mb-4 text-xs tracking-wider">THEO DÕI CHÚNG TÔI</h4>
              <div className="flex gap-2">
                {[
                  { Icon: Facebook, hover: 'hover:bg-blue-600' },
                  { Icon: Twitter, hover: 'hover:bg-sky-500' },
                  { Icon: Linkedin, hover: 'hover:bg-blue-700' },
                  { Icon: Instagram, hover: 'hover:bg-pink-600' },
                ].map(({ Icon, hover }, i) => (
                  <a key={i} href="#" className={`w-8 h-8 rounded-lg bg-white/[0.04] flex items-center justify-center text-white/30 ${hover} hover:text-white transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] ring-1 ring-white/[0.04] hover:ring-transparent active:scale-[0.95]`}>
                    <Icon className="w-3.5 h-3.5" />
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-white/60 font-semibold mb-3 text-xs tracking-wider flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-blue-400/60" /> ĐĂNG KÝ NHẬN TIN
              </h4>
              <div className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Nhập email của bạn"
                  className="bg-white/[0.04] border-white/[0.06] text-white placeholder:text-white/20 rounded-lg text-xs h-9 focus:border-blue-500/40 focus:ring-blue-500/10"
                />
                <Button className="bg-blue-600 hover:bg-blue-500 text-white rounded-lg h-9 px-3 transition-all duration-300 active:scale-[0.95]">
                  <Send className="w-3.5 h-3.5" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-white/[0.04] flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-white/15 text-[11px]">
            &copy; 2026 Future Consumer Expo. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <Link href="#" className="text-white/15 hover:text-white/40 text-[11px] transition-colors duration-300">Điều khoản sử dụng</Link>
            <Link href="#" className="text-white/15 hover:text-white/40 text-[11px] transition-colors duration-300">Chính sách bảo mật</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

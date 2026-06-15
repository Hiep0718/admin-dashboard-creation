'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Globe, Menu, X } from 'lucide-react';

const navItems = [
  { href: '#trien-lam', label: 'TRIỂN LÃM', active: true },
  { href: '#cong-nghe', label: 'CÔNG NGHỆ' },
  { href: '#lich-trinh', label: 'LỊCH TRÌNH' },
  { href: '#tin-tuc', label: 'TIN TỨC' },
  { href: '#ve-su-kien', label: 'VỀ SỰ KIỆN' },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 z-40 w-full">
      {/* Outer shell - double bezel */}
      <div className="bg-[#070b14]/90 backdrop-blur-xl border-b border-white/[0.06]">
        <div className="max-w-[1400px] mx-auto flex h-16 items-center justify-between px-6">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:bg-blue-500">
              <span className="font-bold text-white text-sm tracking-tight">FC</span>
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-semibold text-[13px] text-white/90 tracking-tight">FUTURE CONSUMER</span>
              <span className="font-semibold text-[13px] text-blue-400 tracking-tight">EXPO 2026</span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-[13px] font-medium px-4 py-2 rounded-lg transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                  item.active
                    ? 'text-white bg-white/[0.06]'
                    : 'text-white/50 hover:text-white/80 hover:bg-white/[0.04]'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="hidden sm:flex items-center gap-3">
            <button className="flex items-center gap-1.5 text-[13px] text-white/50 hover:text-white/80 px-3 py-2 rounded-lg hover:bg-white/[0.04] transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]">
              <Globe className="w-4 h-4" />
              <span>VI</span>
            </button>
            <Link href="/login">
              <Button className="bg-blue-600 hover:bg-blue-500 text-white font-medium text-[13px] px-5 h-9 rounded-lg transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98]">
                ĐĂNG NHẬP
              </Button>
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden p-2 text-white/60 hover:text-white transition-colors rounded-lg hover:bg-white/[0.04]"
            aria-label="Toggle menu"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden bg-[#070b14]/95 backdrop-blur-xl border-b border-white/[0.06]">
          <nav className="max-w-[1400px] mx-auto flex flex-col gap-1 px-6 py-5">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`text-sm font-medium px-4 py-3 rounded-lg transition-all duration-300 ${
                  item.active ? 'text-white bg-white/[0.06]' : 'text-white/60 hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-4 mt-2 flex items-center gap-3 border-t border-white/[0.06]">
              <Link href="/login" className="flex-1">
                <Button className="w-full bg-blue-600 text-white rounded-lg h-10">ĐĂNG NHẬP</Button>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

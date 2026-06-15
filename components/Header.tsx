'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Globe2 } from 'lucide-react';
import { useState } from 'react';

const navItems = [
  { href: '#trien-lam', label: 'Triển lãm', active: true },
  { href: '#cong-nghe', label: 'Công nghệ' },
  { href: '#lich-trinh', label: 'Lịch trình' },
  { href: '#tin-tuc', label: 'Tin tức' },
  { href: '#ve-su-kien', label: 'Về sự kiện' },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-40 px-4 pt-4 sm:px-6">
      <div className="mx-auto flex h-16 max-w-[1220px] items-center justify-between rounded-full border border-white/10 bg-[#06101a]/72 px-3 pl-4 shadow-[0_18px_70px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.14)] backdrop-blur-2xl">
        <Link href="/" className="group flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-full bg-cyan-300 text-sm font-black text-[#06111c] shadow-[0_14px_34px_rgba(34,211,238,0.22)] transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-105">
            FC
          </div>
          <div className="hidden flex-col leading-none sm:flex">
            <span className="text-[12px] font-bold uppercase tracking-[0.04em] text-white">Future Consumer</span>
            <span className="text-[12px] font-bold uppercase tracking-[0.04em] text-cyan-200">Expo 2026</span>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-full px-4 py-2.5 text-[13px] font-semibold transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                item.active
                  ? 'bg-white text-[#07111d] shadow-[0_10px_30px_rgba(255,255,255,0.12)]'
                  : 'text-white/56 hover:bg-white/[0.07] hover:text-white'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 sm:flex">
          <button className="group flex h-10 items-center gap-2 rounded-full px-3 text-[13px] font-semibold text-white/58 transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-white/[0.07] hover:text-white">
            <Globe2 className="h-4 w-4 transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:rotate-12" />
            VI
          </button>
          <Link href="/login">
            <Button className="h-10 rounded-full bg-white px-5 text-[13px] font-bold text-[#07111d] transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-cyan-200 active:scale-[0.98]">
              Đăng nhập
            </Button>
          </Link>
        </div>

        <button
          onClick={() => setOpen((value) => !value)}
          className="relative grid h-11 w-11 place-items-center rounded-full bg-white/[0.07] text-white transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-white/[0.12] lg:hidden"
          aria-label="Mở menu"
          aria-expanded={open}
        >
          <span
            className={`absolute h-px w-5 bg-current transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] ${
              open ? 'translate-y-0 rotate-45' : '-translate-y-1.5'
            }`}
          />
          <span
            className={`absolute h-px w-5 bg-current transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] ${
              open ? 'translate-y-0 -rotate-45' : 'translate-y-1.5'
            }`}
          />
        </button>
      </div>

      <div
        className={`mx-auto mt-3 max-w-[1220px] overflow-hidden rounded-[2rem] border border-white/10 bg-[#06101a]/86 shadow-[0_28px_90px_rgba(0,0,0,0.42),inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-2xl transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] lg:hidden ${
          open ? 'max-h-[520px] opacity-100' : 'max-h-0 border-transparent opacity-0'
        }`}
      >
        <nav className="grid gap-1 p-3">
          {navItems.map((item, index) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              style={{ transitionDelay: open ? `${index * 45}ms` : '0ms' }}
              className={`rounded-[1.4rem] px-5 py-4 text-base font-bold transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                open ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
              } ${item.active ? 'bg-white text-[#07111d]' : 'text-white/64 hover:bg-white/[0.07] hover:text-white'}`}
            >
              {item.label}
            </Link>
          ))}
          <Link href="/login" onClick={() => setOpen(false)} className="mt-2">
            <Button className="h-12 w-full rounded-full bg-cyan-300 text-sm font-black text-[#06111c] hover:bg-white">
              Đăng nhập
            </Button>
          </Link>
        </nav>
      </div>
    </header>
  );
}

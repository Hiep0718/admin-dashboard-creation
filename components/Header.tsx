'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Bell, Globe2 } from 'lucide-react';
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
    <header className="fixed inset-x-0 top-0 z-40 px-3 pt-3 sm:px-6">
      <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between rounded-[1.35rem] border border-slate-200/80 bg-white/90 px-3 shadow-[0_18px_70px_rgba(15,23,42,0.12),inset_0_1px_0_rgba(255,255,255,0.85)] backdrop-blur-2xl">
        <Link href="/" className="group flex min-w-0 items-center gap-3 rounded-[1rem] px-1.5 py-1.5">
          <img
            src="/logos/fce-logo.svg"
            alt="Future Consumer Expo 2026"
            className="h-11 w-[196px] max-w-[58vw] object-contain object-left transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-[1.015]"
          />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`relative rounded-full px-4 py-2.5 text-[13px] font-semibold transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                item.active
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-950'
              }`}
            >
              {item.label}
              {item.active ? (
                <span className="absolute inset-x-5 -bottom-2 h-1 rounded-full bg-blue-600 shadow-[0_8px_20px_rgba(37,99,235,0.38)]" />
              ) : null}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 sm:flex">
          <button className="group flex h-10 items-center gap-2 rounded-full px-3 text-[13px] font-semibold text-slate-600 transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-slate-100 hover:text-slate-950">
            <Globe2 className="h-4 w-4 transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:rotate-12" />
            VI
          </button>
          <button
            aria-label="Thông báo"
            className="relative grid h-10 w-10 place-items-center rounded-full text-slate-600 transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-slate-100 hover:text-slate-950"
          >
            <Bell className="h-4 w-4" />
            <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-blue-600 ring-2 ring-white" />
          </button>
          <Link href="/login">
            <Button className="h-10 rounded-[0.9rem] bg-blue-600 px-5 text-[13px] font-bold text-white shadow-[0_14px_34px_rgba(37,99,235,0.26)] transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-blue-700 active:scale-[0.98]">
              Đăng nhập
            </Button>
          </Link>
        </div>

        <button
          onClick={() => setOpen((value) => !value)}
          className="relative grid h-11 w-11 place-items-center rounded-full bg-slate-100 text-slate-900 transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-slate-200 lg:hidden"
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
        className={`mx-auto mt-3 max-w-[1440px] overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white/94 shadow-[0_28px_90px_rgba(15,23,42,0.14)] backdrop-blur-2xl transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] lg:hidden ${
          open ? 'max-h-[540px] opacity-100' : 'max-h-0 border-transparent opacity-0'
        }`}
      >
        <nav className="grid gap-1 p-3">
          {navItems.map((item, index) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              style={{ transitionDelay: open ? `${index * 45}ms` : '0ms' }}
              className={`rounded-[1.1rem] px-5 py-4 text-base font-bold transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                open ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
              } ${item.active ? 'bg-blue-50 text-blue-700' : 'text-slate-700 hover:bg-slate-100 hover:text-slate-950'}`}
            >
              {item.label}
            </Link>
          ))}
          <Link href="/login" onClick={() => setOpen(false)} className="mt-2">
            <Button className="h-12 w-full rounded-[1rem] bg-blue-600 text-sm font-black text-white hover:bg-blue-700">
              Đăng nhập
            </Button>
          </Link>
        </nav>
      </div>
    </header>
  );
}

'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Globe, Menu, X } from 'lucide-react';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 z-50 w-full bg-slate-950/80 backdrop-blur-xl border-b border-white/5">
      <div className="container mx-auto flex h-18 sm:h-20 items-center justify-between px-4">
        <Link href="/" className="flex items-center space-x-2 sm:space-x-3 group">
          <div className="w-10 h-10 sm:w-11 sm:h-11 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-blue-500/20 group-hover:shadow-blue-500/40 transition-shadow">
            <span className="font-bold text-white text-lg">FC</span>
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-sm leading-tight tracking-tight text-white">
              FUTURE CONSUMER
            </span>
            <span className="font-bold text-sm leading-tight bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              EXPO 2026
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-1">
          {[
            { href: '#trien-lam', label: 'TRIỂN LÃM', active: true },
            { href: '#cong-nghe', label: 'CÔNG NGHỆ' },
            { href: '#lich-trinh', label: 'LỊCH TRÌNH' },
            { href: '#tin-tuc', label: 'TIN TỨC' },
            { href: '#ve-su-kien', label: 'VỀ SỰ KIỆN' },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm font-medium px-4 py-2 rounded-lg transition-all ${
                item.active 
                  ? 'text-blue-400 bg-blue-500/10' 
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden sm:flex items-center space-x-3">
          <button className="flex items-center space-x-1.5 text-sm font-medium text-slate-400 hover:text-white px-3 py-2 rounded-lg hover:bg-white/5 transition-all">
            <Globe className="w-4 h-4" />
            <span>VI</span>
          </button>
          <Link href="/login">
            <Button className="bg-blue-600 hover:bg-blue-500 text-white font-medium px-6 py-2.5 rounded-xl transition-all shadow-lg shadow-blue-600/20 hover:shadow-blue-500/30">
              ĐĂNG NHẬP
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-slate-400 hover:text-white transition-colors rounded-lg hover:bg-white/5"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-950/95 backdrop-blur-xl border-t border-white/5 absolute w-full shadow-2xl">
          <nav className="container mx-auto flex flex-col space-y-1 px-4 py-6">
            {[
              { href: '#trien-lam', label: 'TRIỂN LÃM', active: true },
              { href: '#cong-nghe', label: 'CÔNG NGHỆ' },
              { href: '#lich-trinh', label: 'LỊCH TRÌNH' },
              { href: '#tin-tuc', label: 'TIN TỨC' },
              { href: '#ve-su-kien', label: 'VỀ SỰ KIỆN' },
            ].map((item) => (
              <Link 
                key={item.href}
                href={item.href} 
                onClick={() => setMobileMenuOpen(false)}
                className={`text-base font-medium px-4 py-3 rounded-xl transition-all ${
                  item.active ? 'text-blue-400 bg-blue-500/10' : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-4 mt-2 flex items-center gap-3 border-t border-white/5">
              <button className="flex items-center space-x-1.5 text-sm font-medium text-slate-400 hover:text-white px-4 py-3 rounded-xl hover:bg-white/5 transition-all">
                <Globe className="w-4 h-4" />
                <span>VI</span>
              </button>
              <Link href="/login" className="flex-1">
                <Button className="w-full bg-blue-600 text-white rounded-xl py-3">
                  ĐĂNG NHẬP
                </Button>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

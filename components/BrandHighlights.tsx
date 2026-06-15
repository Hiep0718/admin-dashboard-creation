'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowRight, Bot, ChevronLeft, ChevronRight, Cpu, Sparkles, Smartphone } from 'lucide-react';

const technologies = [
  { icon: <Bot className="h-3.5 w-3.5" />, label: 'AI Recommendation' },
  { icon: <Smartphone className="h-3.5 w-3.5" />, label: 'Smart Dispenser' },
  { icon: <Sparkles className="h-3.5 w-3.5" />, label: 'Flavor Personalization' },
  { icon: <Cpu className="h-3.5 w-3.5" />, label: 'Real-time Analytics' },
];

export function BrandHighlights() {
  return (
    <section id="cong-nghe" className="expo-section-light relative overflow-hidden py-20 sm:py-24">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6">
        <h2 data-reveal className="mb-8 text-2xl font-black uppercase tracking-[-0.035em] text-slate-950 sm:text-4xl">
          Khám phá các gian hàng nổi bật
        </h2>

        <div data-reveal className="rounded-[1.5rem] border border-slate-200 bg-white p-2 shadow-[0_28px_90px_rgba(15,23,42,0.1)]">
          <div className="grid overflow-hidden rounded-[1.1rem] bg-white lg:grid-cols-[0.95fr_1.25fr]">
            <div className="relative min-h-[320px] overflow-hidden bg-slate-100">
              <Image
                src="/images/cocacola-booth.png"
                alt="Coca-Cola Experience Hub"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between">
                <div className="flex gap-1.5">
                  <div className="h-1.5 w-1.5 rounded-full bg-white/50" />
                  <div className="h-1.5 w-5 rounded-full bg-blue-500" />
                  <div className="h-1.5 w-1.5 rounded-full bg-white/50" />
                </div>
                <div className="flex gap-2">
                  {[ChevronLeft, ChevronRight].map((Icon, index) => (
                    <button
                      key={index}
                      className="grid h-9 w-9 place-items-center rounded-[0.75rem] bg-white/90 text-slate-900 shadow-[0_10px_28px_rgba(15,23,42,0.18)] transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-white active:scale-[0.95]"
                      aria-label={index === 0 ? 'Ảnh trước' : 'Ảnh tiếp theo'}
                    >
                      <Icon className="h-4 w-4" />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-12">
              <div className="flex items-start gap-4">
                <span className="font-mono text-4xl font-black leading-none text-red-600 tabular-nums">01</span>
                <div>
                  <h3 className="text-2xl font-black leading-tight text-slate-950">Coca-Cola Experience Hub</h3>
                  <span className="mt-3 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-[11px] font-bold text-emerald-700">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    Đang mở cửa
                  </span>
                </div>
              </div>

              <p className="mt-6 max-w-[62ch] text-sm font-medium leading-7 text-slate-600">
                Khám phá hệ sinh thái đồ uống thông minh với công nghệ AI cá nhân hóa, máy bán hàng tự động và phân tích hành vi người tiêu dùng.
              </p>

              <div className="mt-7">
                <h4 className="mb-3 text-[11px] font-black uppercase tracking-[0.16em] text-slate-400">Công nghệ nổi bật</h4>
                <div className="grid gap-2 sm:grid-cols-2">
                  {technologies.map((item) => (
                    <div
                      key={item.label}
                      className="motion-card flex items-center gap-2 rounded-[0.85rem] border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs font-bold text-slate-600 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-800"
                    >
                      <span className="text-blue-600">{item.icon}</span>
                      {item.label}
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Button className="group h-11 rounded-[0.85rem] bg-slate-950 px-5 text-xs font-black text-white transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-blue-700 active:scale-[0.98]">
                  Xem chi tiết gian hàng
                  <ArrowRight className="ml-2 h-3.5 w-3.5 transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-1" />
                </Button>
                <Button
                  variant="outline"
                  className="h-11 rounded-[0.85rem] border-slate-200 bg-white px-5 text-xs font-bold text-slate-700 transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-slate-50 hover:text-slate-950 active:scale-[0.98]"
                >
                  Trải nghiệm ngay
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

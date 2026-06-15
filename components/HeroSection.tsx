'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Bot, Play, TrendingUp, UserRound } from 'lucide-react';
import type { CSSProperties } from 'react';

const stats = [
  { Icon: UserRound, value: '143', label: 'Visitors Online' },
  { Icon: Bot, value: '8', label: 'Gian hàng' },
  { Icon: TrendingUp, value: '92%', label: 'Tương tác' },
];

export function HeroSection() {
  return (
    <section className="expo-hero-canvas relative isolate overflow-hidden px-4 pb-4 pt-24 sm:px-6 sm:pt-28 lg:pt-24">
      <div className="mx-auto grid min-h-[260px] max-w-[1400px] grid-cols-1 items-center gap-8 py-8 sm:py-10 lg:grid-cols-[minmax(0,1.12fr)_minmax(390px,0.88fr)] lg:py-12">
        <div data-reveal className="relative z-10">
          <h1 className="max-w-[760px] text-[clamp(2.4rem,5.2vw,4.8rem)] font-black uppercase leading-[0.96] tracking-[-0.045em] text-slate-950 text-balance">
            Future Consumer <span className="text-[#0876d9]">Expo 2026</span>
          </h1>
          <p className="mt-3 text-lg font-bold leading-tight text-[#185d91] sm:text-2xl">
            Where Technology Meets Consumer Experience
          </p>
          <p className="mt-4 max-w-[620px] text-sm font-medium leading-7 text-slate-600 sm:text-base">
            Khám phá không gian triển lãm ảo với các thương hiệu hàng đầu và công nghệ tương lai trong lĩnh vực tiêu dùng.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button className="group h-11 rounded-[0.35rem] bg-[#0876d9] px-4 text-xs font-black uppercase tracking-[0.03em] text-white shadow-[0_12px_24px_rgba(8,118,217,0.22)] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-[#075dab] active:scale-[0.98]">
              Bắt đầu tham quan
              <span className="ml-3 grid h-6 w-6 place-items-center rounded-full border border-white/35">
                <Play className="h-3 w-3 fill-current" />
              </span>
            </Button>
            <Button
              variant="outline"
              className="h-11 rounded-[0.35rem] border-[#9db7cd] bg-white/74 px-5 text-xs font-black uppercase tracking-[0.03em] text-[#164b73] shadow-[0_10px_22px_rgba(15,23,42,0.05)] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-white hover:text-[#0876d9] active:scale-[0.98]"
            >
              Hướng dẫn tham quan
            </Button>
          </div>
        </div>

        <div data-reveal style={{ '--reveal-delay': '120ms' } as CSSProperties} className="relative z-10">
          <div className="grid grid-cols-3 divide-x divide-slate-200/80 rounded-[0.55rem] bg-white/42 p-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.65)] backdrop-blur">
            {stats.map(({ Icon, value, label }) => (
              <div key={label} className="flex items-center justify-center gap-3 px-3 py-3">
                <Icon className="h-6 w-6 shrink-0 text-[#31546d]" strokeWidth={1.8} />
                <div>
                  <p className="font-mono text-2xl font-black leading-none text-slate-950 tabular-nums">{value}</p>
                  <p className="mt-1 text-[11px] font-semibold leading-tight text-slate-500">{label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-0 right-0 z-0 hidden h-[270px] w-[330px] translate-x-16 lg:block">
        <Image
          src="/images/robot-guide.png"
          alt="Robot hướng dẫn triển lãm"
          fill
          priority
          sizes="330px"
          className="object-contain object-right-bottom opacity-95 drop-shadow-[0_24px_34px_rgba(30,64,175,0.2)]"
        />
      </div>
      <div className="absolute inset-x-0 bottom-0 -z-10 h-20 bg-gradient-to-b from-transparent to-[#eef5ff]" />
    </section>
  );
}

'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowUpRight, BookOpen, Play, Radio, Route, Sparkles, Store, TrendingUp, Users } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const stats = [
  { Icon: Users, value: 143, label: 'Visitors online', tone: 'text-sky-200' },
  { Icon: Store, value: 8, label: 'Gian hàng mở', tone: 'text-cyan-200' },
  { Icon: TrendingUp, value: 92, label: 'Tương tác', suffix: '%', tone: 'text-emerald-200' },
];

function Counter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const ran = useRef(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || ran.current) return;

        ran.current = true;
        let start = 0;
        let frame = 0;

        const step = (timestamp: number) => {
          if (!start) start = timestamp;
          const progress = Math.min((timestamp - start) / 1600, 1);
          const eased = 1 - Math.pow(1 - progress, 4);
          setCount(Math.floor(eased * target));

          if (progress < 1) {
            frame = requestAnimationFrame(step);
          }
        };

        frame = requestAnimationFrame(step);

        return () => cancelAnimationFrame(frame);
      },
      { threshold: 0.5 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

export function HeroSection() {
  return (
    <section className="relative isolate min-h-[100dvh] overflow-hidden bg-[#05070d] pt-24 text-white">
      <Image
        src="/images/robot.jpg"
        alt="Robot NOVA-X1 tại khu triển lãm Future Consumer Expo 2026"
        fill
        priority
        sizes="100vw"
        className="absolute inset-0 -z-30 object-cover object-[68%_50%] opacity-80"
      />

      <div className="absolute inset-0 -z-20 bg-[linear-gradient(90deg,#05070d_0%,rgba(5,7,13,0.94)_31%,rgba(5,7,13,0.68)_54%,rgba(5,7,13,0.24)_100%)]" />
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_72%_38%,rgba(69,163,255,0.2),transparent_32%),linear-gradient(180deg,rgba(5,7,13,0)_65%,#070b14_100%)]" />
      <div className="hero-grid absolute inset-0 -z-10 opacity-[0.22]" />
      <div className="scanline absolute inset-x-0 top-0 -z-10 h-px bg-cyan-200/70" />

      <div className="mx-auto grid min-h-[calc(100dvh-6rem)] max-w-[1440px] grid-cols-1 items-end px-5 pb-8 pt-10 sm:px-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(360px,0.7fr)] lg:items-center lg:pb-10 lg:pt-0">
        <div className="max-w-4xl pb-8 lg:pb-24">
          <div className="hero-kicker mb-7 inline-flex items-center gap-2 rounded-full border border-cyan-200/15 bg-white/[0.055] px-3.5 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-cyan-100 shadow-[inset_0_1px_0_rgba(255,255,255,0.16)]">
            <Radio className="h-3.5 w-3.5 text-cyan-200" />
            Live virtual expo
          </div>

          <h1 className="hero-title max-w-[900px] text-[clamp(3.35rem,8vw,8.8rem)] font-black uppercase leading-[0.91] text-white">
            Future Consumer
            <span className="block text-transparent [-webkit-text-stroke:1.4px_rgba(196,231,255,0.9)] [text-shadow:0_0_34px_rgba(56,189,248,0.24)]">
              Expo 2026
            </span>
          </h1>

          <p className="hero-subtitle mt-7 max-w-[650px] text-xl font-semibold leading-snug text-sky-100 sm:text-2xl">
            Where Technology Meets Consumer Experience
          </p>

          <p className="hero-copy mt-5 max-w-[590px] text-base leading-8 text-white/64 sm:text-lg">
            Khám phá không gian triển lãm ảo với robot NOVA-X1, gian hàng tương tác và các trải nghiệm tiêu dùng thế hệ mới.
          </p>

          <div className="hero-actions mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button className="group h-14 rounded-full bg-cyan-300 px-2.5 pl-6 text-sm font-bold text-[#06111c] shadow-[0_18px_70px_rgba(34,211,238,0.24)] transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-white active:scale-[0.98]">
              <Play className="mr-2 h-4 w-4 fill-current" />
              Bắt đầu tham quan
              <span className="ml-4 grid h-9 w-9 place-items-center rounded-full bg-[#06111c] text-cyan-100 transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-1 group-hover:-translate-y-0.5">
                <ArrowUpRight className="h-4 w-4" />
              </span>
            </Button>

            <Button
              variant="outline"
              className="group h-14 rounded-full border-white/12 bg-white/[0.045] px-2.5 pl-6 text-sm font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:border-white/28 hover:bg-white/[0.08] hover:text-white active:scale-[0.98]"
            >
              <BookOpen className="mr-2 h-4 w-4" />
              Hướng dẫn tham quan
              <span className="ml-4 grid h-9 w-9 place-items-center rounded-full bg-white/[0.08] text-white transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-1">
                <ArrowUpRight className="h-4 w-4" />
              </span>
            </Button>
          </div>
        </div>

        <div className="pointer-events-none relative hidden min-h-[620px] lg:block">
          <div className="hud-card hud-card-primary absolute right-0 top-[16%] w-[270px] rounded-[2rem] border border-white/12 bg-[#07111d]/58 p-2 shadow-[0_28px_90px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.14)]">
            <div className="rounded-[calc(2rem-0.5rem)] bg-white/[0.045] p-5">
              <div className="flex items-center justify-between text-[10px] font-semibold uppercase tracking-[0.18em] text-cyan-100/70">
                NOVA-X1
                <span className="flex items-center gap-1.5 text-emerald-200">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-300 shadow-[0_0_14px_rgba(110,231,183,0.9)]" />
                  Active
                </span>
              </div>
              <div className="mt-5 grid grid-cols-[1fr_auto] items-end gap-4">
                <div>
                  <p className="text-3xl font-black leading-none text-white">92%</p>
                  <p className="mt-1 text-xs text-white/42">pin hướng dẫn</p>
                </div>
                <Sparkles className="mb-1 h-8 w-8 text-cyan-200" />
              </div>
              <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-white/10">
                <div className="status-meter h-full w-[92%] rounded-full bg-cyan-200" />
              </div>
            </div>
          </div>

          <div className="hud-card hud-card-secondary absolute bottom-[17%] right-[42%] w-[240px] rounded-[1.7rem] border border-white/10 bg-[#06101a]/62 p-2 shadow-[0_26px_80px_rgba(0,0,0,0.36),inset_0_1px_0_rgba(255,255,255,0.12)]">
            <div className="rounded-[calc(1.7rem-0.5rem)] bg-white/[0.045] p-5">
              <div className="flex items-center gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-full bg-cyan-200/12 text-cyan-100">
                  <Route className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">Smart route</p>
                  <p className="text-xs text-white/42">3 điểm dừng đang mở</p>
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2">
                {[0, 1, 2, 3].map((dot) => (
                  <span
                    key={dot}
                    className={`h-2 rounded-full ${dot === 1 ? 'w-10 bg-cyan-200' : 'w-2 bg-white/18'}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-[1440px] px-5 pb-10 sm:px-8 lg:-mt-24 lg:pb-12">
        <div className="hero-stats grid gap-3 rounded-[2rem] border border-white/10 bg-[#07111d]/66 p-2 shadow-[0_30px_100px_rgba(0,0,0,0.42),inset_0_1px_0_rgba(255,255,255,0.12)] sm:grid-cols-3 lg:max-w-3xl">
          {stats.map(({ Icon, value, label, suffix, tone }) => (
            <div key={label} className="group flex items-center gap-4 rounded-[1.55rem] bg-white/[0.045] px-5 py-4 transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-white/[0.075]">
              <div className="grid h-12 w-12 place-items-center rounded-full bg-white/[0.07] text-cyan-100 shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-105">
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <div className={`text-3xl font-black leading-none tabular-nums ${tone}`}>
                  <Counter target={value} suffix={suffix} />
                </div>
                <div className="mt-1 text-xs font-medium text-white/42">{label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

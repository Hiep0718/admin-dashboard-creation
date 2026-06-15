'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Users, Store, TrendingUp, Play, BookOpen, Sparkles } from 'lucide-react';
import { useEffect, useState, useRef } from 'react';

function AnimatedCounter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          let start = 0;
          const duration = 2000;
          const step = (timestamp: number) => {
            if (!start) start = timestamp;
            const progress = Math.min((timestamp - start) / duration, 1);
            setCount(Math.floor(progress * target));
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

function Particles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 20 }).map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-blue-400/30 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${100 + Math.random() * 20}%`,
            animation: `particle-drift ${8 + Math.random() * 12}s linear ${Math.random() * 8}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

export function HeroSection() {
  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900">
      {/* Decorative elements */}
      <Particles />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[100px]" />
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
        backgroundSize: '60px 60px'
      }} />

      <div className="container mx-auto px-4 relative z-10 py-16">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
          {/* Left content */}
          <div className="w-full lg:w-3/5 space-y-8 fade-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-sm font-medium">
              <Sparkles className="w-4 h-4" />
              <span>Sự kiện triển lãm ảo hàng đầu Việt Nam</span>
            </div>
            
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-[1.1] tracking-tight">
              <span className="text-white">FUTURE</span>
              <br />
              <span className="text-white">CONSUMER </span>
              <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent gradient-animate">
                EXPO 2026
              </span>
            </h1>
            
            <p className="text-lg sm:text-xl text-blue-100/70 max-w-xl leading-relaxed">
              Khám phá không gian triển lãm ảo với các thương hiệu hàng đầu 
              và công nghệ tương lai trong lĩnh vực tiêu dùng.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Button className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-7 rounded-xl text-base font-semibold transition-all shadow-lg shadow-blue-600/30 hover:shadow-blue-500/50 group">
                <Play className="mr-2 w-5 h-5 group-hover:scale-110 transition-transform" /> BẮT ĐẦU THAM QUAN
              </Button>
              <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 px-8 py-7 rounded-xl text-base font-semibold backdrop-blur-sm">
                <BookOpen className="mr-2 w-5 h-5" /> HƯỚNG DẪN
              </Button>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap items-center gap-8 sm:gap-12 pt-8 border-t border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-blue-500/15 flex items-center justify-center">
                  <Users className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <div className="text-3xl font-bold text-white"><AnimatedCounter target={143} /></div>
                  <div className="text-sm text-blue-200/60">Visitors Online</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-cyan-500/15 flex items-center justify-center">
                  <Store className="w-6 h-6 text-cyan-400" />
                </div>
                <div>
                  <div className="text-3xl font-bold text-white"><AnimatedCounter target={8} /></div>
                  <div className="text-sm text-blue-200/60">Gian hàng</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/15 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-emerald-400" />
                </div>
                <div>
                  <div className="text-3xl font-bold text-white"><AnimatedCounter target={92} suffix="%" /></div>
                  <div className="text-sm text-blue-200/60">Tương tác</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right robot */}
          <div className="w-full lg:w-2/5 flex justify-center lg:justify-end">
            <div className="relative">
              {/* Glow ring */}
              <div className="absolute inset-0 w-72 h-72 sm:w-80 sm:h-80 mx-auto rounded-full bg-gradient-to-r from-blue-500/20 via-cyan-500/20 to-blue-500/20 blur-2xl" />
              
              <div className="relative w-72 h-72 sm:w-80 sm:h-80 floating-animation">
                <Image
                  src="/images/robot-guide.png"
                  alt="Robot Guide"
                  fill
                  className="object-contain drop-shadow-[0_0_40px_rgba(59,130,246,0.3)]"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-50 to-transparent" />
    </section>
  );
}

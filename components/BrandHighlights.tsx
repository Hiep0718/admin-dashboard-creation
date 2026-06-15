'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowRight, Bot, Cpu, Sparkles, Smartphone, ChevronLeft, ChevronRight } from 'lucide-react';

export function BrandHighlights() {
  return (
    <section id="cong-nghe" className="py-20 bg-white relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100/50 rounded-full blur-[120px]" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex items-center gap-4 mb-10">
          <div className="w-1.5 h-10 bg-gradient-to-b from-blue-500 to-cyan-500 rounded-full" />
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
            KHÁM PHÁ CÁC GIAN HÀNG NỔI BẬT
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row gap-0 items-stretch bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-xl premium-card">
          {/* Left Image */}
          <div className="w-full lg:w-1/2 h-72 sm:h-80 lg:h-auto relative min-h-[400px]">
            <Image
              src="/images/cocacola-booth.png"
              alt="Coca-Cola Experience Hub"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            
            {/* Image navigation */}
            <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
              <div className="flex gap-2">
                <div className="w-2 h-2 rounded-full bg-white/40" />
                <div className="w-8 h-2 rounded-full bg-blue-500" />
                <div className="w-2 h-2 rounded-full bg-white/40" />
              </div>
              <div className="flex gap-2">
                <button className="w-9 h-9 bg-white/10 hover:bg-white/20 text-white rounded-full flex items-center justify-center backdrop-blur-md transition-all border border-white/10">
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button className="w-9 h-9 bg-white/10 hover:bg-white/20 text-white rounded-full flex items-center justify-center backdrop-blur-md transition-all border border-white/10">
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Content */}
          <div className="w-full lg:w-1/2 p-8 sm:p-12 space-y-6 flex flex-col justify-center">
            <div className="flex items-center gap-4">
              <span className="text-5xl font-black bg-gradient-to-br from-red-500 to-red-700 bg-clip-text text-transparent">01</span>
              <div>
                <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 leading-tight">Coca-Cola Experience Hub</h3>
                <span className="inline-flex items-center gap-1.5 text-green-600 bg-green-50 px-3 py-1 rounded-full text-xs font-semibold mt-2 border border-green-100">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" /> Đang tổ chức sự kiện
                </span>
              </div>
            </div>
            
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
              Khám phá hệ sinh thái đồ uống thông minh với công nghệ AI cá nhân hóa, 
              máy bán hàng tự động và phân tích hành vi người tiêu dùng.
            </p>

            <div>
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">CÔNG NGHỆ NỔI BẬT</h4>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: <Bot className="w-4 h-4" />, label: 'AI Recommendation' },
                  { icon: <Smartphone className="w-4 h-4" />, label: 'Smart Dispenser' },
                  { icon: <Sparkles className="w-4 h-4" />, label: 'Flavor Personalization' },
                  { icon: <Cpu className="w-4 h-4" />, label: 'Real-time Analytics' },
                ].map((tech, i) => (
                  <div key={i} className="flex items-center gap-2.5 text-sm font-medium text-slate-700 bg-slate-50 hover:bg-blue-50 px-4 py-3 rounded-xl border border-slate-100 hover:border-blue-200 transition-colors cursor-pointer group">
                    <span className="text-blue-500 group-hover:text-blue-600 transition-colors">{tech.icon}</span>
                    {tech.label}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Button className="bg-slate-900 hover:bg-slate-800 text-white px-7 py-6 rounded-xl text-sm font-semibold transition-all shadow-lg hover:shadow-xl group">
                Xem chi tiết <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" className="border-blue-200 text-blue-600 hover:bg-blue-50 px-7 py-6 rounded-xl text-sm font-semibold transition-all">
                Trải nghiệm ngay
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

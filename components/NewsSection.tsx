'use client';

import Image from 'next/image';
import { ArrowRight, Calendar } from 'lucide-react';

const news = [
  {
    image: '/images/exhibition-hall.png',
    date: '10/06/2026',
    category: 'Tin tức',
    title: 'Future Consumer Expo 2026 thu hút hơn 50.000 lượt đăng ký tham quan',
    excerpt: 'Sự kiện triển lãm ảo đầu tiên về ngành hàng tiêu dùng tại Việt Nam đã vượt mốc 50.000 lượt đăng ký.',
  },
  {
    image: '/images/cocacola-booth.png',
    date: '08/06/2026',
    category: 'Công nghệ',
    title: 'Robot dẫn đường AI: Bước đột phá trong trải nghiệm triển lãm ảo',
    excerpt: 'Hệ thống robot NOVA-X1 tích hợp AI đang cách mạng hóa cách khách tham quan tương tác.',
  },
  {
    image: '/images/robot-guide.png',
    date: '05/06/2026',
    category: 'Đối tác',
    title: 'Coca-Cola và Pepsi đồng loạt ra mắt gian hàng công nghệ mới',
    excerpt: 'Hai ông lớn ngành giải khát giới thiệu gian hàng trải nghiệm công nghệ AI cá nhân hóa.',
  },
];

export function NewsSection() {
  return (
    <section id="tin-tuc" className="py-24 bg-[#0c1220] relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-60 h-60 bg-cyan-500/[0.03] rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            TIN TỨC VÀ CẬP NHẬT
          </h2>
          <button className="hidden sm:flex items-center gap-1.5 text-blue-400 text-xs font-medium hover:text-blue-300 transition-colors duration-300">
            Xem tất cả <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {news.map((item, i) => (
            <article key={i} className="group p-[1px] rounded-2xl bg-gradient-to-b from-white/[0.06] to-transparent hover:from-white/[0.1] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]">
              <div className="bg-[#111827] rounded-[calc(1rem-1px)] overflow-hidden shadow-[inset_0_1px_1px_rgba(255,255,255,0.04)] h-full flex flex-col cursor-pointer">
                <div className="relative h-44 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="bg-blue-600 text-white text-[10px] font-medium px-2.5 py-1 rounded-md">
                      {item.category}
                    </span>
                  </div>
                </div>
                <div className="p-5 space-y-2.5 flex-1 flex flex-col">
                  <div className="flex items-center gap-1.5 text-white/20 text-[11px]">
                    <Calendar className="w-3 h-3" />
                    <span>{item.date}</span>
                  </div>
                  <h3 className="text-sm font-semibold text-white/80 leading-snug group-hover:text-white transition-colors duration-300 line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="text-white/25 text-xs leading-relaxed line-clamp-2 flex-1">
                    {item.excerpt}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

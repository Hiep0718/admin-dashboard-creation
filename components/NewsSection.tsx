'use client';

import Image from 'next/image';
import { ArrowRight, Calendar } from 'lucide-react';

const newsItems = [
  {
    image: '/images/exhibition-hall.png',
    date: '10/06/2026',
    category: 'Tin tức',
    title: 'Future Consumer Expo 2026 thu hút hơn 50.000 lượt đăng ký tham quan',
    excerpt: 'Sự kiện triển lãm ảo đầu tiên về ngành hàng tiêu dùng tại Việt Nam đã vượt mốc 50.000 lượt đăng ký chỉ sau 2 tuần ra mắt.',
  },
  {
    image: '/images/cocacola-booth.png',
    date: '08/06/2026',
    category: 'Công nghệ',
    title: 'Robot dẫn đường AI: Bước đột phá trong trải nghiệm triển lãm ảo',
    excerpt: 'Hệ thống robot NOVA-X1 tích hợp AI đang cách mạng hóa cách khách tham quan tương tác với triển lãm trực tuyến.',
  },
  {
    image: '/images/robot-guide.png',
    date: '05/06/2026',
    category: 'Đối tác',
    title: 'Coca-Cola và Pepsi đồng loạt ra mắt gian hàng công nghệ mới',
    excerpt: 'Hai ông lớn ngành giải khát chính thức giới thiệu gian hàng trải nghiệm với công nghệ AI cá nhân hóa tại sự kiện.',
  },
];

export function NewsSection() {
  return (
    <section id="tin-tuc" className="py-20 bg-slate-50 relative overflow-hidden">
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-100/30 rounded-full blur-[120px]" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-4">
            <div className="w-1.5 h-10 bg-gradient-to-b from-cyan-500 to-blue-500 rounded-full" />
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
              TIN TỨC & CẬP NHẬT
            </h2>
          </div>
          <button className="hidden sm:flex items-center gap-2 text-blue-600 font-semibold text-sm hover:text-blue-700 transition-colors">
            Xem tất cả <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsItems.map((item, idx) => (
            <article
              key={idx}
              className="group bg-white rounded-3xl overflow-hidden border border-slate-100 hover:border-blue-200 transition-all duration-400 premium-card cursor-pointer"
            >
              <div className="relative h-52 overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-blue-600 text-white text-[11px] font-semibold px-3 py-1 rounded-full">
                    {item.category}
                  </span>
                </div>
              </div>
              
              <div className="p-6 space-y-3">
                <div className="flex items-center gap-2 text-slate-400 text-sm">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{item.date}</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 leading-snug group-hover:text-blue-700 transition-colors line-clamp-2">
                  {item.title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed line-clamp-2">
                  {item.excerpt}
                </p>
                <button className="text-blue-500 text-sm font-semibold flex items-center gap-1 pt-2 group-hover:gap-2 transition-all">
                  Đọc thêm <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

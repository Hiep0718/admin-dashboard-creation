'use client';

import { Lightbulb, Handshake, Users, PlaySquare } from 'lucide-react';

const benefits = [
  {
    icon: <Lightbulb className="w-5 h-5" />,
    title: 'Công nghệ tiên tiến',
    desc: 'Trải nghiệm các công nghệ mới nhất trong ngành hàng tiêu dùng.',
    accent: 'text-blue-400',
    bg: 'bg-blue-500/10 ring-blue-500/20',
  },
  {
    icon: <Handshake className="w-5 h-5" />,
    title: 'Tương tác trực tiếp',
    desc: 'Tham gia các demo interactive và hoạt động hướng dẫn từ AI.',
    accent: 'text-purple-400',
    bg: 'bg-purple-500/10 ring-purple-500/20',
  },
  {
    icon: <Users className="w-5 h-5" />,
    title: 'Kết nối doanh nghiệp',
    desc: 'Gặp gỡ và kết nối với các chuyên gia và thương hiệu hàng đầu.',
    accent: 'text-emerald-400',
    bg: 'bg-emerald-500/10 ring-emerald-500/20',
  },
  {
    icon: <PlaySquare className="w-5 h-5" />,
    title: 'Trải nghiệm sống động',
    desc: 'Tham quan không gian ảo chân thực với hướng dẫn tự động.',
    accent: 'text-amber-400',
    bg: 'bg-amber-500/10 ring-amber-500/20',
  },
];

export function WhyAttend() {
  return (
    <section id="ve-su-kien" className="py-24 bg-[#0c1220] relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-16 bg-gradient-to-b from-white/[0.06] to-transparent" />

      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight text-center mb-4">
          VÌ SAO NÊN THAM GIA?
        </h2>
        <p className="text-white/30 text-sm text-center mb-14 max-w-md mx-auto">
          Những lý do khiến hàng nghìn người đã tin tưởng và tham gia triển lãm
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {benefits.map((b, i) => (
            <div key={i} className="group p-[1px] rounded-2xl bg-gradient-to-b from-white/[0.06] to-transparent">
              <div className="bg-[#111827] rounded-[calc(1rem-1px)] p-7 text-center space-y-4 h-full shadow-[inset_0_1px_1px_rgba(255,255,255,0.04)] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:bg-[#151d2e]">
                <div className={`w-12 h-12 rounded-xl ${b.bg} ring-1 flex items-center justify-center mx-auto transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]`}>
                  <span className={`${b.accent} transition-colors duration-500`}>{b.icon}</span>
                </div>
                <h3 className="text-sm font-semibold text-white/80">{b.title}</h3>
                <p className="text-white/30 text-xs leading-relaxed">{b.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

'use client';

import { Lightbulb, Handshake, Users, PlaySquare, ArrowRight } from 'lucide-react';

const benefits = [
  {
    icon: <Lightbulb className="w-7 h-7" />,
    title: 'Công nghệ tiên tiến',
    desc: 'Trải nghiệm các công nghệ mới nhất trong ngành hàng tiêu dùng.',
    color: 'from-blue-500 to-cyan-500',
    bg: 'bg-blue-50 group-hover:bg-blue-500',
    textColor: 'text-blue-500 group-hover:text-white',
  },
  {
    icon: <Handshake className="w-7 h-7" />,
    title: 'Tương tác trực tiếp',
    desc: 'Tham gia các demo interactive và hoạt động hướng dẫn từ AI.',
    color: 'from-purple-500 to-pink-500',
    bg: 'bg-purple-50 group-hover:bg-purple-500',
    textColor: 'text-purple-500 group-hover:text-white',
  },
  {
    icon: <Users className="w-7 h-7" />,
    title: 'Kết nối doanh nghiệp',
    desc: 'Gặp gỡ và kết nối với các chuyên gia và thương hiệu hàng đầu.',
    color: 'from-emerald-500 to-teal-500',
    bg: 'bg-emerald-50 group-hover:bg-emerald-500',
    textColor: 'text-emerald-500 group-hover:text-white',
  },
  {
    icon: <PlaySquare className="w-7 h-7" />,
    title: 'Trải nghiệm sống động',
    desc: 'Tham quan không gian ảo chân thực với hướng dẫn tự động.',
    color: 'from-orange-500 to-red-500',
    bg: 'bg-orange-50 group-hover:bg-orange-500',
    textColor: 'text-orange-500 group-hover:text-white',
  },
];

export function WhyAttend() {
  return (
    <section id="ve-su-kien" className="py-20 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-100/30 rounded-full blur-[120px]" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-600 text-sm font-semibold mb-4 border border-blue-100">
            <Lightbulb className="w-4 h-4" /> Lý do tham gia
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight">
            VÌ SAO NÊN THAM GIA?
          </h2>
          <p className="text-slate-500 mt-4 max-w-2xl mx-auto text-lg">
            Khám phá những lý do khiến hàng nghìn người đã tin tưởng và tham gia triển lãm
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, idx) => (
            <div 
              key={idx} 
              className="group flex flex-col items-center text-center p-8 space-y-5 rounded-3xl border border-slate-100 bg-white hover:bg-slate-900 transition-all duration-500 cursor-pointer premium-card hover:border-transparent"
            >
              <div className={`w-16 h-16 rounded-2xl ${benefit.bg} flex items-center justify-center transition-all duration-500`}>
                <span className={`${benefit.textColor} transition-colors duration-500`}>{benefit.icon}</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-white transition-colors duration-500">{benefit.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed group-hover:text-slate-400 transition-colors duration-500">{benefit.desc}</p>
              <button className="text-blue-500 group-hover:text-blue-400 text-sm font-semibold flex items-center gap-1 transition-all opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0">
                Tìm hiểu thêm <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

'use client';

import { Handshake, Lightbulb, PlaySquare, Users } from 'lucide-react';

const benefits = [
  {
    Icon: Lightbulb,
    title: 'Công nghệ tiên tiến',
    desc: 'Trải nghiệm các công nghệ mới nhất trong ngành hàng tiêu dùng.',
    accent: 'text-blue-700',
    bg: 'bg-blue-50',
  },
  {
    Icon: Handshake,
    title: 'Tương tác trực tiếp',
    desc: 'Tham gia demo interactive và hoạt động hướng dẫn từ AI.',
    accent: 'text-violet-700',
    bg: 'bg-violet-50',
  },
  {
    Icon: Users,
    title: 'Kết nối doanh nghiệp',
    desc: 'Gặp gỡ và kết nối với các chuyên gia và thương hiệu hàng đầu.',
    accent: 'text-emerald-700',
    bg: 'bg-emerald-50',
  },
  {
    Icon: PlaySquare,
    title: 'Trải nghiệm sống động',
    desc: 'Tham quan không gian ảo chân thực với hướng dẫn tự động.',
    accent: 'text-amber-700',
    bg: 'bg-amber-50',
  },
];

export function WhyAttend() {
  return (
    <section id="ve-su-kien" className="expo-section-light relative overflow-hidden py-20 sm:py-24">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6">
        <div data-reveal className="mx-auto mb-10 max-w-2xl text-center">
          <h2 className="text-2xl font-black uppercase tracking-[-0.035em] text-slate-950 sm:text-4xl">
            Vì sao nên tham gia?
          </h2>
          <p className="mt-4 text-sm font-medium leading-6 text-slate-500">
            Những lợi ích khiến hàng nghìn người đã tin tưởng và tham gia triển lãm.
          </p>
        </div>

        <div data-reveal className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map(({ Icon, title, desc, accent, bg }) => (
            <article key={title} className="motion-card rounded-[1.2rem] border border-slate-200 bg-white p-6 text-center shadow-[0_18px_55px_rgba(15,23,42,0.07)] hover:border-blue-200">
              <div className={`mx-auto grid h-14 w-14 place-items-center rounded-[1rem] ${bg} ${accent}`}>
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="mt-5 text-base font-black text-slate-950">{title}</h3>
              <p className="mt-3 text-sm font-medium leading-6 text-slate-500">{desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

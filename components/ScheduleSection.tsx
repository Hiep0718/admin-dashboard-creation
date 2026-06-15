'use client';

import { Clock, MapPin, Users as UsersIcon } from 'lucide-react';

const schedule = [
  { time: '09:00 - 10:30', title: 'Khai mạc và giới thiệu triển lãm', speaker: 'Ban tổ chức', location: 'Sảnh chính', tag: 'Khai mạc', tagClass: 'bg-blue-50 text-blue-700 border-blue-100' },
  { time: '10:30 - 12:00', title: 'AI trong ngành tiêu dùng: xu hướng 2026', speaker: 'Dr. Nguyễn Minh Trí', location: 'Hội trường A', tag: 'Hội thảo', tagClass: 'bg-violet-50 text-violet-700 border-violet-100' },
  { time: '13:30 - 15:00', title: 'Demo robot dẫn đường thông minh', speaker: 'Đội ngũ kỹ thuật', location: 'Khu triển lãm', tag: 'Demo', tagClass: 'bg-emerald-50 text-emerald-700 border-emerald-100' },
  { time: '15:00 - 16:30', title: 'Workshop: trải nghiệm Coca-Cola AI Hub', speaker: 'Coca-Cola Vietnam', location: 'Gian hàng 01', tag: 'Workshop', tagClass: 'bg-red-50 text-red-700 border-red-100' },
  { time: '16:30 - 18:00', title: 'Tương lai bán lẻ thông minh', speaker: 'Đại diện thương hiệu', location: 'Hội trường B', tag: 'Panel', tagClass: 'bg-amber-50 text-amber-700 border-amber-100' },
];

export function ScheduleSection() {
  return (
    <section id="lich-trinh" className="expo-section-light relative overflow-hidden py-20 sm:py-24">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6">
        <div data-reveal className="mb-8">
          <h2 className="text-2xl font-black uppercase tracking-[-0.035em] text-slate-950 sm:text-4xl">
            Lịch trình sự kiện
          </h2>
          <p className="mt-3 text-sm font-medium text-slate-500">Chương trình ngày 15 tháng 6, 2026</p>
        </div>

        <div data-reveal className="grid gap-3">
          {schedule.map((item) => (
            <article key={`${item.time}-${item.title}`} className="motion-card rounded-[1rem] border border-slate-200 bg-white p-2 shadow-[0_16px_45px_rgba(15,23,42,0.06)] hover:border-blue-200">
              <div className="grid gap-4 rounded-[0.8rem] bg-slate-50 px-4 py-4 sm:grid-cols-[170px_minmax(0,1fr)] sm:items-center">
                <div className="flex items-center gap-2.5">
                  <div className="grid h-9 w-9 place-items-center rounded-full bg-white text-blue-700 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]">
                    <Clock className="h-4 w-4" />
                  </div>
                  <span className="font-mono text-xs font-black text-slate-700 tabular-nums">{item.time}</span>
                </div>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <h3 className="text-sm font-black leading-snug text-slate-950">{item.title}</h3>
                    <span className={`rounded-full border px-2.5 py-1 text-[10px] font-black ${item.tagClass}`}>{item.tag}</span>
                  </div>
                  <div className="mt-2 flex flex-wrap items-center gap-4 text-[12px] font-medium text-slate-500">
                    <span className="flex items-center gap-1.5">
                      <UsersIcon className="h-3.5 w-3.5" />
                      {item.speaker}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5" />
                      {item.location}
                    </span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

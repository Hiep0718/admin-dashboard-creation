'use client';

import { Clock, MapPin, Users as UsersIcon } from 'lucide-react';

const schedule = [
  { time: '09:00 - 10:30', title: 'Khai mạc và Giới thiệu Triển lãm', speaker: 'Ban tổ chức', location: 'Sảnh chính', tag: 'Khai mạc', tagColor: 'text-blue-400 bg-blue-500/10 ring-blue-500/20' },
  { time: '10:30 - 12:00', title: 'AI trong Ngành Tiêu dùng: Xu hướng 2026', speaker: 'Dr. Nguyễn Minh Trí', location: 'Hội trường A', tag: 'Hội thảo', tagColor: 'text-purple-400 bg-purple-500/10 ring-purple-500/20' },
  { time: '13:30 - 15:00', title: 'Demo Robot Dẫn Đường Thông Minh', speaker: 'Đội ngũ kỹ thuật', location: 'Khu triển lãm', tag: 'Demo', tagColor: 'text-emerald-400 bg-emerald-500/10 ring-emerald-500/20' },
  { time: '15:00 - 16:30', title: 'Workshop: Trải nghiệm Coca-Cola AI Hub', speaker: 'Coca-Cola Vietnam', location: 'Gian hàng 01', tag: 'Workshop', tagColor: 'text-red-400 bg-red-500/10 ring-red-500/20' },
  { time: '16:30 - 18:00', title: 'Tương lai Bán lẻ Thông minh', speaker: 'Đa diễn giả', location: 'Hội trường B', tag: 'Panel', tagColor: 'text-amber-400 bg-amber-500/10 ring-amber-500/20' },
];

export function ScheduleSection() {
  return (
    <section id="lich-trinh" className="expo-band py-24 sm:py-32 relative overflow-hidden">
      <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-cyan-200/16 to-transparent" />

      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        <h2 data-reveal className="text-2xl sm:text-4xl font-black text-white tracking-tight mb-3">
          LỊCH TRÌNH SỰ KIỆN
        </h2>
        <p data-reveal className="text-white/38 text-sm mb-10">Chương trình ngày 15 tháng 6, 2026</p>

        <div data-reveal className="space-y-3">
          {schedule.map((item, i) => (
            <div key={i} className="motion-card group p-[1px] rounded-xl bg-gradient-to-r from-white/[0.06] to-transparent hover:from-cyan-300/18">
              <div className="bg-[#0b1422] rounded-[calc(0.75rem-1px)] flex flex-col sm:flex-row items-stretch shadow-[inset_0_1px_1px_rgba(255,255,255,0.04)] overflow-hidden">
                {/* Time */}
                <div className="sm:w-44 flex-shrink-0 bg-white/[0.02] px-5 py-4 flex items-center gap-2.5 border-b sm:border-b-0 sm:border-r border-white/[0.04]">
                  <Clock className="w-3.5 h-3.5 text-blue-400/60 flex-shrink-0" />
                  <span className="font-mono text-xs font-medium text-white/60">{item.time}</span>
                </div>
                {/* Content */}
                <div className="flex-1 px-5 py-4 flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-5">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2.5 mb-1">
                      <h3 className="text-sm font-semibold text-white/80 group-hover:text-white transition-colors duration-300">{item.title}</h3>
                      <span className={`text-[10px] font-medium px-2 py-0.5 rounded-md ring-1 ${item.tagColor}`}>{item.tag}</span>
                    </div>
                    <div className="flex flex-wrap items-center gap-3 text-[11px] text-white/25">
                      <span className="flex items-center gap-1"><UsersIcon className="w-3 h-3" /> {item.speaker}</span>
                      <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {item.location}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

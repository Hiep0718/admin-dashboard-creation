'use client';

import { Calendar, Clock, MapPin, Users as UsersIcon } from 'lucide-react';

const scheduleData = [
  {
    time: '09:00 - 10:30',
    title: 'Khai mạc & Giới thiệu Triển lãm',
    speaker: 'Ban tổ chức',
    location: 'Sảnh chính',
    tag: 'Khai mạc',
    tagColor: 'bg-blue-100 text-blue-700',
  },
  {
    time: '10:30 - 12:00',
    title: 'AI trong Ngành Tiêu dùng: Xu hướng 2026',
    speaker: 'Dr. Nguyễn Minh Trí',
    location: 'Hội trường A',
    tag: 'Hội thảo',
    tagColor: 'bg-purple-100 text-purple-700',
  },
  {
    time: '13:30 - 15:00',
    title: 'Demo Robot Dẫn Đường Thông Minh',
    speaker: 'Đội ngũ kỹ thuật',
    location: 'Khu triển lãm',
    tag: 'Demo',
    tagColor: 'bg-emerald-100 text-emerald-700',
  },
  {
    time: '15:00 - 16:30',
    title: 'Workshop: Trải nghiệm Coca-Cola AI Hub',
    speaker: 'Coca-Cola Vietnam',
    location: 'Gian hàng 01',
    tag: 'Workshop',
    tagColor: 'bg-red-100 text-red-700',
  },
  {
    time: '16:30 - 18:00',
    title: 'Panel Discussion: Tương lai Bán lẻ Thông minh',
    speaker: 'Đa diễn giả',
    location: 'Hội trường B',
    tag: 'Panel',
    tagColor: 'bg-amber-100 text-amber-700',
  },
];

export function ScheduleSection() {
  return (
    <section id="lich-trinh" className="py-20 bg-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 bg-purple-100/30 rounded-full blur-[120px]" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-1.5 h-10 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full" />
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
            LỊCH TRÌNH SỰ KIỆN
          </h2>
        </div>
        <p className="text-slate-500 text-lg mb-12 ml-6">Chương trình ngày 15 tháng 6, 2026</p>

        <div className="space-y-4">
          {scheduleData.map((item, idx) => (
            <div
              key={idx}
              className="group flex flex-col sm:flex-row items-stretch bg-white border border-slate-100 rounded-2xl overflow-hidden hover:shadow-xl hover:border-blue-200 transition-all duration-400 premium-card"
            >
              {/* Time */}
              <div className="sm:w-48 flex-shrink-0 bg-slate-50 group-hover:bg-blue-50 px-6 py-5 flex items-center gap-3 transition-colors">
                <Clock className="w-5 h-5 text-blue-500 flex-shrink-0" />
                <span className="font-mono font-bold text-slate-800 text-sm">{item.time}</span>
              </div>
              
              {/* Content */}
              <div className="flex-1 px-6 py-5 flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-6">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 mb-1.5">
                    <h3 className="font-bold text-slate-900 text-base group-hover:text-blue-700 transition-colors">{item.title}</h3>
                    <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${item.tagColor}`}>
                      {item.tag}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500">
                    <span className="flex items-center gap-1.5">
                      <UsersIcon className="w-3.5 h-3.5" /> {item.speaker}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5" /> {item.location}
                    </span>
                  </div>
                </div>
                
                <button className="text-blue-500 hover:text-blue-700 text-sm font-semibold flex items-center gap-1 transition-colors whitespace-nowrap">
                  Chi tiết →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

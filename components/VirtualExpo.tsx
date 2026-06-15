'use client';

import { Button } from '@/components/ui/button';
import { ArrowRight, MapPin, Activity, User, Eye } from 'lucide-react';
import type { CSSProperties } from 'react';

const booths = [
  { id: '01', name: 'Coca-Cola Experience Hub', brand: 'Coca-Cola', desc: 'Trải nghiệm cá nhân hóa đồ uống bằng AI.', gradient: 'from-red-700 to-red-900', logo: 'https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=http://coca-cola.com&size=128', viewers: 42 },
  { id: '02', name: 'Pepsi Interactive Lab', brand: 'PEPSI', desc: 'Tương tác thông minh, kết nối khách hàng.', gradient: 'from-blue-700 to-blue-900', logo: 'https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=http://pepsi.com&size=128', viewers: 38 },
  { id: '03', name: 'Heineken Future Brewing', brand: 'Heineken', desc: 'Công nghệ ủ bia thông minh thế hệ mới.', gradient: 'from-green-700 to-green-900', logo: 'https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=http://heineken.com&size=128', viewers: 31 },
  { id: '04', name: 'Tiger Smart Distribution', brand: 'Tiger', desc: 'Logistics thông minh, tối ưu chuỗi cung ứng.', gradient: 'from-amber-700 to-amber-900', logo: 'https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=http://tigerbeer.com&size=128', viewers: 27 },
  { id: '05', name: 'Sabeco Industry Pavilion', brand: 'SABECO', desc: 'Đổi mới ngành đồ uống Việt Nam.', gradient: 'from-yellow-600 to-yellow-800', logo: 'https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=http://sabeco.com.vn&size=128', viewers: 22 },
  { id: '06', name: 'Abbott Healthcare Innovation', brand: 'Abbott', desc: 'Giải pháp chăm sóc sức khỏe tiên tiến.', gradient: 'from-sky-600 to-sky-800', logo: 'https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=http://abbott.com&size=128', viewers: 19 },
  { id: '07', name: 'Nutifood Nutrition Tech Lab', brand: 'Nutifood', desc: 'Dinh dưỡng cá nhân hóa dựa trên dữ liệu.', gradient: 'from-emerald-600 to-emerald-800', logo: 'https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=http://nutifood.com.vn&size=128', viewers: 15 },
  { id: '08', name: 'Vinamilk DairyTech Future Zone', brand: 'Vinamilk', desc: 'Công nghệ sữa thông minh thế hệ mới.', gradient: 'from-blue-600 to-indigo-800', logo: 'https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=http://vinamilk.com.vn&size=128', viewers: 18 },
];

function BoothCard({ booth }: { booth: typeof booths[0] }) {
  return (
    <div className={`motion-card group cursor-pointer relative overflow-hidden rounded-2xl hover:shadow-[0_24px_60px_-18px_rgba(34,211,238,0.35)]`}>
      {/* Outer shell */}
      <div className="p-[1px] rounded-2xl bg-gradient-to-b from-white/10 to-white/[0.02]">
        {/* Inner core */}
        <div className={`bg-gradient-to-br ${booth.gradient} rounded-[calc(1rem-1px)] p-5 relative`}>
          <div className="absolute top-3 right-4 flex items-center gap-2">
            <span className="text-white/30 font-mono text-[11px]">{booth.id}</span>
          </div>

          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center overflow-hidden p-1.5 shadow-[inset_0_1px_2px_rgba(0,0,0,0.06)]">
              <img src={booth.logo} alt={booth.brand} className="object-contain w-full h-full" />
            </div>
            <div className="flex items-center gap-1 text-white/40">
              <Eye className="w-3 h-3" />
              <span className="text-[10px]">{booth.viewers}</span>
            </div>
          </div>

          <h3 className="text-white font-semibold text-[13px] leading-tight mb-1">{booth.name}</h3>
          <p className="text-white/50 text-xs line-clamp-2 mb-4 leading-relaxed">{booth.desc}</p>

          <button className="inline-flex items-center gap-1.5 text-white/70 group-hover:text-white text-xs font-medium bg-white/[0.08] hover:bg-white/[0.14] px-3 py-1.5 rounded-lg transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]">
            Khám phá <ArrowRight className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-0.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

export function VirtualExpo() {
  return (
    <section id="trien-lam" className="expo-band relative overflow-hidden py-24 sm:py-32">
      <div className="max-w-[1400px] mx-auto px-6">
        {/* Outer shell */}
        <div data-reveal className="surface-glow p-1.5 rounded-[2rem] bg-white/[0.035] ring-1 ring-white/[0.06]">
          {/* Inner core */}
          <div className="bg-[#0b1422] rounded-[calc(2rem-0.375rem)] p-8 sm:p-10 relative overflow-hidden shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)]">
            {/* Ambient glow */}
            <div className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-cyan-200/20 to-transparent" />

            {/* Header */}
            <div data-reveal style={{ '--reveal-delay': '90ms' } as CSSProperties} className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-blue-500/10 flex items-center justify-center ring-1 ring-blue-500/20">
                  <MapPin className="w-4 h-4 text-blue-400" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">SƠ ĐỒ TRIỂN LÃM</h2>
                  <p className="text-white/30 text-xs mt-0.5">Click vào gian hàng để khám phá</p>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-emerald-500/10 px-3 py-1.5 rounded-full ring-1 ring-emerald-500/20">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-emerald-400 text-[11px] font-medium tracking-wide">LIVE</span>
              </div>
            </div>

            <div className="flex flex-col xl:flex-row gap-8">
              {/* Map area */}
              <div className="flex-1 space-y-5">
                {/* Row 1: waiting + 4 booths */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                  {/* Waiting area */}
                  <div className="p-[1px] rounded-2xl bg-gradient-to-b from-white/[0.06] to-transparent">
                    <div className="bg-white/[0.03] rounded-[calc(1rem-1px)] p-5 flex items-center justify-center min-h-[180px]">
                      <div className="text-center space-y-2">
                    <div className="w-12 h-12 rounded-xl bg-white/[0.04] flex items-center justify-center mx-auto ring-1 ring-white/[0.06]">
                          <User className="w-5 h-5 text-white/25" />
                        </div>
                        <span className="text-white/30 text-xs font-medium block">Khu vực chờ</span>
                      </div>
                    </div>
                  </div>
                  {booths.slice(0, 4).map((b) => <BoothCard key={b.id} booth={b} />)}
                </div>

                {/* Smart Guided Lane */}
                <div data-reveal style={{ '--reveal-delay': '120ms' } as CSSProperties} className="p-[1px] rounded-2xl bg-gradient-to-r from-cyan-300/30 via-white/5 to-cyan-300/30">
                  <div className="bg-[#0b1422] rounded-[calc(1rem-1px)] py-4 px-6 flex items-center justify-center gap-4 relative overflow-hidden">
                    {/* Shimmer */}
                    <div className="absolute inset-0 pointer-events-none overflow-hidden">
                      <div className="w-1/4 h-full bg-gradient-to-r from-transparent via-blue-500/[0.06] to-transparent" style={{ animation: 'shimmer 5s linear infinite' }} />
                    </div>
                    <span className="text-blue-300/60 text-xs font-medium tracking-[0.25em] relative z-10">SMART GUIDED EXPERIENCE LANE</span>
                  </div>
                </div>

                {/* Row 2: 4 booths */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:px-[5%]">
                  {booths.slice(4, 8).map((b) => <BoothCard key={b.id} booth={b} />)}
                </div>
              </div>

              {/* Sidebar */}
              <div className="w-full xl:w-72 space-y-5 flex-shrink-0">
                {/* Stats */}
                <div className="p-[1px] rounded-2xl bg-gradient-to-b from-white/[0.06] to-transparent">
                  <div className="bg-white/[0.03] rounded-[calc(1rem-1px)] p-6 shadow-[inset_0_1px_1px_rgba(255,255,255,0.04)]">
                    <h3 className="text-white/80 font-semibold text-xs mb-5 tracking-wider flex items-center gap-2">
                      <Activity className="w-3.5 h-3.5 text-emerald-400" /> THỐNG KÊ TRỰC TIẾP
                    </h3>
                    <div className="space-y-4">
                      {[
                        { label: 'Visitors Online', value: '143', accent: 'text-blue-400' },
                        { label: 'Lượt tham quan', value: '2,458', accent: 'text-cyan-400' },
                        { label: 'Tương tác hôm nay', value: '92%', accent: 'text-emerald-400' },
                      ].map((s, i) => (
                        <div key={i} className="flex justify-between items-center">
                          <span className="text-white/30 text-xs">{s.label}</span>
                          <span className={`font-mono font-semibold text-sm ${s.accent}`}>{s.value}</span>
                        </div>
                      ))}
                      <div className="flex justify-between items-center pt-3 border-t border-white/[0.04]">
                        <span className="text-white/30 text-xs">Robot Guide</span>
                        <div className="flex items-center gap-1.5">
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          <span className="text-emerald-400 text-[10px] font-medium">2 Hoạt động</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Activity */}
                <div className="p-[1px] rounded-2xl bg-gradient-to-b from-white/[0.06] to-transparent">
                  <div className="bg-white/[0.03] rounded-[calc(1rem-1px)] p-6 shadow-[inset_0_1px_1px_rgba(255,255,255,0.04)]">
                    <h3 className="text-white/80 font-semibold text-xs mb-5 tracking-wider">HOẠT ĐỘNG GẦN ĐÂY</h3>
                    <div className="space-y-4">
                      {[
                        { user: 'Visitor_1087', action: 'vừa ghé thăm gian Coca-Cola', time: '2p', dot: 'bg-red-400' },
                        { user: 'Visitor_0942', action: 'đang xem mô hình ủ bia', time: '5p', dot: 'bg-green-400' },
                        { user: 'Visitor_2011', action: 'tương tác với Robot Guide', time: '8p', dot: 'bg-blue-400' },
                        { user: 'Visitor_4561', action: 'đăng ký nhận bản tin', time: '12p', dot: 'bg-purple-400' },
                      ].map((a, i) => (
                        <div key={i} className="flex items-start gap-2.5">
                          <div className={`w-1.5 h-1.5 rounded-full ${a.dot} mt-1.5 flex-shrink-0`} />
                          <div className="flex-1 min-w-0">
                            <p className="text-white/70 text-xs font-medium">{a.user}</p>
                            <p className="text-white/25 text-[10px] truncate">{a.action}</p>
                          </div>
                          <span className="text-white/15 text-[10px] flex-shrink-0">{a.time}</span>
                        </div>
                      ))}
                    </div>
                    <Button variant="outline" className="w-full mt-5 bg-transparent border-white/[0.06] text-white/40 hover:text-white/60 hover:bg-white/[0.03] text-[11px] rounded-lg h-8 transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]">
                      XEM TẤT CẢ HOẠT ĐỘNG
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

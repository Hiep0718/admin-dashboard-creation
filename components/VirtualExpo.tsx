'use client';

import { Button } from '@/components/ui/button';
import { ArrowRight, ChevronLeft, ChevronRight, MapPin, Activity, User, Zap, Eye } from 'lucide-react';

const booths = [
  { id: '01', name: 'Coca-Cola Experience Hub', brand: 'Coca-Cola', desc: 'Trải nghiệm cá nhân hóa đồ uống bằng AI cá nhân hóa.', color: 'from-red-700 to-red-900', logo: 'https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=http://coca-cola.com&size=128', visitors: 42 },
  { id: '02', name: 'Pepsi Interactive Lab', brand: 'PEPSI', desc: 'Tương tác thông minh, kết nối khách hàng.', color: 'from-blue-700 to-blue-900', logo: 'https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=http://pepsi.com&size=128', visitors: 38 },
  { id: '03', name: 'Heineken Future Brewing', brand: 'Heineken', desc: 'Công nghệ ủ bia thông minh thế hệ mới.', color: 'from-green-700 to-green-900', logo: 'https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=http://heineken.com&size=128', visitors: 31 },
  { id: '04', name: 'Tiger Smart Distribution', brand: 'Tiger', desc: 'Logistics thông minh, tối ưu chuỗi cung ứng.', color: 'from-amber-700 to-amber-900', logo: 'https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=http://tigerbeer.com&size=128', visitors: 27 },
  { id: '05', name: 'Sabeco Industry Pavilion', brand: 'SABECO', desc: 'Đổi mới ngành đồ uống Việt Nam.', color: 'from-yellow-600 to-yellow-800', logo: 'https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=http://sabeco.com.vn&size=128', visitors: 22 },
  { id: '06', name: 'Abbott Healthcare Innovation', brand: 'Abbott', desc: 'Giải pháp chăm sóc sức khỏe tiên tiến.', color: 'from-sky-600 to-sky-800', logo: 'https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=http://abbott.com&size=128', visitors: 19 },
  { id: '07', name: 'Nutifood Nutrition Tech Lab', brand: 'Nutifood', desc: 'Dinh dưỡng cá nhân hóa dựa trên dữ liệu.', color: 'from-emerald-600 to-emerald-800', logo: 'https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=http://nutifood.com.vn&size=128', visitors: 15 },
  { id: '08', name: 'Vinamilk DairyTech Future Zone', brand: 'Vinamilk', desc: 'Công nghệ sữa thông minh thế hệ mới.', color: 'from-blue-600 to-indigo-800', logo: 'https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=http://vinamilk.com.vn&size=128', visitors: 18 },
];

function BoothCard({ booth }: { booth: typeof booths[0] }) {
  return (
    <div className={`bg-gradient-to-br ${booth.color} rounded-2xl p-5 relative group cursor-pointer border border-white/10 hover:scale-[1.03] transition-all duration-500 shadow-lg hover:shadow-2xl overflow-hidden`}>
      {/* Shine effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
      </div>
      
      <div className="absolute top-3 right-4 bg-black/20 backdrop-blur-sm px-2 py-0.5 rounded-full">
        <span className="text-white/70 font-mono text-xs">{booth.id}</span>
      </div>
      
      <div className="flex items-start gap-3 mb-3">
        <div className="h-11 w-11 bg-white rounded-xl flex items-center justify-center shadow-md overflow-hidden p-1.5 flex-shrink-0">
          <img src={booth.logo} alt={booth.brand} className="object-contain w-full h-full" />
        </div>
        <div className="flex items-center gap-1 mt-1">
          <Eye className="w-3 h-3 text-white/50" />
          <span className="text-white/60 text-[10px] font-medium">{booth.visitors} đang xem</span>
        </div>
      </div>
      
      <h3 className="text-white font-bold text-sm leading-tight mb-1.5">{booth.name}</h3>
      <p className="text-white/70 text-xs line-clamp-2 mb-4 leading-relaxed">{booth.desc}</p>
      
      <button className="text-white text-xs font-semibold flex items-center gap-1.5 group-hover:gap-3 transition-all bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg backdrop-blur-sm">
        Khám phá <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
      </button>
    </div>
  );
}

export function VirtualExpo() {
  return (
    <section id="trien-lam" className="py-16 bg-slate-50 relative">
      <div className="container mx-auto px-4">
        
        <div className="bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] rounded-3xl p-6 sm:p-10 shadow-[0_0_80px_rgba(59,130,246,0.1)] relative overflow-hidden border border-white/5">
          {/* Background effects */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-[100px]" />
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-blue-400" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  SƠ ĐỒ TRIỂN LÃM
                </h2>
              </div>
              <p className="text-slate-400 text-sm ml-[52px]">Click vào gian hàng để khám phá chi tiết</p>
            </div>
            <div className="flex items-center gap-2 bg-green-500/10 px-4 py-2 rounded-full border border-green-500/20">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-green-400 text-sm font-medium">LIVE</span>
            </div>
          </div>

          <div className="flex flex-col xl:flex-row gap-8">
            
            {/* Left: Expo Map Area */}
            <div className="flex-1 space-y-6">
              {/* Row 1 Booths */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                <div className="glass rounded-2xl p-5 flex items-center justify-center min-h-[180px]">
                  <div className="text-center space-y-3">
                    <div className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center mx-auto border border-white/10">
                      <User className="w-7 h-7 text-white/40" />
                    </div>
                    <div>
                      <span className="text-white/60 text-sm font-medium block">Khu vực chờ</span>
                      <span className="text-white/30 text-xs">Waiting Area</span>
                    </div>
                  </div>
                </div>
                {booths.slice(0, 4).map((booth) => (
                  <BoothCard key={booth.id} booth={booth} />
                ))}
              </div>

              {/* Smart Guided Lane */}
              <div className="glass rounded-2xl py-4 px-6 flex items-center justify-between relative overflow-hidden">
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  <div className="w-1/3 h-full bg-gradient-to-r from-transparent via-blue-500/10 to-transparent" style={{ animation: 'shimmer 4s linear infinite' }} />
                </div>
                <div className="flex gap-1.5 text-blue-400/60">
                  <ChevronLeft className="w-4 h-4" />
                  <ChevronLeft className="w-4 h-4 opacity-60" />
                  <ChevronLeft className="w-4 h-4 opacity-30" />
                </div>
                <div className="flex items-center gap-4 z-10">
                  <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center pulse-glow">
                    <Zap className="w-4 h-4 text-blue-400" />
                  </div>
                  <div className="bg-blue-600/10 px-6 py-2 rounded-xl border border-blue-500/20">
                    <span className="text-blue-300 font-semibold text-sm tracking-widest">SMART GUIDED EXPERIENCE LANE</span>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center pulse-glow">
                    <Zap className="w-4 h-4 text-blue-400" />
                  </div>
                </div>
                <div className="flex gap-1.5 text-blue-400/60">
                  <ChevronRight className="w-4 h-4 opacity-30" />
                  <ChevronRight className="w-4 h-4 opacity-60" />
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>

              {/* Row 2 Booths */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:px-[calc(100%/10)]">
                {booths.slice(4, 8).map((booth) => (
                  <BoothCard key={booth.id} booth={booth} />
                ))}
              </div>
            </div>

            {/* Right: Info Panels */}
            <div className="w-full xl:w-80 space-y-5">
              {/* Live Stats */}
              <div className="glass rounded-2xl p-6">
                <h3 className="text-white font-semibold text-sm mb-5 uppercase tracking-wider flex items-center gap-2">
                  <Activity className="w-4 h-4 text-green-400" /> THỐNG KÊ TRỰC TIẾP
                </h3>
                <div className="space-y-4">
                  {[
                    { label: 'Visitors Online', value: '143', color: 'text-blue-400' },
                    { label: 'Lượt tham quan', value: '2,458', color: 'text-cyan-400' },
                    { label: 'Tương tác hôm nay', value: '92%', color: 'text-emerald-400' },
                  ].map((stat, i) => (
                    <div key={i} className="flex justify-between items-center group">
                      <span className="text-slate-400 text-sm">{stat.label}</span>
                      <span className={`font-mono font-bold text-lg ${stat.color}`}>{stat.value}</span>
                    </div>
                  ))}
                  <div className="flex justify-between items-center pt-2 border-t border-white/5">
                    <span className="text-slate-400 text-sm">Robot Guide</span>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                      <span className="text-green-400 text-xs font-semibold">2 Hoạt động</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="glass rounded-2xl p-6">
                <h3 className="text-white font-semibold text-sm mb-5 uppercase tracking-wider">HOẠT ĐỘNG GẦN ĐÂY</h3>
                <div className="space-y-4">
                  {[
                    { user: 'Visitor_1087', action: 'vừa ghé thăm gian Coca-Cola', time: '2p', color: 'bg-red-500' },
                    { user: 'Visitor_0942', action: 'đang xem mô hình ủ bia', time: '5p', color: 'bg-green-500' },
                    { user: 'Visitor_2011', action: 'tương tác với Robot Guide', time: '8p', color: 'bg-blue-500' },
                    { user: 'Visitor_4561', action: 'đăng ký nhận bản tin', time: '12p', color: 'bg-purple-500' },
                  ].map((activity, i) => (
                    <div key={i} className="flex items-start gap-3 group">
                      <div className={`w-2 h-2 rounded-full ${activity.color} mt-1.5 flex-shrink-0 shadow-[0_0_6px_currentColor]`} />
                      <div className="flex-1 min-w-0">
                        <p className="text-white text-xs font-semibold">{activity.user}</p>
                        <p className="text-slate-400 text-[11px] truncate">{activity.action}</p>
                      </div>
                      <span className="text-slate-500 text-[10px] flex-shrink-0 bg-white/5 px-2 py-0.5 rounded-full">{activity.time}</span>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-5 bg-transparent border-white/10 text-slate-300 hover:bg-white/5 hover:text-white text-xs rounded-xl">
                  XEM TẤT CẢ HOẠT ĐỘNG
                </Button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

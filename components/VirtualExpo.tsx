'use client';

import { Button } from '@/components/ui/button';
import {
  Activity,
  ArrowRight,
  Bot,
  Clock,
  DoorOpen,
  Eye,
  Gift,
  MapPin,
  Route,
  Toilet,
  Users,
} from 'lucide-react';
import type { CSSProperties } from 'react';

type Booth = {
  id: string;
  name: string;
  brand: string;
  desc: string;
  logo: string;
  visitors: number;
  accent: string;
  deep: string;
  soft: string;
  image: string;
};

const boothImage = '/images/exhibition-hall.png';

const booths: Booth[] = [
  {
    id: '01',
    name: 'Coca-Cola Experience Hub',
    brand: 'Coca-Cola',
    desc: 'Trải nghiệm cá nhân hóa đồ uống bằng AI.',
    logo: 'https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=http://coca-cola.com&size=128',
    visitors: 42,
    accent: '#dc1725',
    deep: '#8d0711',
    soft: '#fff1f2',
    image: '/images/cocacola-booth.png',
  },
  {
    id: '02',
    name: 'Pepsi Interactive Lab',
    brand: 'Pepsi',
    desc: 'Tương tác thông minh, kết nối khách hàng.',
    logo: 'https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=http://pepsi.com&size=128',
    visitors: 38,
    accent: '#1357c8',
    deep: '#07346e',
    soft: '#eff6ff',
    image: boothImage,
  },
  {
    id: '03',
    name: 'Heineken Future Brewing',
    brand: 'Heineken',
    desc: 'Công nghệ ủ bia thông minh thế hệ mới.',
    logo: 'https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=http://heineken.com&size=128',
    visitors: 31,
    accent: '#0b8c45',
    deep: '#064829',
    soft: '#ecfdf5',
    image: boothImage,
  },
  {
    id: '04',
    name: 'Tiger Smart Distribution',
    brand: 'Tiger',
    desc: 'Logistics thông minh, tối ưu chuỗi cung ứng.',
    logo: 'https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=http://tigerbeer.com&size=128',
    visitors: 27,
    accent: '#d88211',
    deep: '#0f2a55',
    soft: '#fff7ed',
    image: boothImage,
  },
  {
    id: '05',
    name: 'Sabeco Industry Pavilion',
    brand: 'SABECO',
    desc: 'Đổi mới ngành đồ uống Việt Nam.',
    logo: 'https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=http://sabeco.com.vn&size=128',
    visitors: 22,
    accent: '#b88405',
    deep: '#6b4a00',
    soft: '#fffbeb',
    image: boothImage,
  },
  {
    id: '06',
    name: 'Abbott Healthcare Innovation',
    brand: 'Abbott',
    desc: 'Giải pháp chăm sóc sức khỏe tiên tiến.',
    logo: 'https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=http://abbott.com&size=128',
    visitors: 19,
    accent: '#159bd3',
    deep: '#075985',
    soft: '#f0f9ff',
    image: boothImage,
  },
  {
    id: '07',
    name: 'Nutifood Nutrition Tech Lab',
    brand: 'Nutifood',
    desc: 'Dinh dưỡng cá nhân hóa dựa trên dữ liệu.',
    logo: 'https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=http://nutifood.com.vn&size=128',
    visitors: 15,
    accent: '#0c9b61',
    deep: '#065f46',
    soft: '#ecfdf5',
    image: boothImage,
  },
  {
    id: '08',
    name: 'Vinamilk DairyTech Future Zone',
    brand: 'Vinamilk',
    desc: 'Công nghệ sữa thông minh thế hệ mới.',
    logo: 'https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=http://vinamilk.com.vn&size=128',
    visitors: 18,
    accent: '#1655d9',
    deep: '#132f74',
    soft: '#eff6ff',
    image: boothImage,
  },
];

const stats = [
  { Icon: Users, label: 'Visitors Online', value: '143', tone: 'text-sky-300' },
  { Icon: Eye, label: 'Lượt tham quan', value: '2,458', tone: 'text-cyan-300' },
  { Icon: Activity, label: 'Tỷ lệ tương tác hôm nay', value: '92%', tone: 'text-emerald-300' },
  { Icon: Clock, label: 'Thời gian trung bình', value: '04:32', tone: 'text-blue-300' },
];

const activities = [
  { user: 'Visitor_1087', action: 'Vừa ghé thăm gian Coca-Cola', time: '2p', dot: 'bg-rose-400' },
  { user: 'Visitor_0942', action: 'Đang xem mô hình ủ bia Heineken', time: '5p', dot: 'bg-lime-400' },
  { user: 'Visitor_2011', action: 'Tương tác với Robot Guide', time: '8p', dot: 'bg-sky-400' },
  { user: 'Visitor_4561', action: 'Đăng ký nhận bản tin sự kiện', time: '12p', dot: 'bg-violet-400' },
  { user: 'Visitor_3320', action: 'Tham quan gian Nutifood', time: '14p', dot: 'bg-indigo-400' },
];

function ExpoLight({ className = '' }: { className?: string }) {
  return <span className={`expo-floor-light ${className}`} />;
}

function UtilityBlock() {
  return (
    <div className="expo-utility-panel">
      <div className="grid h-16 w-16 place-items-center rounded-[1rem] border border-slate-300/80 bg-white shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]">
        <Toilet className="h-8 w-8 text-slate-600" />
      </div>
      <span className="text-[11px] font-black uppercase tracking-[0.12em] text-slate-500">Toilet</span>
    </div>
  );
}

function EntryGate({ label, align = 'left' }: { label: string; align?: 'left' | 'right' }) {
  return (
    <div className={`flex items-center gap-2 ${align === 'right' ? 'justify-end' : ''}`}>
      <div className="grid h-16 w-8 place-items-center rounded-full border border-cyan-200 bg-white shadow-[0_10px_28px_rgba(14,165,233,0.2),inset_0_0_0_4px_rgba(14,165,233,0.08)]">
        <DoorOpen className="h-4 w-4 text-cyan-700" />
      </div>
      <div className="grid h-16 w-8 place-items-center rounded-full border border-cyan-200 bg-white shadow-[0_10px_28px_rgba(14,165,233,0.2),inset_0_0_0_4px_rgba(14,165,233,0.08)]">
        <DoorOpen className="h-4 w-4 text-cyan-700" />
      </div>
      <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">{label}</span>
    </div>
  );
}

function RobotGuide({ className = '' }: { className?: string }) {
  return (
    <div className={`expo-robot ${className}`}>
      <img src="/images/robot-guide.png" alt="Robot guide" className="h-full w-full object-contain" />
    </div>
  );
}

function BoothCard({ booth, position }: { booth: Booth; position: 'top' | 'bottom' }) {
  const style = {
    '--booth-accent': booth.accent,
    '--booth-deep': booth.deep,
    '--booth-soft': booth.soft,
  } as CSSProperties;

  return (
    <article
      className={`expo-booth motion-card group ${position === 'top' ? 'expo-booth-top min-h-[208px]' : 'expo-booth-bottom min-h-[190px]'}`}
      style={style}
    >
      <div className="absolute inset-x-3 top-0 h-1.5 rounded-b-full bg-white/65 shadow-[0_0_18px_rgba(255,255,255,0.9)]" />
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="grid h-14 w-14 place-items-center rounded-full bg-white p-2.5 shadow-[0_12px_26px_rgba(15,23,42,0.22),inset_0_1px_0_rgba(255,255,255,0.9)]">
            <img src={booth.logo} alt={`${booth.brand} logo`} className="h-full w-full object-contain" />
          </div>
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.18em] text-white/74">{booth.id}</p>
            <p className="mt-1 text-lg font-black leading-none text-white drop-shadow-sm">{booth.brand}</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 rounded-full bg-white/16 px-2.5 py-1 text-[11px] font-bold text-white/78">
          <Eye className="h-3 w-3" />
          {booth.visitors}
        </div>
      </div>

      <div className="mt-4 grid grid-cols-[0.78fr_1fr] gap-4">
        <div className="overflow-hidden rounded-[0.85rem] border border-white/20 bg-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.18)]">
          <img
            src={booth.image}
            alt={`Không gian gian hàng ${booth.brand}`}
            className="h-24 w-full object-cover opacity-90 transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-105"
          />
        </div>
        <div className="flex min-w-0 flex-col">
          <h3 className="text-[13px] font-black leading-tight text-white">{booth.name}</h3>
          <p className="mt-1.5 line-clamp-2 text-[11px] leading-5 text-white/68">{booth.desc}</p>
          <button className="mt-auto inline-flex w-max items-center gap-2 rounded-[0.75rem] bg-white/16 px-3 py-2 text-[11px] font-bold text-white transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-white/24 active:scale-[0.98]">
            Khám phá
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </article>
  );
}

function LiveSidebar() {
  return (
    <aside className="grid gap-4 xl:w-[330px] xl:flex-shrink-0">
      <div className="rounded-[1.4rem] bg-[#07162b] p-5 text-white shadow-[0_22px_70px_rgba(8,22,43,0.24),inset_0_1px_0_rgba(255,255,255,0.08)]">
        <h3 className="flex items-center gap-2 text-sm font-black uppercase tracking-[0.04em]">
          <Activity className="h-4 w-4 text-emerald-300" />
          Thống kê trực tiếp
        </h3>
        <div className="mt-5 grid gap-3">
          {stats.map(({ Icon, label, value, tone }) => (
            <div key={label} className="flex items-center justify-between gap-4 rounded-[1rem] bg-white/[0.045] px-3.5 py-3">
              <div className="flex min-w-0 items-center gap-3">
                <div className="grid h-9 w-9 place-items-center rounded-full bg-cyan-200/10 text-cyan-100">
                  <Icon className="h-4 w-4" />
                </div>
                <span className="truncate text-xs font-medium text-white/48">{label}</span>
              </div>
              <span className={`font-mono text-sm font-black tabular-nums ${tone}`}>{value}</span>
            </div>
          ))}
          <div className="mt-1 flex items-center justify-between rounded-[1rem] border border-white/10 px-3.5 py-3">
            <span className="text-xs font-medium text-white/48">Robot Guide</span>
            <span className="flex items-center gap-2 text-xs font-bold text-emerald-300">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-300 shadow-[0_0_12px_rgba(110,231,183,0.8)]" />
              2 hoạt động
            </span>
          </div>
        </div>
      </div>

      <div className="rounded-[1.4rem] bg-[#07162b] p-5 text-white shadow-[0_22px_70px_rgba(8,22,43,0.22),inset_0_1px_0_rgba(255,255,255,0.08)]">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-sm font-black uppercase tracking-[0.04em]">Hoạt động gần đây</h3>
          <button className="rounded-full border border-white/10 px-3 py-1.5 text-[11px] font-semibold text-white/48 transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-white/10 hover:text-white">
            Xem tất cả
          </button>
        </div>
        <div className="mt-5 grid gap-4">
          {activities.map((activity) => (
            <div key={`${activity.user}-${activity.time}`} className="flex items-start gap-3">
              <span className={`mt-1.5 h-2 w-2 rounded-full ${activity.dot}`} />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold leading-tight text-white/88">{activity.user}</p>
                <p className="mt-1 truncate text-xs text-white/36">{activity.action}</p>
              </div>
              <span className="text-[11px] text-white/28">{activity.time}</span>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}

export function VirtualExpo() {
  const topBooths = booths.slice(0, 5);
  const bottomBooths = booths.slice(5);

  return (
    <section id="trien-lam" className="expo-band-light relative overflow-hidden py-20 sm:py-28">
      <div className="mx-auto max-w-[1480px] px-4 sm:px-6">
        <div data-reveal className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="flex items-start gap-4">
            <div className="grid h-14 w-14 place-items-center rounded-[1.15rem] border border-blue-100 bg-white text-blue-600 shadow-[0_16px_42px_rgba(37,99,235,0.14)]">
              <MapPin className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-[clamp(2rem,4vw,4.6rem)] font-black uppercase leading-[0.94] tracking-[-0.035em] text-slate-950 text-balance">
                Sơ đồ triển lãm
              </h2>
              <p className="mt-3 max-w-[620px] text-sm font-medium leading-6 text-slate-500 sm:text-base">
                Chọn gian hàng để xem mô hình trải nghiệm, lộ trình robot guide và dữ liệu tương tác theo thời gian thực.
              </p>
            </div>
          </div>

          <div className="flex w-max items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-black text-emerald-700 shadow-[0_12px_30px_rgba(16,185,129,0.12)]">
            <Activity className="h-4 w-4" />
            LIVE
          </div>
        </div>

        <div className="flex flex-col gap-5 xl:flex-row">
          <div data-reveal style={{ '--reveal-delay': '90ms' } as CSSProperties} className="min-w-0 flex-1">
            <div className="overflow-x-auto rounded-[1.5rem] border border-slate-200 bg-white p-3 shadow-[0_30px_100px_rgba(15,23,42,0.12)]">
              <div className="expo-floor-shell min-w-[1080px] rounded-[1.2rem] p-4">
                <div className="grid grid-cols-[150px_repeat(5,minmax(150px,1fr))] gap-2">
                  <UtilityBlock />
                  {topBooths.map((booth) => (
                    <BoothCard key={booth.id} booth={booth} position="top" />
                  ))}
                </div>

                <div className="expo-corridor relative my-4 min-h-[150px] overflow-hidden rounded-[1rem] border-y-4 border-[#0d5b64]/90 bg-white">
                  <div className="expo-floor-grid absolute inset-0" />
                  <div className="absolute inset-x-0 top-0 h-1 bg-[#0d5b64]" />
                  <div className="absolute inset-x-0 bottom-0 h-1 bg-[#0d5b64]" />

                  <div className="absolute left-5 top-1/2 -translate-y-1/2">
                    <EntryGate label="Vào cổng" />
                  </div>
                  <div className="absolute right-5 top-1/2 -translate-y-1/2">
                    <EntryGate label="Ra cổng" align="right" />
                  </div>

                  <ExpoLight className="left-[12%] top-1" />
                  <ExpoLight className="left-[28%] bottom-1" />
                  <ExpoLight className="left-[46%] top-1" />
                  <ExpoLight className="right-[25%] bottom-1" />
                  <ExpoLight className="right-[12%] top-1" />

                  <div className="absolute left-[16%] top-1/2 hidden -translate-y-1/2 gap-2 text-5xl font-black text-blue-500/42 md:flex">
                    <span>&rsaquo;</span>
                    <span>&rsaquo;</span>
                  </div>
                  <div className="absolute right-[13%] top-1/2 hidden -translate-y-1/2 gap-2 text-5xl font-black text-blue-500/42 md:flex">
                    <span>&rsaquo;</span>
                    <span>&rsaquo;</span>
                  </div>

                  <RobotGuide className="left-[30%] top-[44%]" />
                  <RobotGuide className="right-[23%] top-[44%]" />

                  <div className="absolute left-1/2 top-1/2 flex w-[300px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-[1rem] border border-cyan-200 bg-slate-900/72 px-5 py-4 text-center text-white shadow-[0_18px_50px_rgba(15,23,42,0.22),inset_0_1px_0_rgba(255,255,255,0.16)] backdrop-blur">
                    <div>
                      <p className="text-[13px] font-black uppercase tracking-[0.14em]">Smart Guided Experience Lane</p>
                      <p className="mt-1 text-[11px] font-medium text-cyan-100/70">Hành trình trải nghiệm thông minh</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-[150px_repeat(3,minmax(210px,1fr))_150px] gap-2">
                  <div className="rounded-[1rem] border border-slate-200 bg-slate-900" />
                  {bottomBooths.map((booth) => (
                    <BoothCard key={booth.id} booth={booth} position="bottom" />
                  ))}
                  <div className="rounded-[1rem] border border-slate-200 bg-slate-900" />
                </div>
              </div>
            </div>

            <div className="mt-4 grid gap-3 rounded-[1.2rem] border border-slate-200 bg-white p-3 shadow-[0_18px_60px_rgba(15,23,42,0.08)] sm:grid-cols-4">
              {[
                { Icon: Bot, title: 'Trải nghiệm thông minh', text: 'Dẫn đường tự động, gợi ý cá nhân hóa theo sở thích.' },
                { Icon: Route, title: 'Tương tác đa điểm', text: 'Workshop, demo sản phẩm và công nghệ mới.' },
                { Icon: Users, title: 'Kết nối & networking', text: 'Gặp doanh nghiệp, chuyên gia và khách tham quan.' },
                { Icon: Gift, title: 'Quà tặng & ưu đãi', text: 'Nhận ưu đãi độc quyền từ các gian hàng.' },
              ].map(({ Icon, title, text }) => (
                <div key={title} className="flex gap-3 rounded-[1rem] bg-slate-50 px-4 py-4">
                  <div className="grid h-11 w-11 flex-shrink-0 place-items-center rounded-full bg-blue-100 text-blue-700">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-black text-slate-900">{title}</p>
                    <p className="mt-1 text-xs leading-5 text-slate-500">{text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div data-reveal style={{ '--reveal-delay': '150ms' } as CSSProperties}>
            <LiveSidebar />
          </div>
        </div>
      </div>
    </section>
  );
}

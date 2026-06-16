'use client';

import { useMemo, type CSSProperties } from 'react';
import { CalendarDays, Clock, MapPin, Mic, Trophy, Users as UsersIcon, Utensils, type LucideIcon } from 'lucide-react';
import { useSchedules } from '@/hooks/useSchedules';

const iconMap: Record<string, LucideIcon> = {
  Users: UsersIcon,
  Mic,
  MapPin,
  CalendarDays,
  Utensils,
  Trophy,
};

function getAccentStyle(accent?: string): CSSProperties {
  const color = /^#[0-9a-f]{6}$/i.test(accent ?? '') ? accent! : '#2563eb';

  return {
    color,
    borderColor: `${color}22`,
    backgroundColor: `${color}10`,
  };
}

function formatTimeRange(time: string, end: string) {
  return [time, end].filter(Boolean).join(' - ');
}

export function ScheduleSection() {
  const { schedules, loading, error } = useSchedules();
  const sortedSchedules = useMemo(
    () => [...schedules].sort((a, b) => a.time.localeCompare(b.time)),
    [schedules],
  );

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
          {loading && sortedSchedules.length === 0
            ? Array.from({ length: 3 }).map((_, index) => (
                <article key={index} className="motion-card rounded-[1rem] border border-slate-200 bg-white p-2 shadow-[0_16px_45px_rgba(15,23,42,0.06)]">
                  <div className="grid gap-4 rounded-[0.8rem] bg-slate-50 px-4 py-4 sm:grid-cols-[170px_minmax(0,1fr)] sm:items-center">
                    <div className="flex items-center gap-2.5">
                      <div className="h-9 w-9 animate-pulse rounded-full bg-white" />
                      <div className="h-3 w-28 animate-pulse rounded-full bg-slate-200" />
                    </div>
                    <div>
                      <div className="h-4 w-64 max-w-full animate-pulse rounded-full bg-slate-200" />
                      <div className="mt-3 h-3 w-80 max-w-full animate-pulse rounded-full bg-slate-200" />
                    </div>
                  </div>
                </article>
              ))
            : null}

          {!loading && error ? (
            <article className="rounded-[1rem] border border-red-100 bg-white p-2 shadow-[0_16px_45px_rgba(15,23,42,0.06)]">
              <div className="rounded-[0.8rem] bg-red-50 px-4 py-5 text-sm font-bold text-red-700">
                Không thể tải lịch trình từ hệ thống.
              </div>
            </article>
          ) : null}

          {!loading && !error && sortedSchedules.length === 0 ? (
            <article className="rounded-[1rem] border border-slate-200 bg-white p-2 shadow-[0_16px_45px_rgba(15,23,42,0.06)]">
              <div className="rounded-[0.8rem] bg-slate-50 px-4 py-5 text-sm font-bold text-slate-500">
                Chưa có lịch trình sự kiện.
              </div>
            </article>
          ) : null}

          {sortedSchedules.map((item) => {
            const EventIcon = iconMap[item.icon] ?? Clock;
            const accentStyle = getAccentStyle(item.accent);

            return (
              <article key={item.id ?? `${item.time}-${item.label}`} className="motion-card rounded-[1rem] border border-slate-200 bg-white p-2 shadow-[0_16px_45px_rgba(15,23,42,0.06)] hover:border-blue-200">
                <div className="grid gap-4 rounded-[0.8rem] bg-slate-50 px-4 py-4 sm:grid-cols-[170px_minmax(0,1fr)] sm:items-center">
                  <div className="flex items-center gap-2.5">
                    <div className="grid h-9 w-9 place-items-center rounded-full bg-white shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]" style={{ color: item.accent || '#2563eb' }}>
                      <EventIcon className="h-4 w-4" />
                    </div>
                    <span className="font-mono text-xs font-black text-slate-700 tabular-nums">{formatTimeRange(item.time, item.end)}</span>
                  </div>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <h3 className="text-sm font-black leading-snug text-slate-950">{item.label}</h3>
                      {item.duration ? (
                        <span className="rounded-full border px-2.5 py-1 text-[10px] font-black" style={accentStyle}>
                          {item.duration}
                        </span>
                      ) : null}
                    </div>
                    <div className="mt-2 flex flex-wrap items-center gap-4 text-[12px] font-medium text-slate-500">
                      {item.speaker ? (
                        <span className="flex items-center gap-1.5">
                          <UsersIcon className="h-3.5 w-3.5" />
                          {item.speaker}
                        </span>
                      ) : null}
                      <span className="flex items-center gap-1.5">
                        <MapPin className="h-3.5 w-3.5" />
                        {item.detail}
                      </span>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

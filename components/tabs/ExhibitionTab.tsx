'use client';

import Image from 'next/image';
import {
  Activity,
  AlertTriangle,
  BatteryCharging,
  CheckCircle2,
  Clock3,
  Compass,
  Cpu,
  MapPin,
  Navigation,
  Radio,
  Route,
  Signal,
  Thermometer,
  Timer,
  UsersRound,
  Wifi,
  XCircle,
  type LucideIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';

type MqttCommand = {
  id: string;
  timestamp: string;
  operator: string;
  topic: string;
  command: string;
  payload: string;
  status: string;
  qos: number;
  latencyMs: number;
};

type RobotPosition = {
  zone: string;
  x: number;
  y: number;
  heading: number;
  accuracy: string;
  lastPing: string;
};

type RobotData = {
  name: string;
  status: string;
  model: string;
  version: string;
  batteryLevel: number;
  temperatureSensor: number;
  uptime: number;
  specifications: {
    cameras: number;
    microphones: number;
  };
  currentLocation: string;
  nextScheduledMaintenance: string;
  position: RobotPosition;
  mqtt: {
    broker: string;
    clientId: string;
    connection: string;
    lastSync: string;
    commands: MqttCommand[];
  };
};

type AnalyticsData = {
  uniqueVisitors: number;
  robustStats?: {
    guidedTours?: number;
    questionsAnswered?: number;
    visitorsAssisted?: number;
    systemUptime?: number;
  };
};

interface ExhibitionTabProps {
  analytics: AnalyticsData;
  robot: RobotData;
}

const statusMeta: Record<string, { label: string; className: string; icon: LucideIcon }> = {
  acknowledged: {
    label: 'ACK',
    className: 'border-emerald-200 bg-emerald-50 text-emerald-700',
    icon: CheckCircle2,
  },
  delivered: {
    label: 'DELIVERED',
    className: 'border-sky-200 bg-sky-50 text-sky-700',
    icon: Signal,
  },
  rejected: {
    label: 'REJECTED',
    className: 'border-rose-200 bg-rose-50 text-rose-700',
    icon: XCircle,
  },
  queued: {
    label: 'QUEUED',
    className: 'border-amber-200 bg-amber-50 text-amber-700',
    icon: Clock3,
  },
};

const metricTone = {
  blue: 'bg-blue-50 text-blue-700 ring-blue-100',
  emerald: 'bg-emerald-50 text-emerald-700 ring-emerald-100',
  amber: 'bg-amber-50 text-amber-700 ring-amber-100',
  slate: 'bg-slate-100 text-slate-700 ring-slate-200',
};

const mapZones = [
  { name: 'Coca-Cola', className: 'left-[12%] top-[12%] h-[20%] w-[16%]', tone: 'bg-red-100 text-red-700 border-red-200' },
  { name: 'Pepsi', className: 'left-[31%] top-[12%] h-[20%] w-[16%]', tone: 'bg-blue-100 text-blue-700 border-blue-200' },
  { name: 'Heineken', className: 'left-[50%] top-[12%] h-[20%] w-[16%]', tone: 'bg-emerald-100 text-emerald-700 border-emerald-200' },
  { name: 'Tiger', className: 'left-[69%] top-[12%] h-[20%] w-[16%]', tone: 'bg-amber-100 text-amber-700 border-amber-200' },
  { name: 'Abbott', className: 'left-[18%] bottom-[12%] h-[18%] w-[18%]', tone: 'bg-cyan-100 text-cyan-700 border-cyan-200' },
  { name: 'Nutifood', className: 'left-[42%] bottom-[12%] h-[18%] w-[18%]', tone: 'bg-green-100 text-green-700 border-green-200' },
  { name: 'Vinamilk', className: 'left-[66%] bottom-[12%] h-[18%] w-[18%]', tone: 'bg-indigo-100 text-indigo-700 border-indigo-200' },
];

function ShellPanel({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <section className={cn('rounded-[1.6rem] bg-white/72 p-1 ring-1 ring-slate-200/80 shadow-[0_24px_70px_rgba(15,23,42,0.08)]', className)}>
      <div className="h-full rounded-[1.3rem] bg-white shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]">
        {children}
      </div>
    </section>
  );
}

function MetricTile({
  icon: Icon,
  label,
  value,
  detail,
  tone = 'slate',
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  detail: string;
  tone?: keyof typeof metricTone;
}) {
  return (
    <div className="group rounded-[1.1rem] bg-white p-1 ring-1 ring-slate-200 transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-0.5 hover:shadow-[0_18px_42px_rgba(15,23,42,0.08)]">
      <div className="h-full rounded-[0.9rem] bg-slate-50 px-4 py-3">
        <div className="flex items-center justify-between gap-3">
          <span className={cn('grid h-9 w-9 place-items-center rounded-[0.8rem] ring-1', metricTone[tone])}>
            <Icon className="h-4 w-4" strokeWidth={1.8} />
          </span>
          <span className="font-mono text-xl font-black tabular-nums text-slate-950">{value}</span>
        </div>
        <p className="mt-3 text-[11px] font-black uppercase tracking-[0.14em] text-slate-400">{label}</p>
        <p className="mt-1 text-xs font-semibold leading-5 text-slate-600">{detail}</p>
      </div>
    </div>
  );
}

function RobotMap({ robot }: { robot: RobotData }) {
  const position = robot.position;

  return (
    <ShellPanel className="lg:col-span-2">
      <div className="p-5 sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-[11px] font-black uppercase tracking-[0.18em] text-blue-600">Live floor map</p>
            <h3 className="mt-2 text-2xl font-black tracking-[-0.03em] text-slate-950">Bản đồ vị trí robot</h3>
            <p className="mt-2 max-w-[58ch] text-sm font-medium leading-6 text-slate-500">
              Vị trí được lấy từ trạng thái điều hướng hiện tại của {robot.name}. Marker hiển thị theo phần trăm trên mặt bằng triển lãm.
            </p>
          </div>
          <div className="rounded-[1rem] bg-slate-950 px-4 py-3 text-white shadow-[0_16px_38px_rgba(15,23,42,0.18)]">
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-white/45">Current zone</p>
            <p className="mt-1 text-sm font-black">{position.zone}</p>
          </div>
        </div>

        <div className="mt-5 overflow-hidden rounded-[1.25rem] bg-slate-100 p-1 ring-1 ring-slate-200">
          <div className="relative min-h-[420px] overflow-hidden rounded-[1rem] bg-[#eaf0f6]">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(71,85,105,0.10)_1px,transparent_1px),linear-gradient(to_bottom,rgba(71,85,105,0.10)_1px,transparent_1px)] bg-[size:36px_36px]" />
            <div className="absolute inset-x-[8%] top-[43%] h-[14%] rounded-[1rem] border border-slate-300 bg-white/82 shadow-[inset_0_1px_0_rgba(255,255,255,0.92)]">
              <div className="flex h-full items-center justify-center">
                <div className="rounded-full bg-slate-950 px-4 py-2 text-[10px] font-black uppercase tracking-[0.18em] text-white">
                  Smart Guided Experience Lane
                </div>
              </div>
            </div>

            <div className="absolute left-[3%] top-[43%] grid h-[14%] w-[8%] place-items-center rounded-[0.9rem] border border-cyan-200 bg-cyan-50 text-center text-[10px] font-black uppercase tracking-[0.1em] text-cyan-700">
              Gate A
            </div>
            <div className="absolute right-[3%] top-[43%] grid h-[14%] w-[8%] place-items-center rounded-[0.9rem] border border-cyan-200 bg-cyan-50 text-center text-[10px] font-black uppercase tracking-[0.1em] text-cyan-700">
              Gate B
            </div>
            <div className="absolute left-[6%] bottom-[10%] grid h-[18%] w-[8%] place-items-center rounded-[0.9rem] border border-slate-200 bg-white text-center text-[10px] font-black uppercase tracking-[0.1em] text-slate-500">
              Dock A1
            </div>
            <div className="absolute right-[8%] bottom-[10%] grid h-[18%] w-[9%] place-items-center rounded-[0.9rem] border border-slate-200 bg-white text-center text-[10px] font-black uppercase tracking-[0.1em] text-slate-500">
              Service
            </div>

            {mapZones.map((zone) => (
              <div key={zone.name} className={cn('absolute grid place-items-center rounded-[0.95rem] border px-2 text-center text-[11px] font-black shadow-[0_10px_22px_rgba(15,23,42,0.07)]', zone.className, zone.tone)}>
                {zone.name}
              </div>
            ))}

            <div className="absolute left-[18%] top-[49.5%] h-1 w-[40%] rounded-full bg-blue-500/20" />
            <div className="absolute left-[32%] top-[49.5%] h-1 w-[26%] rounded-full bg-blue-500/45" />

            <div
              className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${position.x}%`, top: `${position.y}%` }}
            >
              <div className="relative grid h-16 w-16 place-items-center">
                <div className="absolute inset-0 rounded-full bg-blue-500/20 motion-safe:animate-ping" />
                <div className="absolute inset-2 rounded-full bg-blue-500/20" />
                <div className="relative grid h-11 w-11 place-items-center rounded-full bg-slate-950 text-white shadow-[0_18px_34px_rgba(15,23,42,0.28)] ring-4 ring-white">
                  <Navigation
                    className="h-5 w-5"
                    strokeWidth={2}
                    style={{ transform: `rotate(${position.heading}deg)` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <div className="rounded-[1rem] bg-slate-50 px-4 py-3">
            <p className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400">Độ chính xác</p>
            <p className="mt-1 font-mono text-lg font-black text-slate-950">{position.accuracy}</p>
          </div>
          <div className="rounded-[1rem] bg-slate-50 px-4 py-3">
            <p className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400">Heading</p>
            <p className="mt-1 font-mono text-lg font-black text-slate-950">{position.heading}°</p>
          </div>
          <div className="rounded-[1rem] bg-slate-50 px-4 py-3">
            <p className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400">Ping cuối</p>
            <p className="mt-1 font-mono text-xs font-black text-slate-950">{position.lastPing}</p>
          </div>
        </div>
      </div>
    </ShellPanel>
  );
}

function MqttCommandHistory({ robot }: { robot: RobotData }) {
  const commands = robot.mqtt.commands;

  return (
    <ShellPanel>
      <div className="p-5 sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[11px] font-black uppercase tracking-[0.18em] text-emerald-600">MQTT command stream</p>
            <h3 className="mt-2 text-2xl font-black tracking-[-0.03em] text-slate-950">Lịch sử lệnh gửi tới robot</h3>
          </div>
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-black text-emerald-700">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            Connected
          </span>
        </div>

        <div className="mt-5 rounded-[1rem] bg-slate-950 p-4 text-white">
          <div className="grid gap-3 text-xs sm:grid-cols-2">
            <div>
              <p className="font-bold uppercase tracking-[0.16em] text-white/35">Broker</p>
              <p className="mt-1 font-mono font-bold text-white">{robot.mqtt.broker}</p>
            </div>
            <div>
              <p className="font-bold uppercase tracking-[0.16em] text-white/35">Client ID</p>
              <p className="mt-1 truncate font-mono font-bold text-white">{robot.mqtt.clientId}</p>
            </div>
          </div>
          <div className="mt-4 h-px bg-white/10" />
          <p className="mt-3 font-mono text-[11px] font-semibold text-white/55">Last sync: {robot.mqtt.lastSync}</p>
        </div>

        <div className="mt-5 space-y-3">
          {commands.map((command) => {
            const meta = statusMeta[command.status] ?? statusMeta.queued;
            const StatusIcon = meta.icon;

            return (
              <article key={command.id} className="rounded-[1.1rem] bg-slate-50 p-4 ring-1 ring-slate-200 transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-white hover:shadow-[0_16px_38px_rgba(15,23,42,0.07)]">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="font-mono text-sm font-black text-slate-950">{command.command}</p>
                      <span className={cn('inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-black', meta.className)}>
                        <StatusIcon className="h-3 w-3" strokeWidth={2} />
                        {meta.label}
                      </span>
                    </div>
                    <p className="mt-2 truncate font-mono text-[11px] font-semibold text-slate-500">{command.topic}</p>
                  </div>
                  <div className="shrink-0 text-right">
                    <p className="font-mono text-xs font-black text-slate-950">{command.latencyMs}ms</p>
                    <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">QoS {command.qos}</p>
                  </div>
                </div>
                <pre className="mt-3 overflow-hidden rounded-[0.8rem] bg-white px-3 py-2 font-mono text-[11px] font-semibold leading-5 text-slate-600 ring-1 ring-slate-200">
                  {command.payload}
                </pre>
                <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-[11px] font-bold text-slate-400">
                  <span>{command.operator}</span>
                  <span className="font-mono">{command.timestamp}</span>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </ShellPanel>
  );
}

function RobotReadiness({ robot }: { robot: RobotData }) {
  return (
    <ShellPanel>
      <div className="p-5 sm:p-6">
        <div className="flex items-center gap-4">
          <div className="relative h-20 w-20 overflow-hidden rounded-[1.2rem] bg-slate-100 ring-1 ring-slate-200">
            <Image src="/images/robot.jpg" alt={robot.name} fill sizes="80px" className="object-cover" />
          </div>
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-xl font-black tracking-[-0.03em] text-slate-950">{robot.name}</h3>
              <span className="rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-emerald-700">
                Online
              </span>
            </div>
            <p className="mt-1 text-sm font-medium text-slate-500">{robot.model}</p>
          </div>
        </div>

        <div className="mt-6 grid gap-3">
          <div>
            <div className="mb-2 flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-[0.14em] text-slate-400">Pin</span>
              <span className="font-mono text-sm font-black text-slate-950">{robot.batteryLevel}%</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-slate-100">
              <div className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-blue-500" style={{ width: `${robot.batteryLevel}%` }} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-[1rem] bg-slate-50 p-3">
              <Thermometer className="h-4 w-4 text-slate-400" strokeWidth={1.8} />
              <p className="mt-2 font-mono text-lg font-black text-slate-950">{robot.temperatureSensor}°C</p>
              <p className="text-xs font-semibold text-slate-500">Nhiệt độ</p>
            </div>
            <div className="rounded-[1rem] bg-slate-50 p-3">
              <Timer className="h-4 w-4 text-slate-400" strokeWidth={1.8} />
              <p className="mt-2 font-mono text-lg font-black text-slate-950">{robot.uptime}h</p>
              <p className="text-xs font-semibold text-slate-500">Uptime</p>
            </div>
          </div>
          <div className="rounded-[1rem] bg-slate-50 p-3">
            <p className="text-xs font-black uppercase tracking-[0.14em] text-slate-400">Vị trí hiện tại</p>
            <p className="mt-2 text-sm font-bold leading-6 text-slate-800">{robot.currentLocation}</p>
          </div>
        </div>
      </div>
    </ShellPanel>
  );
}

export function ExhibitionTab({ analytics, robot }: ExhibitionTabProps) {
  const acknowledgedCommands = robot.mqtt.commands.filter((command) => command.status === 'acknowledged' || command.status === 'delivered').length;
  const commandRate = Math.round((acknowledgedCommands / robot.mqtt.commands.length) * 100);

  return (
    <div className="space-y-6">
      <section className="overflow-hidden rounded-[2rem] bg-slate-950 p-1 shadow-[0_28px_80px_rgba(15,23,42,0.18)]">
        <div className="relative overflow-hidden rounded-[1.7rem] bg-[linear-gradient(135deg,#0f172a_0%,#172033_45%,#10251f_100%)] px-5 py-6 text-white sm:px-7 lg:px-8">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/35 to-transparent" />
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-end">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/8 px-3 py-1.5 text-[11px] font-black uppercase tracking-[0.16em] text-white/70">
                <Radio className="h-3.5 w-3.5 text-emerald-300" strokeWidth={1.8} />
                Robot operations
              </div>
              <h2 className="mt-5 max-w-3xl text-3xl font-black leading-[0.95] tracking-[-0.045em] sm:text-5xl">
                Trung tâm điều phối {robot.name}
              </h2>
              <p className="mt-4 max-w-2xl text-sm font-medium leading-7 text-white/62">
                Theo dõi vị trí robot, trạng thái hệ thống và các lệnh MQTT đã gửi từ bảng điều khiển vận hành.
              </p>
            </div>
            <div className="grid gap-3 rounded-[1.4rem] bg-white/8 p-4 ring-1 ring-white/10">
              <div className="flex items-center justify-between gap-3">
                <span className="text-xs font-bold uppercase tracking-[0.16em] text-white/42">System health</span>
                <span className="rounded-full bg-emerald-400/12 px-3 py-1 text-xs font-black text-emerald-200">{analytics.robustStats?.systemUptime ?? 99.8}%</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-white/10">
                <div className="h-full rounded-full bg-emerald-300" style={{ width: `${analytics.robustStats?.systemUptime ?? 99.8}%` }} />
              </div>
              <p className="text-xs font-semibold leading-5 text-white/50">Bảo trì tiếp theo: {robot.nextScheduledMaintenance}</p>
            </div>
          </div>
        </div>
      </section>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricTile icon={UsersRound} label="Khách đã hỗ trợ" value={(analytics.robustStats?.visitorsAssisted ?? 0).toLocaleString()} detail="Tổng lượt robot hỗ trợ tại sự kiện" tone="blue" />
        <MetricTile icon={Route} label="Tour dẫn đường" value={(analytics.robustStats?.guidedTours ?? 0).toLocaleString()} detail="Chuyến tham quan do robot dẫn" tone="emerald" />
        <MetricTile icon={Wifi} label="MQTT ACK rate" value={`${commandRate}%`} detail={`${acknowledgedCommands}/${robot.mqtt.commands.length} lệnh đã xác nhận`} tone="amber" />
        <MetricTile icon={BatteryCharging} label="Pin robot" value={`${robot.batteryLevel}%`} detail="Sẵn sàng cho phiên vận hành" tone="slate" />
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.45fr)_minmax(390px,0.9fr)]">
        <div className="grid gap-6">
          <RobotMap robot={robot} />
          <div className="grid gap-6 lg:grid-cols-2">
            <RobotReadiness robot={robot} />
            <ShellPanel>
              <div className="p-5 sm:p-6">
                <p className="text-[11px] font-black uppercase tracking-[0.18em] text-slate-400">Robot capability</p>
                <h3 className="mt-2 text-2xl font-black tracking-[-0.03em] text-slate-950">Tình trạng tác vụ</h3>
                <div className="mt-5 space-y-3">
                  {[
                    { label: 'SLAM navigation', value: 'Stable', icon: Compass, color: 'text-emerald-600 bg-emerald-50' },
                    { label: 'Vision stack', value: `${robot.specifications.cameras} cameras`, icon: Activity, color: 'text-blue-600 bg-blue-50' },
                    { label: 'Voice interface', value: `${robot.specifications.microphones} microphones`, icon: Cpu, color: 'text-amber-600 bg-amber-50' },
                    { label: 'Safety override', value: 'Armed', icon: AlertTriangle, color: 'text-rose-600 bg-rose-50' },
                  ].map((item) => {
                    const Icon = item.icon;

                    return (
                      <div key={item.label} className="flex items-center justify-between gap-4 rounded-[1rem] bg-slate-50 px-4 py-3">
                        <div className="flex items-center gap-3">
                          <span className={cn('grid h-9 w-9 place-items-center rounded-[0.8rem]', item.color)}>
                            <Icon className="h-4 w-4" strokeWidth={1.8} />
                          </span>
                          <span className="text-sm font-bold text-slate-700">{item.label}</span>
                        </div>
                        <span className="font-mono text-xs font-black text-slate-950">{item.value}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </ShellPanel>
          </div>
        </div>

        <MqttCommandHistory robot={robot} />
      </div>
    </div>
  );
}

'use client';

import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface RobotStatusPanelProps {
  name: string;
  model: string;
  status: string;
  batteryLevel: number;
  temperature: number;
  uptime: number;
  currentLocation: string;
}

export function RobotStatusPanel({
  name,
  model,
  status,
  batteryLevel,
  temperature,
  uptime,
  currentLocation,
}: RobotStatusPanelProps) {
  const statusColor = status === 'active' ? 'text-green-600 bg-green-100' : 'text-red-600 bg-red-100';

  return (
    <Card className="border-border overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl">{name}</CardTitle>
            <p className="text-sm text-foreground/60 mt-1">{model}</p>
          </div>
          <span className={`px-4 py-2 rounded-full text-sm font-bold ${statusColor}`}>
            {status === 'active' ? '● Trực Tuyến' : '● Ngoại Tuyến'}
          </span>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Robot Image */}
        <div className="relative h-48 bg-gradient-to-br from-primary/5 to-accent/5 rounded-lg overflow-hidden">
          <Image
            src="/images/robot.jpg"
            alt={name}
            fill
            className="object-cover"
          />
        </div>

        {/* Status Grid */}
        <div className="grid grid-cols-2 gap-4">
          {/* Battery */}
          <div>
            <p className="text-xs text-foreground/60 uppercase tracking-wide font-semibold">Pin</p>
            <div className="mt-2">
              <p className="text-2xl font-bold text-primary">{batteryLevel}%</p>
              <div className="w-full h-2 bg-muted rounded-full mt-2 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-primary to-accent"
                  style={{ width: `${batteryLevel}%` }}
                />
              </div>
            </div>
          </div>

          {/* Temperature */}
          <div>
            <p className="text-xs text-foreground/60 uppercase tracking-wide font-semibold">Nhiệt Độ</p>
            <p className="text-2xl font-bold text-primary mt-2">{temperature}°C</p>
            <p className="text-xs text-foreground/60 mt-1">Bình Thường</p>
          </div>

          {/* Uptime */}
          <div>
            <p className="text-xs text-foreground/60 uppercase tracking-wide font-semibold">Thời Gian Hoạt Động</p>
            <p className="text-2xl font-bold text-primary mt-2">{uptime}h</p>
            <p className="text-xs text-foreground/60 mt-1">Phiên này</p>
          </div>

          {/* Location */}
          <div>
            <p className="text-xs text-foreground/60 uppercase tracking-wide font-semibold">Vị Trí</p>
            <p className="text-sm font-semibold text-foreground mt-2 line-clamp-2">{currentLocation}</p>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border" />

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium text-sm hover:bg-primary/90 transition-colors">
            Khởi Động Lại
          </button>
          <button className="flex-1 px-4 py-2 bg-accent text-accent-foreground rounded-lg font-medium text-sm hover:bg-accent/90 transition-colors">
            Chẩn Đoán
          </button>
        </div>
      </CardContent>
    </Card>
  );
}

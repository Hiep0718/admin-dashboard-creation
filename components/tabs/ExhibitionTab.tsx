'use client';

import { StatCard } from '@/components/StatCard';
import { RobotStatusPanel } from '@/components/RobotStatusPanel';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ExhibitionTabProps {
  analytics: any;
  robot: any;
}

export function ExhibitionTab({ analytics, robot }: ExhibitionTabProps) {
  return (
    <>
      {/* Welcome Section */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-2">Chào mừng quay lại!</h2>
        <p className="text-foreground/70">Đây là những gì đang diễn ra với triển lãm của bạn hôm nay.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          icon="👥"
          title="Tổng Lượt Truy Cập"
          value={analytics.totalVisits?.toLocaleString?.() || '0'}
          subtitle="Những khách tham quan duy nhất tuần này"
          trend={12}
        />
        <StatCard
          icon="📊"
          title="Lượt Xem Trang"
          value={analytics.pageViews?.home?.toLocaleString?.() || '0'}
          subtitle="Lượt xem trang chủ"
          trend={8}
        />
        <StatCard
          icon="🤖"
          title="Chuyến Tham Quan"
          value={analytics.robustStats?.guidedTours?.toLocaleString?.() || '0'}
          subtitle="Chuyến tham quan do robot dẫn"
          trend={15}
        />
        <StatCard
          icon="❓"
          title="Câu Hỏi Được Trả Lời"
          value={analytics.robustStats?.questionsAnswered?.toLocaleString?.() || '0'}
          subtitle="Do NOVA-X1"
          trend={20}
        />
      </div>

      {/* Robot Status & Exhibition Management */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Robot Status - spans 2 columns */}
        <div className="lg:col-span-2">
          <RobotStatusPanel
            name={robot.name}
            model={robot.model}
            status={robot.status}
            batteryLevel={robot.batteryLevel}
            temperature={robot.temperatureSensor}
            uptime={robot.uptime}
            currentLocation={robot.currentLocation}
          />
        </div>

        {/* Exhibition Status */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle>Trạng Thái Triển Lãm</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div>
                <p className="text-xs text-foreground/60 uppercase tracking-wide font-semibold">Trạng Thái</p>
                <p className="text-lg font-bold text-green-600 mt-1">🟢 Đang Hoạt Động</p>
              </div>
              <div className="border-t border-border pt-3">
                <p className="text-xs text-foreground/60 uppercase tracking-wide font-semibold">Khách Tham Quan Hôm Nay</p>
                <p className="text-2xl font-bold text-foreground mt-1">342</p>
              </div>
              <div className="border-t border-border pt-3">
                <p className="text-xs text-foreground/60 uppercase tracking-wide font-semibold">Sức Khỏe Hệ Thống</p>
                <p className="text-lg font-bold text-primary mt-1">99.8%</p>
              </div>
              <div className="border-t border-border pt-3">
                <p className="text-xs text-foreground/60 uppercase tracking-wide font-semibold">Bảo Trì Tiếp Theo</p>
                <p className="text-sm font-semibold text-foreground mt-1">2024-04-15</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="border-border mb-8">
        <CardHeader>
          <CardTitle>Nhật Ký Hoạt Động Robot</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {robot.logs.slice(0, 3).map((log: any, idx: number) => (
              <div key={idx} className="flex items-start space-x-4 pb-4 border-b border-border last:border-0 last:pb-0">
                <div className="text-2xl">🔔</div>
                <div className="flex-1">
                  <p className="font-semibold text-foreground">{log.event}</p>
                  <p className="text-sm text-foreground/60 mt-1">{log.location}</p>
                  <p className="text-xs text-foreground/50 mt-1">{log.timestamp}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Visitor Statistics */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle>Phân Tích Khách Tham Quan (7 Ngày Qua)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-3 font-semibold text-foreground/70">Ngày</th>
                  <th className="text-right py-3 px-3 font-semibold text-foreground/70">Khách Tham Quan</th>
                  <th className="text-center py-3 px-3 font-semibold text-foreground/70">Xu Hướng</th>
                </tr>
              </thead>
              <tbody>
                {analytics.dailyVisitors.map((day: any, idx: number) => (
                  <tr key={idx} className="border-b border-border/50 hover:bg-muted/50 transition-colors">
                    <td className="py-3 px-3 text-foreground">{day.date}</td>
                    <td className="py-3 px-3 text-right font-semibold text-foreground">{day.count}</td>
                    <td className="py-3 px-3 text-center">
                      <span className="text-green-600 font-semibold">↑</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </>
  );
}

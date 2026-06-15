'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { StatCard } from '@/components/StatCard';
import { RobotStatusPanel } from '@/components/RobotStatusPanel';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import analytics from '@/public/data/analytics.json';
import robot from '@/public/data/robot.json';
import { ExhibitionTab } from '@/components/tabs/ExhibitionTab';
import { ScheduleTab } from '@/components/tabs/ScheduleTab';

export default function AdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'exhibition' | 'schedule'>('exhibition');

  const handleLogout = () => {
    document.cookie = 'auth_token=; path=/; max-age=0';
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
              <span className="font-bold text-primary-foreground">⚙️</span>
            </div>
            <div>
              <h1 className="font-bold text-lg bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Bảng Điều Khiển Quản Trị
              </h1>
              <p className="text-xs text-foreground/60">Quản Lý Triển Lãm</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Link href="/" className="text-sm text-foreground/70 hover:text-foreground">
              Xem Trang Công Khai
            </Link>
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleLogout}
              className="border-border"
            >
              Đăng Xuất
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Tabs Header */}
        <div className="mb-8 flex gap-2 border-b border-border">
          <button
            onClick={() => setActiveTab('exhibition')}
            className={`px-4 py-3 font-medium text-sm transition-colors border-b-2 ${
              activeTab === 'exhibition'
                ? 'border-primary text-primary'
                : 'border-transparent text-foreground/70 hover:text-foreground'
            }`}
          >
            Triển Lãm
          </button>
          <button
            onClick={() => setActiveTab('schedule')}
            className={`px-4 py-3 font-medium text-sm transition-colors border-b-2 ${
              activeTab === 'schedule'
                ? 'border-primary text-primary'
                : 'border-transparent text-foreground/70 hover:text-foreground'
            }`}
          >
            Lịch Sự Kiện
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'exhibition' && (
          <ExhibitionTab analytics={analytics} robot={robot} />
        )}
        {activeTab === 'schedule' && (
          <ScheduleTab />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-gradient-to-r from-primary/5 to-accent/5 py-8 mt-12">
        <div className="container mx-auto px-4 text-center text-foreground/70 text-sm">
          <p>&copy; 2024 Future Tech Exhibition Admin Panel. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

'use client';

import { Schedule } from '@/lib/api';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trash2, Edit, Users, Mic, MapPin, CalendarDays, Utensils, Trophy } from 'lucide-react';

// Mapping icon names to Lucide components
const iconMap: Record<string, React.ReactNode> = {
  Users: <Users className="w-5 h-5" />,
  Mic: <Mic className="w-5 h-5" />,
  MapPin: <MapPin className="w-5 h-5" />,
  CalendarDays: <CalendarDays className="w-5 h-5" />,
  Utensils: <Utensils className="w-5 h-5" />,
  Trophy: <Trophy className="w-5 h-5" />,
};

function getIconElement(iconName: string) {
  return iconMap[iconName] || iconMap['Users'];
}

interface ScheduleCardProps {
  schedule: Schedule;
  onEdit: () => void;
  onDelete: () => void;
}

export default function ScheduleCard({ schedule, onEdit, onDelete }: ScheduleCardProps) {
  return (
    <Card className="p-4 sm:p-6 border-0 shadow-sm hover:shadow-md transition-shadow bg-white">
      <div className="flex gap-4 items-start">
        {/* Colored dot indicator with icon */}
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-white flex-shrink-0"
          style={{ backgroundColor: schedule.accent }}
        >
          {getIconElement(schedule.icon)}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-lg text-foreground">{schedule.label}</h3>
          <p className="text-sm text-foreground/70 mt-1">
            {schedule.time} - {schedule.end} ({schedule.duration})
          </p>
          <p className="text-sm text-foreground/60 mt-2">{schedule.detail}</p>
          {schedule.speaker && (
            <p className="text-sm text-foreground/60 mt-1">🎤 {schedule.speaker}</p>
          )}
        </div>

        {/* Action buttons */}
        <div className="flex gap-2 flex-shrink-0">
          <Button
            size="sm"
            variant="outline"
            onClick={onEdit}
            className="border-border hover:bg-blue-50"
          >
            <Edit className="w-4 h-4 mr-1" />
            <span className="hidden sm:inline">Sửa</span>
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={onDelete}
            className="border-border hover:bg-red-50"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
}

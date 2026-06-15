const API_URL = 'https://69f458c0bd2396bf5310c8bf.mockapi.io/schedules';

export interface Schedule {
  id?: string;
  time: string; // HH:mm format
  end: string; // HH:mm format
  duration: string; // e.g., "30 phút", "1h 30 phút"
  icon: string; // Icon name: Users, Mic, MapPin, CalendarDays, Utensils, Trophy
  label: string; // Event title
  detail: string; // Location/Details
  accent: string; // Hex color code e.g., #3B82F6
  speaker?: string; // Optional - presenter name
  createdAt?: string;
}

export const ICON_OPTIONS = ['Users', 'Mic', 'MapPin', 'CalendarDays', 'Utensils', 'Trophy'] as const;

export const COLOR_OPTIONS = [
  { name: 'Xanh', value: '#3B82F6' }, // blue-500
  { name: 'Tím', value: '#A855F7' }, // purple-500
  { name: 'Hồng', value: '#EC4899' }, // pink-500
  { name: 'Xanh Lá', value: '#22C55E' }, // green-500
  { name: 'Cam', value: '#F97316' }, // orange-500
  { name: 'Đỏ', value: '#EF4444' }, // red-500
] as const;

// READ: Get all schedules
export async function getSchedules(): Promise<Schedule[]> {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('Failed to fetch schedules');
    return await response.json();
  } catch (error) {
    console.error('[v0] Error fetching schedules:', error);
    throw error;
  }
}

// CREATE: Add new schedule
export async function createSchedule(schedule: Omit<Schedule, 'id' | 'createdAt'>): Promise<Schedule> {
  try {
    const payload = {
      time: schedule.time,
      end: schedule.end,
      duration: schedule.duration,
      icon: schedule.icon,
      label: schedule.label,
      detail: schedule.detail,
      accent: schedule.accent,
      speaker: schedule.speaker || '', // Optional field
    };
    
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    if (!response.ok) throw new Error('Failed to create schedule');
    return await response.json();
  } catch (error) {
    console.error('[v0] Error creating schedule:', error);
    throw error;
  }
}

// UPDATE: Edit schedule
export async function updateSchedule(id: string, schedule: Omit<Schedule, 'id' | 'createdAt'>): Promise<Schedule> {
  try {
    const payload = {
      time: schedule.time,
      end: schedule.end,
      duration: schedule.duration,
      icon: schedule.icon,
      label: schedule.label,
      detail: schedule.detail,
      accent: schedule.accent,
      speaker: schedule.speaker || '', // Optional field
    };

    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    if (!response.ok) throw new Error('Failed to update schedule');
    return await response.json();
  } catch (error) {
    console.error('[v0] Error updating schedule:', error);
    throw error;
  }
}

// DELETE: Remove schedule
export async function deleteSchedule(id: string): Promise<void> {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete schedule');
  } catch (error) {
    console.error('[v0] Error deleting schedule:', error);
    throw error;
  }
}

'use client';

import { useState, useCallback, useEffect } from 'react';
import { Schedule, getSchedules, createSchedule, updateSchedule, deleteSchedule } from '@/lib/api';

export function useSchedules() {
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch all schedules on component mount
  const fetchSchedules = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getSchedules();
      setSchedules(data);
    } catch (err) {
      setError('Không thể tải lịch trình');
      console.error('[v0] Error in fetchSchedules:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial load
  useEffect(() => {
    fetchSchedules();
  }, [fetchSchedules]);

  // Create new schedule
  const addSchedule = useCallback(async (schedule: Omit<Schedule, 'id' | 'createdAt'>) => {
    try {
      const newSchedule = await createSchedule(schedule);
      setSchedules(prev => [newSchedule, ...prev]);
      return newSchedule;
    } catch (err) {
      setError('Không thể tạo lịch trình');
      throw err;
    }
  }, []);

  // Update existing schedule
  const editSchedule = useCallback(async (id: string, schedule: Omit<Schedule, 'id' | 'createdAt'>) => {
    try {
      const updated = await updateSchedule(id, schedule);
      setSchedules(prev => prev.map(s => s.id === id ? updated : s));
      return updated;
    } catch (err) {
      setError('Không thể cập nhật lịch trình');
      throw err;
    }
  }, []);

  // Delete schedule
  const removeSchedule = useCallback(async (id: string) => {
    try {
      await deleteSchedule(id);
      setSchedules(prev => prev.filter(s => s.id !== id));
    } catch (err) {
      setError('Không thể xóa lịch trình');
      throw err;
    }
  }, []);

  return {
    schedules,
    loading,
    error,
    fetchSchedules,
    addSchedule,
    updateSchedule: editSchedule,
    deleteSchedule: removeSchedule,
  };
}

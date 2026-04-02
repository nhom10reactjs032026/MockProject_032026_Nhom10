// features/scheduling/hooks/useCalendar.ts
import { useQuery } from '@tanstack/react-query';
import type { CalendarEvent } from '../types/scheduling.types';
import { mockCalendarJobs } from '../data/mockData';

// Query keys cho calendar
export const calendarKeys = {
  all: ['calendar'] as const,
  lists: () => [...calendarKeys.all, 'list'] as const,
  list: (startDate: Date, endDate: Date) => [...calendarKeys.lists(), { startDate, endDate }] as const,
};

interface UseCalendarEventsProps {
  startDate: Date;
  endDate: Date;
}

/**
 * Hook để fetch calendar events
 * @param startDate - Ngày bắt đầu
 * @param endDate - Ngày kết thúc
 */
export const useCalendarEvents = ({ startDate, endDate }: UseCalendarEventsProps) => {
  return useQuery({
    queryKey: calendarKeys.list(startDate, endDate),
    queryFn: async (): Promise<CalendarEvent[]> => {
      // Mock API call - sau này thay bằng call API thật
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Có thể filter theo date range sau
      return mockCalendarJobs.map(job => ({
        id: job.id,
        day: job.day,
        startHour: job.startHour,
        duration: job.duration,
        customer: job.customer,
        type: job.type,
      }));
    },
    staleTime: 5 * 60 * 1000, // 5 phút
    refetchOnWindowFocus: false,
  });
};

/**
 * Hook để lấy chi tiết một event
 */
export const useCalendarEvent = (eventId: string) => {
  return useQuery({
    queryKey: [...calendarKeys.all, 'detail', eventId],
    queryFn: async () => {
      await new Promise(resolve => setTimeout(resolve, 200));
      const event = mockCalendarJobs.find(job => job.id === eventId);
      if (!event) throw new Error('Event not found');
      return {
        id: event.id,
        day: event.day,
        startHour: event.startHour,
        duration: event.duration,
        customer: event.customer,
        type: event.type,
      };
    },
    enabled: !!eventId,
    staleTime: 5 * 60 * 1000,
  });
};
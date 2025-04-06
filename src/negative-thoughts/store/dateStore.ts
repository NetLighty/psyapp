import { create } from 'zustand'

interface DateStore {
  date: Date;
  setDate: (date: Date) => void;
  setDay: (day: number) => void;
  setMonth: (month: number) => void;
  setYear: (year: number) => void;
  setHours: (hours: number) => void;
  setMinutes: (minutes: number) => void;
}

export const useDateStore = create<DateStore>((set) => ({
  date: new Date(),
  setDate: (date) => set(() => ({ date })),
  setDay: (day) =>
    set((state) => {
      const newDate = new Date(state.date);
      newDate.setDate(day);
      return { date: newDate };
    }),
  setMonth: (month) =>
    set((state) => {
      const newDate = new Date(state.date);
      newDate.setMonth(month);
      return { date: newDate };
    }),
  setYear: (year) =>
    set((state) => {
      const newDate = new Date(state.date);
      newDate.setFullYear(year);
      return { date: newDate };
    }),
  setHours: (hours) =>
    set((state) => {
      const newDate = new Date(state.date);
      newDate.setHours(hours);
      return { date: newDate };
    }),
  setMinutes: (minutes) =>
    set((state) => {
      const newDate = new Date(state.date);
      newDate.setMinutes(minutes);
      return { date: newDate };
    }),
}));

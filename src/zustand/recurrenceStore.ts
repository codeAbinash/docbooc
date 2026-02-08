import { create } from 'zustand'
import type { RecurrenceData } from '@/HPScreens/RecurrenceSchedule'

interface RecurrenceStore {
  recurrenceData: RecurrenceData | undefined
  setRecurrenceData: (data: RecurrenceData | undefined) => void
}

export const useRecurrenceStore = create<RecurrenceStore>((set) => ({
  recurrenceData: undefined,
  setRecurrenceData: (data) => set({ recurrenceData: data }),
}))

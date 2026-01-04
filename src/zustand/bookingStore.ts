import { create } from 'zustand'

export interface BookingAppointmentData {
  doctor: {
    id: string
    name: string
    email: string | null
    contactNumber: string | null
    gender: string | null
    department: string | null
    degrees: string | null
    experience: number | null
    specialization: string
    createdAt: string
    verified: boolean | null
  } | null
  location: {
    scheduleId: string
    scheduleType?: string
    healthcareProvider?: {
      id?: string
      name?: string
      email?: string
      contactNumber?: string | null
      houseNumber?: string | null
      roadName?: string | null
      city?: string | null
      state?: string | null
      pin?: string | null
      profileImage?: string | null
    }
    timeSlots?: Array<{
      id?: string
      startTime?: string
      endTime?: string
      maxBookings?: number
    }>
  } | null
  date: string
  selectedMemberId: string
  patientData: {
    id?: string
    name?: string
    age?: number | string
    gender?: string
    mobile?: string
    relationship?: string
  } | null
}

type BookingStore = {
  appointment: BookingAppointmentData
  setDoctor: (doctor: BookingAppointmentData['doctor']) => void
  setLocation: (location: BookingAppointmentData['location']) => void
  setDate: (date: string) => void
  setSelectedMemberId: (memberId: string) => void
  setPatientData: (patientData: BookingAppointmentData['patientData']) => void
  setAppointment: (appointment: Partial<BookingAppointmentData>) => void
  resetAppointment: () => void
}

const initialState: BookingAppointmentData = {
  doctor: null,
  location: null,
  date: '',
  selectedMemberId: '',
  patientData: null,
}

export const useBookingStore = create<BookingStore>((set) => ({
  appointment: initialState,
  setDoctor: (doctor) =>
    set((state) => ({
      appointment: { ...state.appointment, doctor },
    })),
  setLocation: (location) =>
    set((state) => ({
      appointment: { ...state.appointment, location },
    })),
  setDate: (date) =>
    set((state) => ({
      appointment: { ...state.appointment, date },
    })),
  setSelectedMemberId: (selectedMemberId) =>
    set((state) => ({
      appointment: { ...state.appointment, selectedMemberId },
    })),
  setPatientData: (patientData) =>
    set((state) => ({
      appointment: { ...state.appointment, patientData },
    })),
  setAppointment: (appointment) =>
    set((state) => ({
      appointment: { ...state.appointment, ...appointment },
    })),
  resetAppointment: () => set({ appointment: initialState }),
}))

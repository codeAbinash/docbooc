import { queryClient } from '@/query'
import { Header } from '@/UserScreens/BookAppointment/components/Header'
import popupStore from '@/zustand/popupStore'
import FabIcon from '@components/FabIcon'
import { PaddingBottom, PaddingTop } from '@components/SafePadding'
import ArrowLeft01Icon from '@hugeicons/ArrowLeft01Icon'
import PlusSignIcon from '@hugeicons/PlusSignIcon'
import { useMutation, useQuery } from '@tanstack/react-query'
import { hpApi } from '@utils/client'
import Colors from '@utils/colors'
import { HPNavProp } from '@utils/types'
import { useColorScheme } from 'nativewind'
import { useState } from 'react'
import { ActivityIndicator, ScrollView, TouchableOpacity, View } from 'react-native'
import ScheduleCard from '../components/ScheduleCard'

type TimeSlot = {
  id: string
  startTime: string
  endTime: string
  scheduleDayId?: string
  day?: string | null
  dayOfWeek?: number | null
  dayOfMonth?: number | null
}

type Schedule = {
  id: string
  scheduleType: 'weekly' | 'daily' | 'monthly'
  daysMask: number | null
  scheduleStatus: 'active' | 'inactive'
  createdAt: string
  timeSlots: TimeSlot[]
}

type GroupedSchedules = {
  weekly: Array<{ key: string; id: string; scheduleDayId?: string; day: string; slots: string[] }>
  daily: Array<{ key: string; id: string; slots: string[] }>
  monthly: Array<{ key: string; id: string; scheduleDayId?: string; date: number; slots: string[] }>
}

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

function formatTime(time: string) {
  const [hours = '0', minutes = '00'] = time.split(':')
  const hour = parseInt(hours)
  const ampm = hour >= 12 ? 'PM' : 'AM'
  const formattedHour = hour % 12 || 12
  return `${formattedHour}:${minutes} ${ampm}`
}

function formatSlot(slot: TimeSlot) {
  return `${formatTime(slot.startTime)} - ${formatTime(slot.endTime)}`
}

function groupSchedules(schedules: Schedule[]): GroupedSchedules {
  const grouped: GroupedSchedules = { weekly: [], daily: [], monthly: [] }

  schedules.forEach((schedule) => {
    if (schedule.scheduleStatus !== 'active' || !schedule.timeSlots.length) return

    if (schedule.scheduleType === 'daily') {
      const slots = schedule.timeSlots.map(formatSlot)
      grouped.daily.push({ key: schedule.id, id: schedule.id, slots })
    } else if (schedule.scheduleType === 'weekly') {
      const dayGroups: { [key: string]: { slots: string[]; scheduleDayId?: string } } = {}

      schedule.timeSlots.forEach((slot) => {
        const dayIndex = slot.dayOfWeek ?? slot.day
        const dayName = typeof dayIndex === 'number' ? DAYS[dayIndex] : dayIndex
        if (!dayName) return

        if (!dayGroups[dayName]) {
          dayGroups[dayName] = { slots: [], scheduleDayId: slot.scheduleDayId || slot.id }
        }
        dayGroups[dayName].slots.push(formatSlot(slot))
      })

      Object.entries(dayGroups).forEach(([day, data]) => {
        grouped.weekly.push({
          key: `${schedule.id}-${day}-${data.scheduleDayId}`,
          id: schedule.id,
          scheduleDayId: data.scheduleDayId,
          day,
          slots: data.slots,
        })
      })
    } else if (schedule.scheduleType === 'monthly') {
      const dateGroups: { [key: string]: { date: number; slots: string[]; scheduleDayId?: string } } = {}

      schedule.timeSlots.forEach((slot) => {
        const date = slot.dayOfMonth ?? new Date(schedule.createdAt).getDate()
        if (!date) return

        const groupKey = `${date}-${slot.scheduleDayId || slot.id}`

        if (!dateGroups[groupKey]) {
          dateGroups[groupKey] = {
            date,
            slots: [],
            scheduleDayId: slot.scheduleDayId || slot.id,
          }
        }
        dateGroups[groupKey].slots.push(formatSlot(slot))
      })

      Object.values(dateGroups).forEach((data) => {
        grouped.monthly.push({
          key: `${schedule.id}-${data.date}-${data.scheduleDayId}`,
          id: schedule.id,
          scheduleDayId: data.scheduleDayId,
          date: data.date,
          slots: data.slots,
        })
      })
    }
  })

  return grouped
}

export default function HPDoctorScheduleDetails({ navigation, route }: HPNavProp) {
  const { doctorId, doctorName } = route.params as { doctorId: string; doctorName: string }
  const [isEnabled, setIsEnabled] = useState(true)
  const { colorScheme } = useColorScheme()
  const { alert } = popupStore()

  const { data: scheduleData, isLoading } = useQuery({
    queryKey: ['doctor-schedule', doctorId],
    queryFn: async () => {
      const response = await hpApi.schedules.doctor[':doctorId'].$get({
        param: { doctorId },
      })
      return response.json()
    },
  })

  const deleteMutation = useMutation({
    mutationFn: async (scheduleId: string) => {
      const response = await hpApi.schedules[':id'].$delete({
        param: { id: scheduleId },
      })
      return response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['doctor-schedule', doctorId] })
    },
  })

  const deleteDayMutation = useMutation({
    mutationFn: async (scheduleDayId: string) => {
      const response = await hpApi.schedules.day[':scheduleDayId'].$delete({
        param: { scheduleDayId },
      })
      return response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['doctor-schedule', doctorId] })
    },
  })

  const handleDelete = (scheduleId: string) => {
    alert('Delete Schedule', 'Are you sure you want to delete this schedule?', [
      { text: 'Cancel' },
      { text: 'Delete', onPress: () => deleteMutation.mutate(scheduleId) },
    ])
  }

  const handleDeleteDay = (scheduleDayId: string) => {
    alert('Delete Day', 'Are you sure you want to delete this specific day from the schedule?', [
      { text: 'Delete', onPress: () => deleteDayMutation.mutate(scheduleDayId) },
    ])
  }

  const schedules = groupSchedules((scheduleData?.data as Schedule[]) || [])

  return (
    <View className='bg flex-1'>
      <PaddingTop />
      <Header
        title='Schedule Details'
        RightComponent={
          <View className='flex-row gap-2'>
            <TouchableOpacity
              onPress={() => setIsEnabled(true)}
              className='size-12 items-center justify-center rounded-xl bg-white dark:bg-zinc-900'
            >
              <PlusSignIcon
                size={25}
                strokeWidth={1.7}
                color={isEnabled ? '#22c55e' : colorScheme === 'dark' ? 'white' : 'black'}
                style={{ transform: [{ rotate: '45deg' }] }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setIsEnabled(false)}
              className='size-12 items-center justify-center rounded-xl bg-white dark:bg-zinc-900'
            >
              <ArrowLeft01Icon
                size={25}
                strokeWidth={1.7}
                color={!isEnabled ? '#ef4444' : colorScheme === 'dark' ? 'white' : 'black'}
                style={{ transform: [{ rotate: '45deg' }] }}
              />
            </TouchableOpacity>
          </View>
        }
      />
      {isLoading ? (
        <View className='flex-1 items-center justify-center'>
          <ActivityIndicator size='large' color={Colors.accent} />
        </View>
      ) : (
        <ScrollView className='flex-1' showsVerticalScrollIndicator={false}>
          <View className='flex-1 gap-6 p-5'>
            {schedules.weekly.length > 0 && (
              <ScheduleCard
                type='weekly'
                schedules={schedules.weekly}
                onDelete={handleDelete}
                onDeleteDay={handleDeleteDay}
              />
            )}
            {schedules.daily.length > 0 && (
              <ScheduleCard type='daily' schedules={schedules.daily} onDelete={handleDelete} />
            )}
            {schedules.monthly.length > 0 && (
              <ScheduleCard
                type='monthly'
                schedules={schedules.monthly}
                onDelete={handleDelete}
                onDeleteDay={handleDeleteDay}
              />
            )}
          </View>
          <PaddingBottom />
        </ScrollView>
      )}

      <FabIcon
        Icon={<PlusSignIcon color='white' strokeWidth={2} />}
        onPress={() =>
          navigation.navigate('HPDoctorScheduler', {
            doctorId,
            doctorName,
          })
        }
      />
    </View>
  )
}

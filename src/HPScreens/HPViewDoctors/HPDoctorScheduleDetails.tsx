import { Header } from '@/UserScreens/BookAppointment/components/Header'
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
import popupStore from '@/zustand/popupStore'
import { queryClient } from '@/query'

type TimeSlot = {
  id: string
  startTime: string
  endTime: string
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
  weekly: Array<{ id: string; day: string; slots: string[] }>
  daily: Array<{ id: string; slots: string[] }>
  monthly: Array<{ id: string; date: number; slots: string[] }>
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

    const slots = schedule.timeSlots.map(formatSlot)

    if (schedule.scheduleType === 'daily') {
      grouped.daily.push({ id: schedule.id, slots })
    } else if (schedule.scheduleType === 'weekly' && schedule.daysMask !== null) {
      for (let i = 0; i < 7; i++) {
        if (!(schedule.daysMask & (1 << i))) continue
        const dayName = DAYS[i]
        if (!dayName) continue
        const existingDay = grouped.weekly.find((d) => d.day === dayName)
        if (existingDay) {
          existingDay.slots.push(...slots)
        } else {
          grouped.weekly.push({ id: schedule.id, day: dayName, slots })
        }
      }
    } else if (schedule.scheduleType === 'monthly') {
      const date = new Date(schedule.createdAt).getDate()
      grouped.monthly.push({ id: schedule.id, date, slots })
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

  const handleDelete = (scheduleId: string) => {
    alert('Delete Schedule', 'Are you sure you want to delete this schedule?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => deleteMutation.mutate(scheduleId),
      },
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
              <ScheduleCard type='weekly' schedules={schedules.weekly} onDelete={handleDelete} />
            )}
            {schedules.daily.length > 0 && (
              <ScheduleCard type='daily' schedules={schedules.daily} onDelete={handleDelete} />
            )}
            {schedules.monthly.length > 0 && (
              <ScheduleCard type='monthly' schedules={schedules.monthly} onDelete={handleDelete} />
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

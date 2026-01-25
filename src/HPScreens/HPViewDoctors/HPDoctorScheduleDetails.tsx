import { queryClient } from '@/query'
import popupStore from '@/zustand/popupStore'
import FabIcon from '@components/FabIcon'
import HybridHead from '@components/HybridHead'
import { PaddingBottom } from '@components/SafePadding'
import Cancel01Icon from '@hugeicons/Cancel01Icon'
import PlusSignIcon from '@hugeicons/PlusSignIcon'
import TimeScheduleIcon from '@hugeicons/TimeScheduleIcon'
import { useMutation, useQuery } from '@tanstack/react-query'
import { hpApi } from '@utils/client'
import Colors from '@utils/colors'
import { HPNavProp, Schedule, TimeSlot } from '@utils/types'
import { useColorScheme } from 'nativewind'
import { useState } from 'react'
import { ActivityIndicator, ScrollView, TouchableOpacity, View } from 'react-native'
import ScheduleCard from '../../components/ScheduleCard'

type GroupedScheduleItem = { key: string; id: string; slots: string[]; maxBookings?: number }
type WeeklyScheduleItem = GroupedScheduleItem & { day: string }
type MonthlyScheduleItem = GroupedScheduleItem & { date: number }

type GroupedSchedules = {
  weekly: WeeklyScheduleItem[]
  daily: GroupedScheduleItem[]
  monthly: MonthlyScheduleItem[]
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
    if (!schedule.timeSlots.length) return

    if (schedule.scheduleType === 'daily') {
      const slots = schedule.timeSlots.map(formatSlot)
      const maxBookings = schedule.timeSlots[0]?.maxBookings
      grouped.daily.push({ key: schedule.id, id: schedule.id, slots, maxBookings })
    } else if (schedule.scheduleType === 'weekly') {
      const dayGroups: { [key: string]: { slots: string[]; maxBookings?: number } } = {}

      schedule.timeSlots.forEach((slot) => {
        const dayIndex = slot.day
        if (dayIndex === null || dayIndex === undefined) return

        const dayName = DAYS[dayIndex]
        if (!dayName) return

        if (!dayGroups[dayName]) {
          dayGroups[dayName] = {
            slots: [],
            maxBookings: slot.maxBookings,
          }
        }
        dayGroups[dayName].slots.push(formatSlot(slot))
      })

      Object.entries(dayGroups).forEach(([day, data]) => {
        grouped.weekly.push({
          key: `${schedule.id}-${day}`,
          id: schedule.id,
          day,
          slots: data.slots,
          maxBookings: data.maxBookings,
        })
      })
    } else if (schedule.scheduleType === 'monthly') {
      const dateGroups: {
        [key: string]: { date: number; slots: string[]; maxBookings?: number }
      } = {}

      schedule.timeSlots.forEach((slot) => {
        const date = slot.day
        if (!date) return

        const groupKey = `${date}`

        if (!dateGroups[groupKey]) {
          dateGroups[groupKey] = {
            date,
            slots: [],
            maxBookings: slot.maxBookings,
          }
        }
        dateGroups[groupKey].slots.push(formatSlot(slot))
      })

      Object.entries(dateGroups).forEach(([dateKey, data]) => {
        grouped.monthly.push({
          key: `${schedule.id}-${dateKey}`,
          id: schedule.id,
          date: data.date,
          slots: data.slots,
          maxBookings: data.maxBookings,
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
  const [selectedSchedule, setSelectedSchedule] = useState<{ key: string; id: string; scheduleDayId?: string } | null>(
    null,
  )

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

  console.log('schedules', scheduleData?.data)

  return (
    <View className='flex-1 bg-white'>
      <HybridHead
        title='Schedule Details'
        showBackButton
        onBackPress={() => navigation.goBack()}
        rightElement={
          <View className='flex-row gap-2'>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('HPDoctorScheduler', {
                  doctorId,
                  doctorName,
                })
              }}
              className='size-12 items-center justify-center rounded-xl bg-white dark:bg-zinc-900'
            >
              <TimeScheduleIcon size={25} strokeWidth={1.7} color={Colors.accent} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                alert('Delete Schedule', 'Are you sure you want to delete this schedule?', [
                  { text: 'Cancel' },
                  {
                    text: 'Delete',
                    onPress: () => {
                      if (selectedSchedule?.scheduleDayId) {
                        deleteDayMutation.mutate(selectedSchedule.scheduleDayId)
                      } else if (selectedSchedule?.id) {
                        deleteMutation.mutate(selectedSchedule.id)
                      }
                      setSelectedSchedule(null)
                    },
                  },
                ])
              }}
              className='size-12 items-center justify-center rounded-xl bg-white dark:bg-zinc-900'
            >
              <Cancel01Icon size={25} strokeWidth={1.7} color='#ef4444' />
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
                selectedKey={selectedSchedule?.key}
                onSelectSchedule={(key, slotIndex) => {
                  const schedule = schedules.weekly.find((s) => s.key === key)
                  if (selectedSchedule?.key === key) {
                    setSelectedSchedule(null)
                  } else {
                    setSelectedSchedule(schedule as { key: string; id: string; scheduleDayId?: string })
                  }
                }}
              />
            )}
            {schedules.daily.length > 0 && (
              <ScheduleCard
                type='daily'
                schedules={schedules.daily}
                selectedKey={selectedSchedule?.key}
                onSelectSchedule={(key, slotIndex) => {
                  const schedule = schedules.daily.find((s) => s.key === key)
                  if (selectedSchedule?.key === key) {
                    setSelectedSchedule(null)
                  } else {
                    setSelectedSchedule(schedule as { key: string; id: string; scheduleDayId?: string })
                  }
                }}
              />
            )}
            {schedules.monthly.length > 0 && (
              <ScheduleCard
                type='monthly'
                schedules={schedules.monthly}
                selectedKey={selectedSchedule?.key}
                onSelectSchedule={(key, slotIndex) => {
                  const schedule = schedules.monthly.find((s) => s.key === key)
                  if (selectedSchedule?.key === key) {
                    setSelectedSchedule(null)
                  } else {
                    setSelectedSchedule(schedule as { key: string; id: string; scheduleDayId?: string })
                  }
                }}
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

import popupStore from '@/zustand/popupStore'
import Button from '@components/Button'
import HybridHead from '@components/HybridHead'
import { PaddingBottom } from '@components/SafePadding'
import ScheduleCard from '@components/ScheduleCard'
import { useNavigation, useRoute } from '@react-navigation/native'
import { useMutation } from '@tanstack/react-query'
import { hpApi } from '@utils/client'
import { HPStackNav, SchedulePayload } from '@utils/types'
import { ScrollView, View } from 'react-native'

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

const formatTime = (timeString: string) => {
  if (timeString.includes('T')) {
    return new Date(timeString).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })
  }
  const [hours = '0', minutes = '00'] = timeString.split(':')
  const hour = parseInt(hours)
  const ampm = hour >= 12 ? 'PM' : 'AM'
  const formattedHour = hour % 12 || 12
  return `${formattedHour.toString().padStart(2, '0')}:${minutes} ${ampm}`
}

type GroupedScheduleItem = { key: string; id: string; slots: string[]; maxBookings?: number }
type WeeklyScheduleItem = GroupedScheduleItem & { day: string }
type MonthlyScheduleItem = GroupedScheduleItem & { date: number }

type GroupedSchedules = {
  weekly: WeeklyScheduleItem[]
  daily: GroupedScheduleItem[]
  monthly: MonthlyScheduleItem[]
}

function groupSchedules(scheduleData: SchedulePayload): GroupedSchedules {
  const grouped: GroupedSchedules = { weekly: [], daily: [], monthly: [] }
  const scheduleType = scheduleData.scheduleType

  if (scheduleType === 'daily') {
    grouped.daily = scheduleData.timeSlots.map((slot, index) => ({
      key: `daily-${index}`,
      id: `daily-${index}`,
      slots: [`${formatTime(slot.startTime)} - ${formatTime(slot.endTime)}`],
      maxBookings: slot.maxBookings,
    }))
  } else if (scheduleType === 'weekly') {
    const dayGroups: { [key: string]: { slots: string[]; maxBookings: number } } = {}
    scheduleData.timeSlots.forEach((slot) => {
      if (slot.dayOfWeek !== undefined) {
        const day = DAYS[slot.dayOfWeek]
        if (day) {
          if (!dayGroups[day]) dayGroups[day] = { slots: [], maxBookings: slot.maxBookings }
          dayGroups[day].slots.push(`${formatTime(slot.startTime)} - ${formatTime(slot.endTime)}`)
        }
      }
    })
    grouped.weekly = Object.entries(dayGroups).map(([day, data]) => ({
      key: day,
      id: day,
      day,
      slots: data.slots,
      maxBookings: data.maxBookings,
    }))
  } else if (scheduleType === 'monthly') {
    const dateGroups: { [key: number]: { slots: string[]; maxBookings: number } } = {}
    scheduleData.timeSlots.forEach((slot) => {
      if (slot.dayOfMonth !== undefined) {
        const day = slot.dayOfMonth
        if (!dateGroups[day]) dateGroups[day] = { slots: [], maxBookings: slot.maxBookings }
        dateGroups[day].slots.push(`${formatTime(slot.startTime)} - ${formatTime(slot.endTime)}`)
      }
    })
    grouped.monthly = Object.entries(dateGroups).map(([dateKey, data]) => ({
      key: `day-${dateKey}`,
      id: `day-${dateKey}`,
      date: parseInt(dateKey),
      slots: data.slots,
      maxBookings: data.maxBookings,
    }))
  }

  return grouped
}

const HPScheduleReview = () => {
  const navigation = useNavigation<HPStackNav>()
  const route = useRoute<any>()
  const { doctorId, doctorName, scheduleData } = route.params as {
    doctorId: string
    doctorName: string
    scheduleData: SchedulePayload
  }
  const alert = popupStore((state) => state.alert)

  const { mutate, isPending } = useMutation({
    mutationFn: async (payload: SchedulePayload) => (await hpApi.schedules.$post({ json: payload })).json(),
    onSuccess: (data) => {
      if (!data.success) return alert('Error', data.message || 'An error occurred while creating the schedule.')
      alert('Success', 'Schedule created successfully', [{ text: 'OK', onPress: () => navigation.navigate('HPHome') }])
    },
    onError: (error: any) => {
      alert('Error', error?.message || 'Network error. Please check your connection and try again.')
    },
  })

  const handleSendForReview = () => {
    mutate(scheduleData)
  }

  const schedules = groupSchedules(scheduleData)
  const scheduleType = (scheduleData.scheduleType || 'daily') as 'daily' | 'weekly' | 'monthly'
  const displaySchedules =
    scheduleType === 'weekly' ? schedules.weekly : scheduleType === 'monthly' ? schedules.monthly : schedules.daily

  return (
    <View className='flex-1 bg-white'>
      <HybridHead title={doctorName} showBackButton onBackPress={() => navigation.goBack()} />
      <View className='flex-1'>
        <ScrollView className='flex-1' showsVerticalScrollIndicator={false}>
          <View className='gap-6 p-5'>
            <ScheduleCard type={scheduleType} schedules={displaySchedules} showSelector={false} />
          </View>
        </ScrollView>
        <View className='px-5 py-3'>
          <Button
            title={isPending ? 'Sending...' : 'Submit for Review'}
            onPress={handleSendForReview}
            disabled={isPending}
          />
        </View>
        <PaddingBottom />
      </View>
    </View>
  )
}

export default HPScheduleReview

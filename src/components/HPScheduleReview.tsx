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
    return new Date(timeString).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })
  }
  return timeString.substring(0, 5)
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
    mutate({
      doctorId,
      scheduleType: scheduleData.scheduleType,
      timeSlots: scheduleData.timeSlots.map((slot) => ({
        startTime: formatTime(slot.startTime),
        endTime: formatTime(slot.endTime),
        maxBookings: slot.maxBookings,
        ...(slot.dayOfWeek !== undefined && { dayOfWeek: slot.dayOfWeek }),
        ...(slot.dayOfMonth !== undefined && { dayOfMonth: slot.dayOfMonth }),
      })),
      isActive: true,
      ...(scheduleData.weekDays && { weekDays: scheduleData.weekDays }),
      ...(scheduleData.monthDays && { monthDays: scheduleData.monthDays }),
    })
  }

  const schedules = (() => {
    const scheduleType = scheduleData.scheduleType

    if (scheduleType === 'daily') {
      return scheduleData.timeSlots.map((slot, index) => ({
        key: `daily-${index}`,
        id: `daily-${index}`,
        slots: [`${formatTime(slot.startTime)} - ${formatTime(slot.endTime)}`],
      }))
    } else if (scheduleType === 'weekly') {
      const grouped: { [key: string]: string[] } = {}
      scheduleData.timeSlots.forEach((slot) => {
        if (slot.dayOfWeek !== undefined) {
          const day = DAYS[slot.dayOfWeek]
          if (day) {
            if (!grouped[day]) grouped[day] = []
            grouped[day].push(`${formatTime(slot.startTime)} - ${formatTime(slot.endTime)}`)
          }
        }
      })
      return Object.entries(grouped).map(([day, slots]) => ({ key: day, id: day, day, slots }))
    } else if (scheduleType === 'monthly') {
      const grouped: { [key: number]: string[] } = {}
      scheduleData.timeSlots.forEach((slot) => {
        if (slot.dayOfMonth !== undefined) {
          const day = slot.dayOfMonth
          if (!grouped[day]) grouped[day] = []
          grouped[day].push(`${formatTime(slot.startTime)} - ${formatTime(slot.endTime)}`)
        }
      })
      return Object.entries(grouped).map(([date, slots]) => ({
        key: `day-${date}`,
        id: `day-${date}`,
        date: parseInt(date),
        slots,
      }))
    }
    return []
  })()

  const scheduleType = (scheduleData.scheduleType || 'daily') as 'daily' | 'weekly' | 'monthly'

  return (
    <View className='flex-1 bg-white'>
      <HybridHead title={doctorName} showBackButton onBackPress={() => navigation.goBack()} />
      <View className='flex-1'>
        <ScrollView className='flex-1' showsVerticalScrollIndicator={false}>
          <View className='gap-6 p-5'>
            <ScheduleCard type={scheduleType} schedules={schedules} showSelector={false} />
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

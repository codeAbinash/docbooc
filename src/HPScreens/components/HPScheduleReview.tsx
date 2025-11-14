import { Header } from '@/UserScreens/BookAppointment/components/Header'
import popupStore from '@/zustand/popupStore'
import Button from '@components/Button'
import { PaddingBottom, PaddingTop } from '@components/SafePadding'
import { useNavigation, useRoute } from '@react-navigation/native'
import { useMutation } from '@tanstack/react-query'
import { hpApi } from '@utils/client'
import { HPStackNav } from '@utils/types'
import { ScrollView, View } from 'react-native'
import ScheduleCard from './ScheduleCard'

type RouteParams = {
  doctorId: string
  doctorName: string
  scheduleData: {
    scheduleType: string
    timeSlots: Array<{
      startTime: string
      endTime: string
      maxBookings: number
    }>
    weekDays?: number[]
    monthDays?: number[]
  }
}

const formatTime = (isoString: string) =>
  new Date(isoString).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })

const HPScheduleReview = () => {
  const navigation = useNavigation<HPStackNav>()
  const route = useRoute<any>()
  const { doctorId, doctorName, scheduleData } = route.params as RouteParams
  const alert = popupStore((state) => state.alert)

  const { mutate, isPending } = useMutation({
    mutationFn: async (payload: any) => (await hpApi.schedules.$post({ json: payload })).json(),
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
      })),
      isActive: true,
      ...(scheduleData.weekDays && { weekDays: scheduleData.weekDays }),
      ...(scheduleData.monthDays && { monthDays: scheduleData.monthDays }),
    })
  }

  const schedules = scheduleData.timeSlots.map((slot) => ({
    slots: [`${formatTime(slot.startTime)} - ${formatTime(slot.endTime)}`],
  }))

  const scheduleType = (scheduleData.scheduleType || 'daily') as 'daily' | 'weekly' | 'monthly'

  return (
    <View className='bg flex-1'>
      <PaddingTop />
      <Header title={doctorName} />
      <View className='flex-1'>
        <ScrollView className='flex-1' showsVerticalScrollIndicator={false}>
          <View className='gap-6 p-5'>
            <ScheduleCard type={scheduleType} schedules={schedules} />
          </View>
        </ScrollView>
        <View className='px-6 pb-2 pt-2'>
          <Button
            title={isPending ? 'Sending...' : 'Send for Review'}
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

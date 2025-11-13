import { Header } from '@/UserScreens/BookAppointment/components/Header'
import Button from '@components/Button'
import { PaddingBottom, PaddingTop } from '@components/SafePadding'
import { useRoute } from '@react-navigation/native'
import { Medium, SemiBold } from '@utils/fonts'
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

const HPScheduleReview = () => {
  const route = useRoute<any>()
  const { doctorName, scheduleData } = route.params as RouteParams

  const convertToScheduleFormat = () => {
    const schedules: Array<{ day?: string; date?: number; slots: string[] }> = []

    if (scheduleData?.timeSlots) {
      scheduleData.timeSlots.forEach((slot) => {
        schedules.push({
          slots: [`${slot.startTime} - ${slot.endTime}`],
        })
      })
    }

    return schedules
  }

  const scheduleType = (scheduleData?.scheduleType || 'daily') as 'daily' | 'weekly' | 'monthly'

  return (
    <View className='bg flex-1'>
      <PaddingTop />
      <Header title={doctorName} />
      <View className='flex-1'>
        <ScrollView className='flex-1' showsVerticalScrollIndicator={false}>
          <View className='gap-6 p-5'>
            {scheduleData && <ScheduleCard type={scheduleType} schedules={convertToScheduleFormat()} />}
          </View>
        </ScrollView>

        <View className='px-6 pb-2 pt-2'>
          <Button title='Send for Review' onPress={() => {}} />
        </View>
        <PaddingBottom />
      </View>
    </View>
  )
}

export default HPScheduleReview

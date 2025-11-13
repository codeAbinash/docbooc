import FabIcon from '@components/FabIcon'
import { PaddingTop, PaddingBottom } from '@components/SafePadding'
import PlusSignIcon from '@hugeicons/PlusSignIcon'
import { Header } from '@/UserScreens/BookAppointment/components/Header'
import { HPNavProp } from '@utils/types'
import { ScrollView, View, TouchableOpacity } from 'react-native'
import { Medium, SemiBold } from '@utils/fonts'
import ArrowLeft01Icon from '@hugeicons/ArrowLeft01Icon'
import { useColorScheme } from 'nativewind'
import { useState } from 'react'
import ScheduleCard from '../components/ScheduleCard'

// Sample data structure
const SCHEDULE_DATA = {
  weekly: [
    { day: 'Monday', slots: ['5:00 AM - 8:00 AM', '2:00 PM - 5:00 PM'] },
    { day: 'Wednesday', slots: ['9:00 AM - 12:00 PM'] },
    { day: 'Friday', slots: ['3:00 PM - 6:00 PM'] },
  ],
  daily: [{ slots: ['10:00 AM - 1:00 PM', '4:00 PM - 7:00 PM'] }],
  monthly: [{ date: 15, slots: ['11:00 AM - 2:00 PM'] }],
}

export default function HPDoctorScheduleDetails({ navigation }: HPNavProp) {
  const [isEnabled, setIsEnabled] = useState(true)

  const toggleSchedule = () => {
    setIsEnabled((prev) => !prev)
  }

  const { colorScheme } = useColorScheme()

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
      <ScrollView className='flex-1' showsVerticalScrollIndicator={false}>
        <View className='flex-1 gap-6 p-5'>
          {SCHEDULE_DATA.weekly.length > 0 && <ScheduleCard type='weekly' schedules={SCHEDULE_DATA.weekly} />}
          {SCHEDULE_DATA.daily.length > 0 && <ScheduleCard type='daily' schedules={SCHEDULE_DATA.daily} />}
          {SCHEDULE_DATA.monthly.length > 0 && <ScheduleCard type='monthly' schedules={SCHEDULE_DATA.monthly} />}
        </View>
        <PaddingBottom />
      </ScrollView>

      <FabIcon
        Icon={<PlusSignIcon color='white' strokeWidth={2} />}
        onPress={() =>
          navigation.navigate('HPDoctorScheduler', {
            doctorId: 'demo_id',
            doctorName: 'Dr. Demo Doctor',
          })
        }
      />
    </View>
  )
}
